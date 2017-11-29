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
var moving;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    land = game.add.tileSprite(0, 0, 1920, 1920, 'background');
    //game.world.setBounds(0, 0, 1920, 1920);

    land.fixedToCamera = true;

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'user-car');
    cursors = game.input.keyboard.createCursorKeys();




    game.add.sprite(0, 0, 'background');

    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(toggle, this);

    function toggle() {

        moving = (moving === 0) ? moving = 1 : moving = 0;

    }

    road = game.add.group();
    // road.enableBody = true;

    track = road.create(0, game.world.height - 65, 'road');

    road.scale.setTo(0.5, 0.5);

    turn = road.create(240, 535, 'road');

    turn = road.create(450, 535, 'road');

    turn = road.create(650, 535, 'road');

    turn = road.create(850, 535, 'road');

    turn = road.create(1050, 535, 'road');

    turn = road.create(1250, 535, 'road');

    turn = road.create(1450, 535, 'road');


    player = game.add.sprite(10, game.world.height - 305, 'user-car');
    game.physics.arcade.enable(player);

    // player.anchor.setTo(0.5, 0.5);
    // //  This will force it to decelerate and limit its speed
    // game.physics.enable(player, Phaser.Physics.ARCADE);

    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);

}

function update() {
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
        //  The speed we'll travel at
        currentSpeed = 300;
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
        game.physics.arcade.velocityFromRotation(player.angle, currentSpeed, player.body.velocity);
    }

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
}

