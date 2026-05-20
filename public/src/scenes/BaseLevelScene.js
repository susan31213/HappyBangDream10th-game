import { TitleButton } from '../components/TitleButton.js';
import { AppGlobals } from '../globals.js';

export class BaseLevelScene extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.isDebug = false;
    }

    preload() {
        this.scene.launch('PreloaderScene');
        this.load.image('back_btn', 'assets/back.png');
        this.load.image('audio_btn', 'assets/audio_icon.png');
        this.load.image('debug_tool', 'assets/debug_tool.png');
    }

    create() {
        this.scene.stop('PreloaderScene');

        this.debugLayer = this.add.layer();
        this.debugLayer.setVisible(this.isDebug);

        const titleButton = new TitleButton(this, 40, 40, 0.25, 'back_btn');
        titleButton.on('clicked', () => {
            this.onBackButtonClicked();
        }).setName('backButton');

        const audioButton = new TitleButton(this, 120, 40, this.sound.mute ? 0.25 : 1.0, 'audio_btn');
        audioButton.on('clicked', () => {
            if (this.sound.mute) {
                this.sound.setMute(false);
                audioButton.buttonImage.setAlpha(1.0);
            } else {
                this.sound.setMute(true);
                audioButton.buttonImage.setAlpha(0.25);
            }
        }).setName('audioButton');
        
        const debugToolButton = new TitleButton(this, 680, 40, this.isDebug ? 1.0 : 0.25, 'debug_tool');
        debugToolButton.on('clicked', () => {
            this.isDebug = !this.isDebug;
            debugToolButton.buttonImage.setAlpha(this.isDebug ? 1.0 : 0.25);
            this.debugLayer.setVisible(this.isDebug);
        }).setName('debugToolButton');

        const currentSpeed = AppGlobals.gameSpeedMultiplier || 1;
        const debugSpeedButton = this.add.text(10, 140, `Debug: 速度 ${currentSpeed}x`, { fontSize: '20px', color: currentSpeed === 4 ? '#00ff00' : '#ff0000' }).setInteractive();
        debugSpeedButton.on('pointerdown', () => {
            const nextSpeed = (AppGlobals.gameSpeedMultiplier === 1 ? 4 : 1);
            this.setGameSpeed(nextSpeed);
            debugSpeedButton.setText(`Debug: 速度 ${nextSpeed}x`);
            debugSpeedButton.setColor(nextSpeed === 4 ? '#00ff00' : '#ff0000');
        });
        this.debugLayer.add(debugSpeedButton);
        this.setGameSpeed(currentSpeed);
    }

    onBackButtonClicked() {
        this.scene.start('TitleScene');
    }

    setGameSpeed(multiplier) {
        AppGlobals.gameSpeedMultiplier = multiplier;
        if (this.time && typeof this.time.timeScale !== 'undefined') {
            this.time.timeScale = multiplier;
        }
        if (this.tweens && typeof this.tweens.timeScale !== 'undefined') {
            this.tweens.timeScale = multiplier;
        }
        if (this.anims && typeof this.anims.globalTimeScale !== 'undefined') {
            this.anims.globalTimeScale = multiplier;
        }
    }

    update() {

    }
}