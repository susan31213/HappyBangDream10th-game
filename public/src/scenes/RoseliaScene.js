import { BaseLevelScene } from './BaseLevelScene.js';

export class RoseliaScene extends BaseLevelScene {
    static zOrder = {
        BACKGROUND: -3,
        TARGET: -2,
        PLAYER: -1,
        UI: 0
    };

    constructor() {
        super('RoseliaScene');
    }

    preload() {
        super.preload();
        var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        for (let i = 1; i <= 4; i++) {
            const filename = `map` + i.toString().padStart(2, '0');
            this.load.image(`map${i}`, `assets/roselia/${filename}.png`);
        }
    }

    create() {
        super.create();
        this.createJoyStick();
        this.createMap();
        this.createPlayer();
        this.createScroreText();

        this.score = 0;

        // make camera follow player and limit scrolling to the map bounds
        this.cameras.main.setBounds(-240, 40, 1600, 1960);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.setUiScrollFactor0();

        // spawn random targets every 1 seconds
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnTarget,
            callbackScope: this,
            loop: true
        });
    }

    createMap() {
        // Create a 4x4 grid of maps, each map is 400x400, and they are placed next to each other
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {
                const map = this.add.image(360 + (i - 2) * 400, 640 + (j - 2) * 400, `map${i}`);
                map.setDisplaySize(400, 400);
                map.setOrigin(0.5, 0.5);
                map.setDepth(RoseliaScene.zOrder.BACKGROUND); // Set depth to -3 to ensure it is behind the player and targets
            }
        }
    }

    createJoyStick() {
        const background = this.add.rectangle(0, 920, 720, 360, 0xAA0000, 1.0).setOrigin(0, 0).setScrollFactor(0);
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 150,
            y: 1100,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 50, 0xcccccc),
        });
        if (this.joyStick && this.joyStick.base && this.joyStick.thumb) {
            this.joyStick.base.setScrollFactor(0);
            this.joyStick.thumb.setScrollFactor(0);
        }
        this.skillButton1 = this.add.circle(380, 1150, 60, 0x0000AA).setScrollFactor(0).setInteractive();
        this.skillButton1.setDepth(RoseliaScene.zOrder.UI);
        this.skillButton1.on('pointerdown', () => {
            console.log('Skill 1 activated!');
        });
        this.skillButton2 = this.add.circle(500, 1020, 60, 0x0000AA).setScrollFactor(0).setInteractive();
        this.skillButton2.setDepth(RoseliaScene.zOrder.UI);
        this.skillButton2.on('pointerdown', () => {
            console.log('Skill 2 activated!');
        });
        this.skillButton3 = this.add.circle(620, 1150, 60, 0x0000AA).setScrollFactor(0).setInteractive();
        this.skillButton3.setDepth(RoseliaScene.zOrder.UI);
        this.skillButton3.on('pointerdown', () => {
            console.log('Skill 3 activated!');
        });
    }

    createPlayer() {
        this.player = this.add.circle(400, 300, 50, 0xff0000);
        this.player.setDepth(RoseliaScene.zOrder.PLAYER);
    }

    createScroreText() {
        this.scoreText = this.add.text(10, 100, 'Score: 0', { fontSize: '32px', color: '#000' });
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(RoseliaScene.zOrder.UI);
    }

    update() {
        super.update();
        this.movePlayer();
        this.drawScore();
    }

    movePlayer() {
        const force = this.joyStick.force;
        const angle = this.joyStick.angle / 180 * Math.PI; // Convert to radians

        this.player.x += force * Math.cos(angle) * 0.05;
        this.player.y += force * Math.sin(angle) * 0.05;

        // Keep player within the full 1600x1600 map bounds
        this.player.x = Phaser.Math.Clamp(this.player.x, -190, 1310);
        this.player.y = Phaser.Math.Clamp(this.player.y, 90, 1590);
    }

    spawnTarget() {
        const target = this.add.circle(
            Phaser.Math.Between(-210, 1330),
            Phaser.Math.Between(70, 1610),
            30,
            0x00ff00
        );
        target.setDepth(RoseliaScene.zOrder.TARGET);
        this.physics.add.existing(target);
        this.physics.add.existing(this.player);
        this.physics.add.overlap(this.player, target, () => {
            target.destroy();
            this.score += 10;
        });
    }

    drawScore() {
        this.scoreText.setText('Score: ' + this.score);
    }
}