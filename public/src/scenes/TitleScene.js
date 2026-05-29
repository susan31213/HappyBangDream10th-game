export class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
    }

    preload() {
        this.scene.launch('PreloaderScene');
        this.load.audio('bgm', 'assets/sound/shimtone-raburizu.mp3');
        this.load.audio('zoom_se', 'assets/sound/se/zoom.mp3');

        this.load.image('title_bg', 'assets/title.png');
        this.load.image('popipa', 'assets/logo/popipa.png');
        this.load.image('afterglow', 'assets/logo/afterglow.png');
        this.load.image('paspale', 'assets/logo/paspale.png');
        this.load.image('roselia', 'assets/logo/roselia.png');
        this.load.image('hellohappyworld', 'assets/logo/hellohappyworld.png');
        this.load.image('morfonica', 'assets/logo/morfonica.png');
        this.load.image('ras', 'assets/logo/ras.png');
        this.load.image('mygo', 'assets/logo/mygo.png');
        this.load.image('avemujica', 'assets/logo/avemujica.png');
    }

    create() {
        this.scene.stop('PreloaderScene');

        // stop all bgm when enter the title scene
        this.sound.stopAll();
        this.sound.play('bgm', { loop: true, volume: 0.3 });

        // add title background
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'title_bg');

        this.addButton(176, 158, 'popipa', 'PoppinPartyScene');
        this.addButton(512, 132, 'afterglow', 'AfterglowScene');
        this.addButton(227, 393, 'paspale', 'PastelPalettesScene');
        this.addButton(562.5, 381, 'roselia', 'RoseliaScene');
        this.addButton(189, 626, 'hellohappyworld', 'HelloHappyWorldScene');
        this.addButton(511, 618, 'morfonica', 'MorfonicaScene');
        this.addButton(215, 869, 'ras', 'RaiseASuilenScene');
        this.addButton(558, 867, 'mygo', 'MyGoScene');
        this.addButton(499, 1139, 'avemujica', 'AveMujicaScene');
    }

    update() {


    }

    addButton(x, y, texture, sceneToStart, data = {}) {
        const button = this.add.image(x, y, texture);
        button.setInteractive();

        button.on('pointerdown', () => {
            this.sound.play('zoom_se', { volume: 0.5, rate: 1.2, detune: 100 });
            const time = 1000;
            const ease = 'Back.easeIn';
            const cam = this.cameras.main;
            cam.pan(button.x, button.y, time, ease);
            cam.zoomTo(2, time, ease);
            this.time.delayedCall(500, () => {
                cam.fade(time - 500, 255, 255, 255);
            });
            this.time.delayedCall(time, () => {
                this.sound.stopAll();
                this.scene.start(sceneToStart, data);
            });
        });

        return button;
    }
}