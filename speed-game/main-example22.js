var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render});


function preload() {
    game.load.image('background', 'assets/green-grase.jpg');
    game.load.image('road', 'assets/road.jpg');
    game.load.image('block', 'assets/stone.png');
    game.load.image('user-car', 'assets/car.png');
    game.load.image('enemy-car', 'assets/enemy-car.png');
}

var land;
var road;
var player;
var currentSpeed = 0;
var cursors;
var moving;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    land = game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(-1000, -1000, 2000, 2000);
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


    var sprite1 = game.add.sprite(70, 250, 'block');
    var sprite2 = game.add.sprite(0, 0, 'block').alignTo(sprite1, Phaser.RIGHT_CENTER, 16);
    var sprite3 = game.add.sprite(0, 0, 'block').alignTo(sprite2, Phaser.RIGHT_CENTER, 16);
    var sprite4 = game.add.sprite(0, 0, 'block').alignTo(sprite3, Phaser.RIGHT_CENTER, 16);
    var sprite5 = game.add.sprite(0, 0, 'block').alignTo(sprite4, Phaser.RIGHT_CENTER, 16);
    var sprite6 = game.add.sprite(0, 0, 'block').alignTo(sprite5, Phaser.RIGHT_CENTER, 16);


    // road = game.add.group();
    //  road.enableBody = true;

    // track = road.create(0, game.world.height - 65, 'road');
    //
    // road.scale.setTo(0.5, 0.5);
    //
    // turn = road.create(240, 535, 'road');
    //
    // turn = road.create(450, 535, 'road');
    //
    // turn = road.create(650, 535, 'road');
    //
    // turn = road.create(850, 535, 'road');
    //
    // turn = road.create(1050, 535, 'road');
    //
    // turn = road.create(1250, 535, 'road');
    //
    // turn = road.create(1450, 535, 'road');


    //player = game.add.sprite(10, game.world.height - 305, 'user-car');
    player = game.add.sprite(0, 0, 'user-car');
    game.physics.arcade.enable(player);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);

    cursors = game.input.keyboard.createCursorKeys();

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





    //game.physics.arcade.overlap(player, view.rocketIconGroup, rockets.addRocket, null, rockets);
}

function render() {
    
}
