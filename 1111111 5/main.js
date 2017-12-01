var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render});

function preload() {
    game.load.image('background', 'assets/background-table.jpg');
    game.load.image('player', 'assets/player.png');
    // game.load.image('enemy-car', 'assets/enemy-car.png');
    game.load.spritesheet('pencil-left','assets/pencil-left.png');
    game.load.spritesheet('pencil-right','assets/pencil-right.png');
    game.load.spritesheet('marker','assets/marker.png');
    game.load.spritesheet('cactus','assets/cactus.png');
    game.load.spritesheet('sprocket','assets/sprocket.png');
    game.load.spritesheet('clip','assets/clip-1.png');
    game.load.spritesheet('clip-vert','assets/clip-vert.png');
    game.load.spritesheet('sprocket','assets/sprocket.png');
    game.load.physics("pencil-left-collision","assets/pencil-left-collision.json");
    game.load.physics("pencil-right-collision","assets/pencil-right-collision.json");
    game.load.physics("marker-collision","assets/marker-collision.json");
    game.load.physics("cactus-collision","assets/cactus-collision.json");
    game.load.physics("sprocket-collision","assets/sprocket-collision.json");
    game.load.physics("clip-collision","assets/clip-collision1.json");
    game.load.physics("clip-vert-collision","assets/clip-vert-collision.json");
    game.load.physics("player-collision","assets/player-collision.json");
}

var land;
var player;
var velocity = 0;
var cursors;
var block;

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    // картинка бэкграунда 2048x1536
    land = game.add.tileSprite(0, 0, 2048, 1536, 'background');
    game.world.setBounds(0, 0, 2048, 1536);

    // добавляем игрока
    addPlayer();
    // рисуем карандаши и маркеры по границам
    drawWorldBoundaries();
    // рисуем внутренние объекты
    drawTrack();
    // камера ездит за игроком
    workWithCamera();

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    updateVelocity();
}

function render() {

}

function addPlayer() {
    player = addRealObject({
        x: 500,
        y: 500,
        spriteName: 'player',
        collisionName: 'player-collision',
        collisionSectionName: 'player'
    });
    // player = game.add.sprite(500, 500, 'player');
    // game.physics.p2.enable(player);
}

function addRealObject(options) {
    var object = game.add.sprite(options.x, options.y, options.spriteName);
    // пропорционально ужимаем/растягиваем объект
    // НЕ РАБОТАЕТ после this.chicken.angle = 90;применения физики...
    if (options.scale) {
        object.scale.setTo(options.scale, options.scale);
    }

    // угол объекта.. не работает
    if (options.angle) {
        object.angle = options.angle;
    }

    game.physics.p2.enable(object);

    // делаем неподвижным
    if (options.immovable === true) {
        object.body.kinematic = true;
    }

    // рисуем нормальную границу вместо квадратной
    if (options.collisionName) {
        object.body.clearShapes();
        object.body.loadPolygon(options.collisionName, options.collisionSectionName);
    }

    //object.body.rotateLeft(45);

    return object;
}

function drawWorldBoundaries() {
    addRealObject({
        x: 550,
        y: 160,
        spriteName: 'pencil-right',
        immovable: true,
        collisionName: 'pencil-right-collision',
        collisionSectionName: 'pencil-right'
    });

    addRealObject({
        x: 1500,
        y: 160,
        spriteName: 'pencil-left',
        immovable: true,
        collisionName: 'pencil-left-collision',
        collisionSectionName: 'pencil-left'
    });

    addRealObject({
        x: 550,
        y: 1300,
        spriteName: 'pencil-left',
        immovable: true,
        collisionName: 'pencil-left-collision',
        collisionSectionName: 'pencil-left'
    });

    addRealObject({
        x: 1500,
        y: 1300,
        spriteName: 'pencil-right',
        immovable: true,
        collisionName: 'pencil-right-collision',
        collisionSectionName: 'pencil-right'
    });

    addRealObject({
        x: 200,
        y: 720,
        spriteName: 'marker',
        immovable: true,
        collisionName: 'marker-collision',
        collisionSectionName: 'marker'
    });

    addRealObject({
        x: 1800,
        y: 720,
        spriteName: 'marker',
        immovable: true,
        collisionName: 'marker-collision',
        collisionSectionName: 'marker'
    });
}
function drawTrack() {
    addRealObject({
        x: 1000,
        y: 700,
        spriteName: 'cactus',
        immovable: true,
        collisionName: 'cactus-collision',
        collisionSectionName: 'cactus'
    });

    addRealObject({
        x: 1600,
        y: 400,
        spriteName: 'clip',
        immovable: true,
        collisionName: 'clip-collision',
        collisionSectionName: 'clip-1'
    });

    addRealObject({
        x: 600,
        y: 400,
        spriteName: 'clip',
        immovable: true,
        collisionName: 'clip-collision',
        collisionSectionName: 'clip-1'
    });

    addRealObject({
        x: 1300,
        y: 1000,
        spriteName: 'clip',
        immovable: true,
        collisionName: 'clip-collision',
        collisionSectionName: 'clip-1'
    });

    addRealObject({
        x: 1600,
        y: 1000,
        spriteName: 'clip',
        immovable: true,
        collisionName: 'clip-collision',
        collisionSectionName: 'clip-1'
    });


    addRealObject({
        x: 1300,
        y: 400,
        spriteName: 'clip-vert',
        immovable: true,
        collisionName: 'clip-vert-collision',
        collisionSectionName: 'clip-vert'
    });

    addRealObject({
        x: 500,
        y: 1100,
        spriteName: 'clip-vert',
        immovable: true,
        collisionName: 'clip-vert-collision',
        collisionSectionName: 'clip-vert'
    });


    addRealObject({
        x: 1000,
        y: 250,
        spriteName: 'sprocket',
        immovable: true,
        collisionName: 'sprocket-collision',
        collisionSectionName: 'sprocket'
    });

    addRealObject({
        x: 1500,
        y: 650,
        spriteName: 'sprocket',
        immovable: true,
        collisionName: 'sprocket-collision',
        collisionSectionName: 'sprocket'
    });

    addRealObject({
        x: 1000,
        y: 1100,
        spriteName: 'sprocket',
        immovable: true,
        collisionName: 'sprocket-collision',
        collisionSectionName: 'sprocket'
    });
}

function workWithCamera() {
    land.fixedToCamera = false;
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(500, 500);
}

function updateVelocity() {
    if (cursors.up.isDown && velocity <= 400) {
        velocity+=7;
    } else if (cursors.down.isDown) {
        velocity-=7;
    }
    else {
        if (velocity >= 7) {
            velocity -= 7;
        } else if (velocity <= -7) {
            velocity += 7;
        } else {
            velocity = 0;
        }
    }

    // баг с неостановкой ..не работает
    // if (Math.abs(player.body.velocity.x) <= 7 && Math.abs(player.body.velocity.y) <= 7) {
    //     if (velocity > 20) {
    //         velocity = 0;
    //     }
    // }

    // player.body.velocity.x = velocity * Math.cos((player.angle-90)*0.01745);
    // player.body.velocity.y = velocity * Math.sin((player.angle-90)*0.01745);

    player.body.velocity.x = velocity * Math.cos((player.angle)*0.01745);
    player.body.velocity.y = velocity * Math.sin((player.angle)*0.01745);

    if (cursors.left.isDown)
        player.body.angularVelocity = -15*(velocity/1000);
    else if (cursors.right.isDown)
        player.body.angularVelocity = 15*(velocity/1000);
    else
        player.body.angularVelocity = 0;
}

