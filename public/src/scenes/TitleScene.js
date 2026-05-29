export class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
    }

    preload() {
        this.scene.launch('PreloaderScene');
        this.load.audio('bgm', 'assets/sound/shimtone-raburizu.mp3');

        this.load.image('title_bg', 'assets/title.png');
        this.load.image('popipa', 'assets/logo/popipa.png');
    }

    create() {
        this.scene.stop('PreloaderScene');

        // stop all bgm when enter the title scene
        this.sound.stopAll();
        this.sound.play('bgm', { loop: true, volume: 0.3 });

        // add title background
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'title_bg');

        this.addButton(176, 158, 'popipa', 'PoppinPartyScene');
        // this.addButton(516, 110, 'popipa', 'AfterglowScene');
        // this.addButton(38, 345, 'popipa', 'PastelPalettesScene');
        // this.addButton(437, 283, 'popipa', 'RoseliaScene');
        // this.addButton(190, 600, 'popipa', 'HelloHappyWorldScene');
        // this.addButton(530, 600, 'popipa', 'MorfonicaScene');
        // this.addButton(190, 800, 'popipa', 'RaiseASuilenScene');
        // this.addButton(530, 800, 'popipa', 'MyGoScene', {roundNum: 0});
        // this.addButton(190, 1000, 'popipa', 'AveMujicaScene');
    }

    update() {


    }

    addButton(x, y, texture, sceneToStart, data = {}) {
        const button = this.add.image(x, y, texture);
        button.setInteractive();

        button.on('pointerdown', () => {
            button.setTint(0xffffff);
            this.sound.stopAll();

            const cam = this.cameras.main;
            cam.pan(button.x, button.y, 1000, 'Linear');
            cam.zoomTo(2, 1000, 'Linear');
            cam.fade(900, 255, 255, 255);
            this.time.delayedCall(1000, () => {
                this.scene.start(sceneToStart, data);
            });
        });

        return button;
    }
}