var game = new Phaser.Game(800, 600, Phaser.AUTO, 'main_game', { preload: preload, create: create, update: update });

function preload() {
    game.world.setBounds(0, 0, 1280, 800);

    game.load.image('map','assets/green-grase.jpg');
    game.load.spritesheet('car','assets/car.png');
    game.load.spritesheet('building','assets/5 (1111) copy.png');
    game.load.physics("collision","assets/outerWall-collision.json");
}




var cursors;
var velocity = 0;
function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    land = game.add.tileSprite(0, 0, 1920, 1920, 'map');
    game.world.setBounds(-1000, -1000, 2000, 2000);

    car = game.add.sprite(0,0,'car');
    game.physics.p2.enable(car);
    // car.body.angle = 90;

    cursors = game.input.keyboard.createCursorKeys();

    var carCollisionGroup = game.physics.p2.createCollisionGroup();
    var buildingCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    var building = game.add.sprite(640,420,'building');
    game.physics.p2.enable(building);
    building.body.kinematic = true; //Building is static
    building.body.clearShapes(); //Remove standard Bounding Box
    building.body.loadPolygon('collision','outer_weed'); //Load Bounding Box from Physics Editor File

    car.body.setCollisionGroup(carCollisionGroup);
    building.body.setCollisionGroup(buildingCollisionGroup);
    car.body.collides([carCollisionGroup,buildingCollisionGroup]);
    building.body.collides([buildingCollisionGroup,carCollisionGroup]);

    game.camera.follow(car);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);
}

function update()
{
    if (cursors.up.isDown && velocity <= 400) {
        velocity+=7;
    } else if (cursors.down.isDown) {
        velocity-=7;
    }
    else {
        if (velocity >= 7) {
            velocity -= 27;
        } else if (velocity <= -7) {
            velocity += 27;
        } else {
            velocity = 0;
        }
    }


    // car.body.velocity.x = velocity * Math.cos((car.angle-90)*0.01745);
    // car.body.velocity.y = velocity * Math.sin((car.angle-90)*0.01745);

    car.body.velocity.x = velocity * Math.cos((car.angle)*0.01745);
    car.body.velocity.y = velocity * Math.sin((car.angle)*0.01745);

    if (cursors.left.isDown)
        car.body.angularVelocity = -15*(velocity/1000);
    else if (cursors.right.isDown)
        car.body.angularVelocity = 15*(velocity/1000);
    else
        car.body.angularVelocity = 0;
}