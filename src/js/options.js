'use strict'

var config = require('./config.js');

var Options = {
    preload: function () {

    },
    create: function () {
        this.game.stage.backgroundColor = '#ffffff';

        this.background = this.game.add.image(0, 0, 'background');
        this.panel = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'panel');
        this.panel.anchor.setTo(0.5, 0.5);
        this.panel.scale.setTo(0.55, 0.55);

        this.bars = this.game.add.group();
        this.musicBar = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 - 100, 'volume');
        this.bars.add(this.musicBar);
        this.soundBar = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'volume');
        this.bars.add(this.soundBar);
        this.shootBar = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 + 100, 'volume');
        this.bars.add(this.shootBar);
        this.bars.setAll('anchor.x', 0.5);
        this.bars.setAll('anchor.y', 0.5);
        this.bars.setAll('scale.x', 0.5);
        this.bars.setAll('scale.y', 0.5);

        this.upButtons = this.game.add.group();
        this.upButton = this.game.add.button(this.game.camera.width / 2 + this.musicBar.width / 2 + 30, this.game.camera.height / 2 - 100, 'up', this.musicUp, this);
        this.upButton1 = this.game.add.button(this.game.camera.width / 2 + this.musicBar.width / 2 + 30, this.game.camera.height / 2, 'up', this.soundUp, this);
        this.upButton2 = this.game.add.button(this.game.camera.width / 2 + this.musicBar.width / 2 + 30, this.game.camera.height / 2 + 100, 'up', this.shootUp, this);
        this.upButtons.add(this.upButton);
        this.upButtons.add(this.upButton1);
        this.upButtons.add(this.upButton2);
        this.upButtons.setAll('anchor.x', 0.5);
        this.upButtons.setAll('anchor.y', 0.5);
        this.upButtons.setAll('scale.x', 0.5);
        this.upButtons.setAll('scale.y', 0.5);

        this.downButtons = this.game.add.group();
        this.downButton = this.game.add.button(this.game.camera.width / 2 - this.musicBar.width / 2 - 30, this.game.camera.height / 2 - 100, 'down', this.musicDown, this);
        this.downButton1 = this.game.add.button(this.game.camera.width / 2 - this.musicBar.width / 2 - 30, this.game.camera.height / 2, 'down', this.soundDown, this);
        this.downButton2 = this.game.add.button(this.game.camera.width / 2 - this.musicBar.width / 2 - 30, this.game.camera.height / 2 + 100, 'down', this.shootDown, this);
        this.downButtons.add(this.downButton);
        this.downButtons.add(this.downButton1);
        this.downButtons.add(this.downButton2);
        this.downButtons.setAll('anchor.x', 0.5);
        this.downButtons.setAll('anchor.y', 0.5);
        this.downButtons.setAll('scale.x', 0.5);
        this.downButtons.setAll('scale.y', 0.5);

        this.cursors = this.game.add.group();
        this.musicController = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 - 100, 'volumebar');
        this.soundController = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'volumebar');
        this.shootController = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 + 100, 'volumebar');
        this.cursors.add(this.musicController);
        this.cursors.add(this.soundController);
        this.cursors.add(this.shootController);
        this.cursors.setAll('anchor.x', 0.5);
        this.cursors.setAll('anchor.y', 0.5);
        this.cursors.setAll('scale.x', 0.5);
        this.cursors.setAll('scale.y', 0.5);

        this.backButton = this.game.add.button(590, 530, 'backbutton', this.backSelection, this, 1, 0, 1);

        this.musicText = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 - 150, "Music Volume",
            {
                font: "18px 8-bit",
                fill: "#ff9600",
                align: "center"
            });
        this.musicText.anchor.setTo(0.5, 0.5);
        this.soundText = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 - 50, "Characters Volume",
            {
                font: "18px 8-bit",
                fill: "#ff9600",
                align: "center"
            });
        this.soundText.anchor.setTo(0.5, 0.5);
        this.shootText = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 + 50, "Sounds Volume",
            {
                font: "18px 8-bit",
                fill: "#ff9600",
                align: "center"
            });
        this.shootText.anchor.setTo(0.5, 0.5);

        this.game.camera.flash(0xff0000, 1000);
    },

    update: function () {
        if (config.musicVolume === 0)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 2;
        else if (config.musicVolume === 0.5)
            this.cursors.getChildAt(0).x = this.game.camera.width / 2;
        else if (config.musicVolume === 0.25)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 4;
        else if (config.musicVolume === 0.75)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 4;
        else if (config.musicVolume === 1)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 2;

        if (config.entityVolume === 0)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 2;
        else if (config.entityVolume === 0.5)
            this.cursors.getChildAt(1).x = this.game.camera.width / 2;
        else if (config.entityVolume === 0.25)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 4;
        else if (config.entityVolume === 0.75)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 4;
        else if (config.entityVolume === 1)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 2;

        if (config.shotsVolume === 0)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 2;
        else if (config.shotsVolume === 0.28)
            this.cursors.getChildAt(2).x = this.game.camera.width / 2;
        else if (config.shotsVolume === 0.14)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 4;
        else if (config.shotsVolume === 0.42000000000000004)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 4;
        else if (config.shotsVolume === 0.56)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 2;
    },

    musicUp: function () {
        if (config.musicVolume < 1) {
            config.musicVolume += 0.25;
        }
    },
    musicDown: function () {
        if (config.musicVolume > 0) {
            config.musicVolume -= 0.25;
        }
    },

    soundDown: function () {
        if (config.entityVolume > 0) {
            config.entityVolume -= 0.25;
        }
    },

    soundUp: function () {
        if (config.entityVolume < 1) {
            config.entityVolume += 0.25;
        }
    },

    shootDown: function () {
        if (config.shotsVolume > 0) {
            config.shotsVolume -= 0.14;
        }
    },

    shootUp: function () {
        if (config.shotsVolume < 0.56) {
            config.shotsVolume += 0.14;
        }
    },

    backSelection: function () {
        config.menuMusic.stop();
        this.game.state.start('MainMenu');
    },

};


module.exports = Options;