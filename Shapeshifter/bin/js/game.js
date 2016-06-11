var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Shapeshifter;
(function (Shapeshifter) {
    var Bat = (function (_super) {
        __extends(Bat, _super);
        function Bat(game, x, y) {
            _super.call(this, game, x, y, 'bat', 0);
            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = false;
            this.anchor.setTo(0.5, 0);
            this.animations.add('fly', [0, 1], 5, true);
            game.add.existing(this);
            this.alive = false;
            this.exists = false;
            this.visible = false;
        }
        Bat.prototype.update = function () {
            if (this.y > Shapeshifter.Game.GAME_HEIGHT + 200) {
                this.kill();
                return;
            }
        };
        Bat.prototype.reviveAsBrownBat = function () {
            this.revive(20);
            this.maxHealth = this.health;
            this.isDamaged = false;
            this.tint = 0x2B1D10;
            this.x = this.game.rnd.between(40, Shapeshifter.Game.WORLD_WIDTH - 40);
            this.y = -200;
            this.animations.play('fly');
            this.body.velocity.y = 200;
        };
        return Bat;
    }(Phaser.Sprite));
    Shapeshifter.Bat = Bat;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Shapeshifter.Boot = Boot;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar, 0);
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('rabbit', 'assets/rabbitSpriteSheet.png', 40, 40, 6);
            this.load.spritesheet('bat', 'assets/batSpriteSheet2.png', 60, 40, 2);
            this.load.spritesheet('wizardSpriteSheet', 'assets/wizardSpriteSheet.png', 28, 60, 5);
            this.load.image('level1ground', 'assets/caveFloorTile.png');
            this.load.image('healthBar', 'assets/healthBar.png');
            this.load.image('wizardBubble', 'assets/wizardBubble.png');
            this.load.image('crowBubble', 'assets/wizardBubble.png');
            this.load.image('wizardBullet', 'assets/wizardBullet.png');
            this.load.audio('mobDying', 'assets/SFX/mobDying.ogg', true);
            this.load.audio('playerDying', 'assets/SFX/playerDying.ogg', true);
            this.load.audio('playerHurt', 'assets/SFX/playerHurt.ogg', true);
            this.load.audio('rabbitJump', 'assets/SFX/rabbitJump.ogg', true);
            this.load.audio('transform', 'assets/SFX/transform.ogg', true);
            this.load.audio('wizardShooting', 'assets/SFX/wizardShooting.ogg', true);
            this.load.audio('wizardShootingSubdued', 'assets/SFX/wizardShootingSubdued.ogg', true);
            this.load.audio('ssLevel1Theme', 'assets/ssLevel1Theme.ogg', true);
        };
        Preloader.prototype.create = function () {
            if (Shapeshifter.Game.DEBUG_MODE)
                this.game.state.start('Level1', true, false);
            else {
                this.startMainMenu();
            }
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Shapeshifter.Preloader = Preloader;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            var _this = this;
            var textStyle = { font: "20px Arial", fill: "#ff0000", align: "center" };
            var gameOverText = "Shapeshifter\n      Move with arrow keys\n      1 and 2 are used for shapeshifting (if you have gotten the ability)\n      Wizard: Press Q to shoot\n      Click anywhere to start the game";
            var text = this.game.add.text(0, 0, gameOverText, textStyle);
            this.input.onDown.addOnce(function () { return _this.game.state.start('Level1', true, false); }, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Shapeshifter.MainMenu = MainMenu;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    (function (PlayerState) {
        PlayerState[PlayerState["Grounded"] = 0] = "Grounded";
        PlayerState[PlayerState["Airborne"] = 1] = "Airborne";
        PlayerState[PlayerState["Dead"] = 2] = "Dead";
        PlayerState[PlayerState["Transforming"] = 3] = "Transforming";
    })(Shapeshifter.PlayerState || (Shapeshifter.PlayerState = {}));
    var PlayerState = Shapeshifter.PlayerState;
    ;
    (function (PlayerForm) {
        PlayerForm[PlayerForm["Rabbit"] = 0] = "Rabbit";
        PlayerForm[PlayerForm["Wizard"] = 1] = "Wizard";
        PlayerForm[PlayerForm["Crow"] = 2] = "Crow";
    })(Shapeshifter.PlayerForm || (Shapeshifter.PlayerForm = {}));
    var PlayerForm = Shapeshifter.PlayerForm;
    ;
    Shapeshifter.Forms = [
        { name: 'Rabbit', movementSpeed: 250, walkSidewaysName: 'walkSideways', walkDownName: 'walkDown', walkUpName: 'walkUp' },
        { name: 'Wizard', movementSpeed: 150, walkSidewaysName: 'wizardWalk', walkDownName: 'wizardWalk', walkUpName: 'wizardWalk' },
        { name: 'Crow', movementSpeed: 200, walkSidewaysName: 'walkSideways', walkDownName: 'walkSideways', walkUpName: 'walkSideways' }
    ];
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'rabbit', 0);
            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.anchor.setTo(.5, .5);
            this.animations.add('walkSideways', [0, 1], 5, true);
            this.animations.add('walkDown', [2, 3], 5, true);
            this.animations.add('walkUp', [4, 5], 5, true);
            this.animations.add('wizardWalk', [0, 1, 2], 5, true);
            this.animations.add('wizardWalkAndShoot', [3, 4], 5, true);
            game.add.existing(this);
            this.maxHealth = 100;
            this.health = this.maxHealth;
            this.playerState = PlayerState.Grounded;
            this.healthBar = this.game.add.sprite(20, 20, 'healthBar');
            this.healthBar.anchor.setTo(0, 1);
            this.healthBar.scale.setTo(1, 0.5);
            this.healthBar.fixedToCamera = true;
            this.hasWizardForm = false;
            this.hasCrowForm = false;
            this.playerFormIndex = PlayerForm.Rabbit;
            this.playerDyingSound = this.game.add.audio('playerDying');
            this.transformationSound = this.game.add.audio('transform');
            this.wizardShootingSound = this.game.add.audio('wizardShootingSubdued');
            this.takeDamageCooldown = 0;
            this.transformationCooldown = 0;
            this.wizardShootingCooldown = 0;
            this.keyQ = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.keyEnter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.createPlayerBulletPool();
        }
        Player.prototype.update = function () {
            if (this.playerState != PlayerState.Transforming) {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
            if (this.takeDamageCooldown >= 1)
                this.takeDamageCooldown--;
            if (this.transformationCooldown >= 1)
                this.transformationCooldown--;
            if (this.wizardShootingCooldown >= 1)
                this.wizardShootingCooldown--;
            this.handleKeys();
        };
        Player.prototype.handleKeys = function () {
            var _this = this;
            switch (this.playerState) {
                case PlayerState.Grounded:
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                        this.body.velocity.x = -Shapeshifter.Forms[this.playerFormIndex].movementSpeed;
                        this.animations.play(Shapeshifter.Forms[this.playerFormIndex].walkSidewaysName);
                        if (this.scale.x == 1) {
                            this.scale.x = -1;
                        }
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                        this.body.velocity.x = Shapeshifter.Forms[this.playerFormIndex].movementSpeed;
                        this.animations.play(Shapeshifter.Forms[this.playerFormIndex].walkSidewaysName);
                        if (this.scale.x == -1) {
                            this.scale.x = 1;
                        }
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                        this.body.velocity.y = Shapeshifter.Forms[this.playerFormIndex].movementSpeed;
                        if (this.body.velocity.x == 0) {
                            this.animations.play(Shapeshifter.Forms[this.playerFormIndex].walkDownName);
                        }
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                        this.body.velocity.y = -Shapeshifter.Forms[this.playerFormIndex].movementSpeed;
                        if (this.body.velocity.x == 0) {
                            this.animations.play(Shapeshifter.Forms[this.playerFormIndex].walkUpName);
                        }
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                        if (this.playerFormIndex == PlayerForm.Wizard) {
                            this.animations.play('wizardWalkAndShoot');
                            if (this.transformationCooldown < 1) {
                                this.wizardShootingSound.play();
                                this.transformationCooldown = 10;
                                var bullet = this.playerBulletPool.getFirstExists(false);
                                bullet.reset(this.x, this.y - 20);
                                bullet.body.velocity.y = -500;
                            }
                        }
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
                        if (this.hasWizardForm && this.playerFormIndex != PlayerForm.Wizard && (this.transformationCooldown < 1)) {
                            this.transformationSound.play();
                            this.playerState = PlayerState.Transforming;
                            this.transformationCooldown = 60;
                            this.body.velocity.x = 0;
                            this.body.velocity.y = Shapeshifter.Game.VELOCITY_TO_MATCH_SCROLL_SPEED;
                            this.loadTexture("wizardSpriteSheet", 0, true);
                            this.playerFormIndex = PlayerForm.Wizard;
                            this.playerState = PlayerState.Grounded;
                            this.animations.play('wizardWalk');
                        }
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
                        if (this.playerFormIndex != PlayerForm.Rabbit && this.transformationCooldown < 1) {
                            this.transformationSound.play();
                            this.playerState = PlayerState.Transforming;
                            this.transformationCooldown = 60;
                            this.body.velocity.x = 0;
                            this.body.velocity.y = Shapeshifter.Game.VELOCITY_TO_MATCH_SCROLL_SPEED;
                            this.loadTexture("rabbit", 0, true);
                            this.playerFormIndex = PlayerForm.Rabbit;
                            this.playerState = PlayerState.Grounded;
                            this.animations.play('walkUp');
                        }
                    }
                    if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
                        this.animations.play(Shapeshifter.Forms[this.playerFormIndex].walkUpName);
                    }
                    break;
                case PlayerState.Dead:
                    this.keyEnter.onDown.add(function () {
                        _this.game.sound.stopAll();
                        _this.game.state.start('Level1', true, false);
                    });
                    break;
            }
        };
        Player.prototype.takeDamage = function (damageAmount) {
            this.takeDamageCooldown = 60;
            this.health -= damageAmount;
            this.healthBar.scale.setTo(this.health / 100, 0.5);
            if (this.health <= 0) {
                this.die();
            }
        };
        Player.prototype.die = function () {
            this.playerDyingSound.play();
            this.playerState = PlayerState.Dead;
            this.kill();
            var textStyle = { font: "32px Arial", fill: "#ff0000", align: "center" };
            var gameOverText = "GAME OVER\n      PRESS ENTER TO RESTART";
            var text = this.game.add.text(this.game.camera.x + 30, this.game.world.centerY - 40, gameOverText, textStyle);
        };
        Player.prototype.createPlayerBulletPool = function () {
            this.playerBulletPool = this.game.add.group();
            this.playerBulletPool.enableBody = true;
            this.playerBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
            this.playerBulletPool.createMultiple(100, 'wizardBullet');
            this.playerBulletPool.setAll('anchor.x', 0.5);
            this.playerBulletPool.setAll('anchor.y', 0.5);
            this.playerBulletPool.setAll('outOfBoundsKill', true);
            this.playerBulletPool.setAll('checkWorldBounds', true);
        };
        return Player;
    }(Phaser.Sprite));
    Shapeshifter.Player = Player;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    (function (PowerUpType) {
        PowerUpType[PowerUpType["Wizard"] = 0] = "Wizard";
        PowerUpType[PowerUpType["Crow"] = 1] = "Crow";
    })(Shapeshifter.PowerUpType || (Shapeshifter.PowerUpType = {}));
    var PowerUpType = Shapeshifter.PowerUpType;
    ;
    var PowerUp = (function (_super) {
        __extends(PowerUp, _super);
        function PowerUp(game, type) {
            var keyToUse = 'wizardBubble';
            if (type == PowerUpType.Crow)
                keyToUse = 'crowBubble';
            _super.call(this, game, Shapeshifter.Game.WORLD_WIDTH / 2, -100, keyToUse, 0);
            this.powerUpType = type;
            this.game.physics.arcade.enableBody(this);
            this.anchor.setTo(0.5, 0);
            game.add.existing(this);
            this.body.velocity.y = Shapeshifter.Game.VELOCITY_TO_MATCH_SCROLL_SPEED;
        }
        return PowerUp;
    }(Phaser.Sprite));
    Shapeshifter.PowerUp = PowerUp;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            var _this = this;
            this.game.world.setBounds(0, 0, Shapeshifter.Game.WORLD_WIDTH, Shapeshifter.Game.WORLD_HEIGHT);
            this.background = this.add.tileSprite(0, 0, Shapeshifter.Game.WORLD_WIDTH, Shapeshifter.Game.WORLD_HEIGHT, 'level1ground');
            this.ssLevel1Theme = this.add.audio('ssLevel1Theme', 0.3, false);
            this.ssLevel1Theme.play();
            this.getPowerUpSound = this.game.add.audio('wizardShooting');
            this.playerHurtSound = this.game.add.audio('playerHurt');
            this.enemyDyingSound = this.game.add.audio('mobDying');
            if (Shapeshifter.Game.MUTE_SOUND)
                this.game.sound.mute = true;
            this.player = new Shapeshifter.Player(this.game, Shapeshifter.Game.WORLD_WIDTH / 2, Shapeshifter.Game.WORLD_HEIGHT - 20);
            this.powerUps = this.game.add.group();
            this.enemies = this.game.add.group();
            for (var i = 0; i < 30; i++) {
                var bat = new Shapeshifter.Bat(this.game, this.game.rnd.between(40, Shapeshifter.Game.WORLD_WIDTH - 40), -200);
                this.enemies.add(bat);
                bat.exists = false;
                bat.alive = false;
            }
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
            this.game.camera.x = 50;
            this.game.camera.y = 0;
            if (!Shapeshifter.Game.EMPTY_ROOM) {
                var wave1Timer = this.game.time.events.add(Phaser.Timer.SECOND, this.startBrownBatWave, this);
                var powerUp1Timer = this.game.time.events.add(Phaser.Timer.SECOND * 7, function () {
                    var powerUp1 = new Shapeshifter.PowerUp(_this.game, Shapeshifter.PowerUpType.Wizard);
                    _this.powerUps.add(powerUp1);
                }, this);
                var wave2Timer = this.game.time.events.add(Phaser.Timer.SECOND * 9, this.startBrownBatWave, this);
                var wave3Timer = this.game.time.events.add(Phaser.Timer.SECOND * 18, this.startBrownBatWave, this);
                var victoryCondition = this.game.time.events.add(Phaser.Timer.SECOND * 36, this.stageDefeated, this);
            }
        };
        Level1.prototype.update = function () {
            this.physics.arcade.overlap(this.player, this.enemies, this.playerVsEnemy, null, this);
            this.physics.arcade.overlap(this.player.playerBulletPool, this.enemies, this.playerBulletVsEnemy, null, this);
            this.physics.arcade.overlap(this.player, this.powerUps, this.playerVsPowerUp, null, this);
            this.background.tilePosition.y += Shapeshifter.Game.GAME_SCROLL_SPEED;
        };
        Level1.prototype.playerVsEnemy = function (player, enemy) {
            enemy.kill();
            if (player.takeDamageCooldown < 1) {
                player.takeDamage(20);
                this.playerHurtSound.play();
            }
        };
        Level1.prototype.playerBulletVsEnemy = function (bullet, enemy) {
            enemy.kill();
            bullet.kill();
            this.enemyDyingSound.play();
        };
        Level1.prototype.playerVsPowerUp = function (player, powerUp) {
            powerUp.kill();
            this.getPowerUpSound.play();
            if (powerUp.powerUpType == Shapeshifter.PowerUpType.Wizard) {
                player.hasWizardForm = true;
            }
            else {
                player.hasCrowForm = true;
            }
        };
        Level1.prototype.startBrownBatWave = function () {
            var _this = this;
            this.game.time.events.repeat(300, 30, function () {
                var brownBat = _this.enemies.getFirstExists(false);
                if (brownBat)
                    brownBat.reviveAsBrownBat();
            });
        };
        Level1.prototype.stageDefeated = function () {
            if (this.player.playerState != Shapeshifter.PlayerState.Dead) {
                var textStyle = { font: "20px Arial", fill: "#ff0000", align: "center" };
                var gameOverText = "YOU ARE WINNER\n        Sorry there is so little \"game\" here, thanks for playing anyway";
                var text = this.game.add.text(0, 0, gameOverText, textStyle);
                text.fixedToCamera = true;
                text.cameraOffset.setTo(-20, 300);
            }
        };
        Level1.prototype.render = function () {
            var _this = this;
            if (Shapeshifter.Game.DEBUG_MODE) {
                this.game.debug.text("takeDamageCooldown: " + this.player.takeDamageCooldown + "\n        hasWizardForm: " + this.player.hasWizardForm, 10, 120);
                this.game.debug.text("Player X Scale: " + this.player.scale.x, 10, 140);
                this.game.debug.spriteInfo(this.player, 32, 32);
                this.game.debug.body(this.player);
                this.enemies.forEachAlive(function (member) { return _this.game.debug.body(member); }, this);
            }
        };
        return Level1;
    }(Phaser.State));
    Shapeshifter.Level1 = Level1;
})(Shapeshifter || (Shapeshifter = {}));
var Shapeshifter;
(function (Shapeshifter) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, Shapeshifter.Game.GAME_WIDTH, Shapeshifter.Game.GAME_HEIGHT, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Shapeshifter.Boot, false);
            this.state.add('Preloader', Shapeshifter.Preloader, false);
            this.state.add('MainMenu', Shapeshifter.MainMenu, false);
            this.state.add('Level1', Shapeshifter.Level1, false);
            this.state.start('Boot');
        }
        Object.defineProperty(Game, "DEBUG_MODE", {
            get: function () { return true; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "MUTE_SOUND", {
            get: function () { return true; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "EMPTY_ROOM", {
            get: function () { return true; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "GAME_WIDTH", {
            get: function () { return 600; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "GAME_HEIGHT", {
            get: function () { return 800; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "WORLD_WIDTH", {
            get: function () { return 700; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "WORLD_HEIGHT", {
            get: function () { return 800; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "GAME_SCROLL_SPEED", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "VELOCITY_TO_MATCH_SCROLL_SPEED", {
            get: function () { return 60; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "RABBIT_WALK_SPEED", {
            get: function () { return 250; },
            enumerable: true,
            configurable: true
        });
        return Game;
    }(Phaser.Game));
    Shapeshifter.Game = Game;
})(Shapeshifter || (Shapeshifter = {}));
window.onload = function () {
    game = new Shapeshifter.Game();
};
//# sourceMappingURL=game.js.map