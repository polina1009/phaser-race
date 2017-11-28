var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'SCENE', { preload: preload, create: create, update: update });

var userCar;
var anotherCar;

function preload() {
    game.load.image('road', 'assets/asphalt.jpg');
    game.load.image('playerCar', 'assets/car.png');
    game.load.image('computerCar', 'assets/comp-car.png');
    game.load.image('background', 'assets/green-grase.jpg');
}

var playerCar;
// var computerCar;
// var road;

// var computerCarSpeed = 190;
// var playerCarSpeed = 300;



function createCar(x, y) {
    var car = game.add.sprite(x, y, 'playerCar');
    car.anchor.setTo(0.5, 0.5);
    // console.log(car);

    // car.body.collideWorldBounds = true;
    // car.body.bounce.setTo(1, 1);
    // car.body.immovable = true;

    return car;
}



// var CarStarted = false;
//
// function startCar() {
//     if (!CarStarted) {
//         car.body.velocity.x = playerCarSpeed;
//         car.body.velocity.y = -playerCarSpeed;
//         CarStarted = true;
//     }
// }
//
function create() {
    game.add.tileSprite(0, 0, 600, 600, 'background');
    // var playerCar = game.add.sprite(200, 240, 'playerCar');
    // playerCar = createCar(game.world.centerX, 500);

    userCar = game.add.group();
    anotherCar = game.add.group();

    for (var i = 0; i < 4; i++) {
        anotherCar.create('computerCar');
    }

    var playerCar = game.add.sprite(200, 240, 'playerCar');

    userCar.add(playerCar);




    // computerCar = createCar(game.world.centerX, 200);

    // road = game.add.sprite(game.world.centerX, game.world.centerY, 'road');
    // road.anchor.setTo(0.5, 0.5);
    // road.body.collideWorldBounds = true;
    // road.body.bounce.setTo(1, 1);
    //
    // game.input.onDown.add(startCar(), this);
}

function update () {
}


