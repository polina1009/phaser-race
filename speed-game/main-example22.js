var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render});


function preload() {
    game.load.image('background', 'assets/background.jpg');
    game.load.image('block', 'assets/stone.png');
    game.load.image('user-car', 'assets/car.png');
    game.load.image('enemy-car', 'assets/enemy-car.png');
}

var land;
var player;
var currentSpeed = 0;
var cursors;
var moving;
var block;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    land = game.add.tileSprite(0, 0, 1900, 1900, 'background');
    game.world.setBounds(-1000, -1000, 1500, 1500);
    land.fixedToCamera = true;

    // player = game.add.sprite(game.world.centerX, game.world.centerY, 'user-car');
    // cursors = game.input.keyboard.createCursorKeys();
    // game.add.sprite(0, 0, 'background');
    //cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(toggle, this);

    function toggle() {

        moving = (moving === 0) ? moving = 1 : moving = 0;

    }

    block = game.add.group();
    block.enableBody = true;


    var sprite = block.create(0, 0, 'block');
    game.physics.enable(block, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;
    sprite.body.immovable = true;

    player = game.add.sprite(0, 0, 'user-car');
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.bounce.setTo(0.5, 0.5);


    game.physics.arcade.enable(player);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(500, 500);
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {
    game.physics.arcade.collide(player, block);
    //game.physics.arcade.collide(player, wall);


    if (cursors.left.isDown)
    {
        player.angle -= 4;
    }
    else if (cursors.right.isDown)
    {
        player.angle += 4;
    }

    if (cursors.up.isDown)
    {
        currentSpeed = 300;
    }
    else if (cursors.down.isDown)
    {
        currentSpeed = -300;
    }
    else
    {
        if (currentSpeed > 0)
        {
            currentSpeed -= 4;
        }
    }

    if (currentSpeed > 0)
    {
        game.physics.arcade.velocityFromRotation(player.rotation, currentSpeed, player.body.velocity);
    }

    if (currentSpeed < 0)
    {
        game.physics.arcade.velocityFromRotation(player.rotation, currentSpeed, player.body.velocity);
    }

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    // game.physics.arcade.enable([player, enemy-car, killer, block]);

    //game.physics.arcade.overlap(player, view.rocketIconGroup, rockets.addRocket, null, rockets);
}

function render() {
    
}
