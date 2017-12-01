var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('background', 'assets/background-table.jpg');
    game.load.image('player', 'assets/player.png');
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

    land = game.add.tileSprite(0, 0, 2048, 1536, 'background');
    game.world.setBounds(0, 0, 2048, 1536);

    addPlayer();

    border.forEach(function (border) {
        addRealObject(border)
    });
    trackObj.forEach(function (obj) {
        addRealObject(obj)
    });

    workWithCamera();

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    updateVelocity();
}

function addPlayer() {
    player = addRealObject({
        x: 500,
        y: 500,
        spriteName: 'player',
        collisionName: 'player-collision',
        collisionSectionName: 'player'
    });
}

function addRealObject(options) {
    var object = game.add.sprite(options.x, options.y, options.spriteName);


    if (options.scale) {
        object.scale.setTo(options.scale, options.scale);
    }

    if (options.angle) {
        object.angle = options.angle;
    }

    game.physics.p2.enable(object);

    if (options.immovable === true) {
        object.body.kinematic = true;
    }

    if (options.collisionName) {
        object.body.clearShapes();
        object.body.loadPolygon(options.collisionName, options.collisionSectionName);
    }

    return object;
}

function workWithCamera() {
    var bounds = 0.3;
    var w = window.innerWidth;
    var h = window.innerHeight;

    land.fixedToCamera = false;
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(w*bounds, h*bounds, w*(1-bounds*2), h*(1-bounds*2));
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

    player.body.velocity.x = velocity * Math.cos((player.angle)*0.01745);
    player.body.velocity.y = velocity * Math.sin((player.angle)*0.01745);

    if (cursors.left.isDown)
        player.body.angularVelocity = -15*(velocity/1000);
    else if (cursors.right.isDown)
        player.body.angularVelocity = 15*(velocity/1000);
    else
        player.body.angularVelocity = 0;
}

