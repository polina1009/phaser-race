var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});


function preload() {
    game.load.image('background', 'assets/green-grase.jpg');
    game.load.image('road', 'assets/road.jpg');
    game.load.image('user-car', 'assets/car.png');
    game.load.image('enemy-car', 'assets/enemy-car.png');
}

var land;
var road;
var track;
var turn;
var player;
var currentSpeed = 0;
var cursors;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    land = game.add.tileSprite(0, 0, 800, 600, 'background');
    land.fixedToCamera = true;

    road = game.add.group();
    road.enableBody = true;

    track = road.create(0, game.world.height - 64, 'road');

    road.scale.setTo(0.5, 0.5);

    turn = road.create(240, 535, 'road');

    turn = road.create(450, 535, 'road');

    turn = road.create(650, 535, 'road');

    turn = road.create(850, 535, 'road');

    turn = road.create(1050, 535, 'road');

    turn = road.create(1250, 535, 'road');

    turn = road.create(1450, 535, 'road');


    player = game.add.sprite(10, game.world.height - 340, 'user-car');
    game.physics.arcade.enable(player);

}

function update() {
    game.physics.arcade.collide(player, turn);
    cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;



    if (cursors.left.isDown)
    {
        player.angle = 10;
        currentSpeed = 100;
    }
    else if (cursors.right.isDown)
    {
        player.angle = -10;
        currentSpeed = 100;
    }

    if (cursors.up.isDown)
    {
        currentSpeed = 300;
    }
    else
    {
        if (currentSpeed > 0)
        {
            currentSpeed += 2;
        }
    }

    if (cursors.down.isDown)
    {
        currentSpeed = -100;
    }
    else
    {
        if (currentSpeed > 0)
        {
            currentSpeed -= 2;
        }
    }

    if (currentSpeed > 0)
    {
        game.physics.arcade.velocityFromRotation(player.angle, currentSpeed, player.body.velocity);
    }

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;



}