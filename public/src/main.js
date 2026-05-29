import { PreloaderScene } from './scenes/PreloaderScene.js';
import { TitleScene } from './scenes/TitleScene.js';
import { PoppinPartyScene } from './scenes/PoppinPartyScene.js';
import { AfterglowScene } from './scenes/AfterglowScene.js';
import { PastelPalettesScene } from './scenes/PastelPalettesScene.js';
import { RoseliaScene } from './scenes/RoseliaScene.js';
import { HelloHappyWorldScene } from './scenes/HelloHappyWorldScene.js';
import { MorfonicaScene } from './scenes/MorfonicaScene.js';
import { RaiseASuilenScene } from './scenes/RaiseASuilenScene.js';
import { MyGoScene } from './scenes/MyGoScene.js';
import { AveMujicaScene } from './scenes/AveMujicaScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 720,
    height: 1280,
    backgroundColor: '#FFFFFF',
    pixelArt: false,
    physics: {
        default: "arcade", // ここでarcadeを指定します。
        arcade: {
            gravity: { x: 0, y: 0 }, // y:重力
            debug: true, // true にすることで衝突検知の範囲を画面に表示します。
        },
    },
    scene: [
        TitleScene,
        PreloaderScene,
        PoppinPartyScene,
        AfterglowScene,
        PastelPalettesScene,
        RoseliaScene,
        HelloHappyWorldScene,
        MorfonicaScene,
        RaiseASuilenScene,
        MyGoScene,
        AveMujicaScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

const game = new Phaser.Game(config);

// Auto-focus the game canvas to enable audio playback
game.events.once('ready', () => {
    const canvas = game.canvas;
    if (canvas) {
        canvas.focus();
    }
});