export class HandGrabStoneAnimation extends Phaser.GameObjects.Container {
    static TEXTURE_MAP = {
        'star1': {
            hand_grab: 'hand_random_star_grab',
            hand_release: 'hand_random_star_release',
            stone_texture: 'random_star',
            stone_scale: 1.0,
            hand_image_position: { x: 0, y: 920-1280 },
            stone_image_position: { x: 0, y: 920-1280 },
            ease_in_offset: { x: 0, y: 1280 },
            ease_out_offset: { x: 0, y: -1280 },
            text_position: { x: -220, y: -300, rotate: 0 },
        }
    };

    constructor(scene, x, y, stoneTexture, stoneName) {
        const easeInContainer = new Phaser.GameObjects.Container(scene, 0, 0);
        const easeOutContainer = new Phaser.GameObjects.Container(scene, 0, 0);
        const children = [];
        const handGrabTexture = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.hand_grab || 'hand_grab';
        const handReleaseTexture = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.hand_release || 'hand_release';
        const stoneTextureKey = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.stone_texture || stoneTexture;
        const stoneScale = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.stone_scale || 0.66;
        const handImagePosition = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.hand_image_position || { x: 60, y: 0 };
        const handImage = scene.add.image(handImagePosition.x, handImagePosition.y, handGrabTexture).setDepth(1);
        children.push(handImage);
        const stoneImagePosition = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.stone_image_position || { x: 0, y: 200 };
        const stoneImage = scene.add.image(stoneImagePosition.x, stoneImagePosition.y, stoneTextureKey);
        stoneImage.setScale(stoneScale);
        children.push(stoneImage);
        easeInContainer.add(children);

        super(scene, x, y, [easeInContainer, easeOutContainer]);
        this.easeInContainer = easeInContainer;
        this.easeOutContainer = easeOutContainer;
        this.handImage = handImage;
        this.stoneImage = stoneImage;
        this.stoneName = stoneName;
        this.handReleaseTexture = handReleaseTexture;
        this.easeInOffset = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.ease_in_offset || { x: 0, y: this.scene.cameras.main.centerY + 40 };
        this.easeOutOffset = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.ease_out_offset || { x: 0, y: 0 };
        this.textPosition = HandGrabStoneAnimation.TEXTURE_MAP[stoneTexture]?.text_position || { x: 0, y: 300, rotate: 0 };

        easeInContainer.bringToTop(this.handImage);
        this.bringToTop(easeInContainer);
    }

    playAnimation() {
        this.scene.tweens.add({
            targets: this.easeInContainer,
            x: this.easeInOffset.x,
            y: this.easeInOffset.y,
            duration: 1000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.scene.sound.play('put_stone_se', { volume: 1.0 });
                this.handImage.setTexture(this.handReleaseTexture);
                this.easeInContainer.remove(this.handImage, false);
                this.easeOutContainer.add(this.handImage);
                this.easeOutContainer.x = this.easeInContainer.x;
                this.easeOutContainer.y = this.easeInContainer.y;


                const stoneNameText = new Phaser.GameObjects.Text(
                    this.scene,
                    this.textPosition.x,
                    this.textPosition.y,
                    this.stoneName,
                    { fontFamily: 'futehodo', fontSize: '36px', color: '#282828', align: 'center' }
                );
                stoneNameText.setOrigin(0.5);
                stoneNameText.setRotation(Phaser.Math.DegToRad(this.textPosition.rotate));
                this.easeInContainer.add(stoneNameText);

                this.scene.tweens.add({
                    targets: this.easeOutContainer,
                    x: this.easeOutOffset.x,
                    y: this.easeOutOffset.y,
                    duration: 1000,
                    delay: 500,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: this.easeInContainer,
                            x: -800,
                            duration: 500,
                            delay: 500,
                            ease: 'Sine.easeIn',
                            onComplete: () => {
                                this.emit('animationComplete');
                                this.destroy();
                            }
                        });
                    }
                });
            }
        });
    }
}