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
    game.camera.follow(player);




    game.add.sprite(0, 0, 'background');

    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(toggle, this);

    function toggle() {

        moving = (moving === 0) ? moving = 1 : moving = 0;

    }

    road = game.add.group();
    road.enableBody = true;

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

}

function update() {
    game.physics.arcade.collide(player, turn);
     cursors = game.input.keyboard.createCursorKeys();
     player.body.velocity.x = 0;





    if (currentSpeed > 0)
    {
        game.physics.arcade.velocityFromRotation(player.angle, currentSpeed, player.body.velocity);
    }

    if (currentSpeed < 0)
    {
        game.physics.arcade.velocityFromRotation(player.angle, currentSpeed, player.body.velocity);
    }

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    if (moving === 0)
    {
        if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
    }
    else
    {
        if (cursors.left.isDown)
        {
            player.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            player.x += 4;
        }

        if (cursors.up.isDown)
        {
            player.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            player.y += 4;
        }
    }



}

