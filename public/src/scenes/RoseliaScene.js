import { BaseLevelScene } from './BaseLevelScene.js';

export class RoseliaScene extends BaseLevelScene {

    constructor() {
        super('RoseliaScene');
    }

    preload() {
        super.preload();
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    }

    create() {
        super.create();
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 150,
            y: 1100,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 50, 0xcccccc),
        });

        this.player = this.add.circle(400, 300, 50, 0xff0000);
        this.score = 0;

        // create score text
        this.scoreText = this.add.text(10, 100, 'Score: 0', { fontSize: '32px', color: '#000' });

        // spawn random targets every 1 seconds
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnTarget,
            callbackScope: this,
            loop: true
        });
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

        // Keep player within bounds
        this.player.x = Phaser.Math.Clamp(this.player.x, 50, 670);
        this.player.y = Phaser.Math.Clamp(this.player.y, 50, 900);
    }

    spawnTarget() {
        const target = this.add.circle(Phaser.Math.Between(50, 670), Phaser.Math.Between(50, 900), 30, 0x00ff00);
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