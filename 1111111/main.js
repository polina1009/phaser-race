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

    game.input.onDown.add(toggle, this);

    function toggle() {

        moving = (moving === 0) ? moving = 1 : moving = 0;

    }

    block = game.add.group();
    block.enableBody = true;

    function addWallBlock(x, y) {
        var sprite = block.create(x, y, 'block');
        game.physics.enable(block, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
        sprite.body.immovable = true;
    }

    //верхняя горизонтальная
    addWallBlock(-1010, -990);
    addWallBlock(-970, -990);
    addWallBlock(-930, -990);
    addWallBlock(-890, -990);
    addWallBlock(-850, -990);
    addWallBlock(-810, -990);
    addWallBlock(-770, -990);
    addWallBlock(-730, -990);
    addWallBlock(-690, -990);
    addWallBlock(-650, -990);
    addWallBlock(-610, -990);
    addWallBlock(-570, -990);
    addWallBlock(-530, -990);
    addWallBlock(-490, -990);
    addWallBlock(-450, -990);
    addWallBlock(-410, -990);
    addWallBlock(-390, -990);
    addWallBlock(-350, -990);
    addWallBlock(-310, -990);
    addWallBlock(-270, -990);
    addWallBlock(-230, -990);
    addWallBlock(-190, -990);
    addWallBlock(-150, -990);
    addWallBlock(-110, -990);
    addWallBlock(-70, -990);
    addWallBlock(-30, -990);
    addWallBlock(10, -990);
    addWallBlock(50, -990);
    addWallBlock(90, -990);
    addWallBlock(130, -990);
    addWallBlock(170, -990);
    addWallBlock(210, -990);
    addWallBlock(250, -990);
    addWallBlock(290, -990);
    addWallBlock(330, -990);
    addWallBlock(370, -990);
    addWallBlock(410, -990);
    addWallBlock(450, -990);
    addWallBlock(490, -990);
    addWallBlock(510, -990);
    //правая вертикальная
    addWallBlock(510, -990);
    addWallBlock(510, -950);
    addWallBlock(510, -910);
    addWallBlock(510, -870);
    addWallBlock(510, -830);
    addWallBlock(510, -790);
    addWallBlock(510, -750);
    addWallBlock(510, -710);
    addWallBlock(510, -670);
    addWallBlock(510, -630);
    addWallBlock(510, -590);
    addWallBlock(510, -550);
    addWallBlock(510, -510);
    addWallBlock(510, -470);
    addWallBlock(510, -430);
    addWallBlock(510, -390);
    addWallBlock(510, -350);
    addWallBlock(510, -310);
    addWallBlock(510, -270);
    addWallBlock(510, -230);
    addWallBlock(510, -190);
    addWallBlock(510, -110);
    addWallBlock(510, -70);
    addWallBlock(510, -30);
    addWallBlock(510, 10);
    addWallBlock(510, 50);
    addWallBlock(510, 90);
    addWallBlock(510, 130);
    addWallBlock(510, 170);
    addWallBlock(510, 210);
    addWallBlock(510, 250);
    addWallBlock(510, 290);
    addWallBlock(510, 330);
    addWallBlock(510, 370);
    addWallBlock(510, 410);
    addWallBlock(510, 450);
    //нижняя горизонтальная
    addWallBlock(470, 450);
    addWallBlock(430, 450);
    addWallBlock(390, 450);
    addWallBlock(350, 450);
    addWallBlock(310, 450);
    addWallBlock(270, 450);
    addWallBlock(230, 450);
    addWallBlock(190, 450);
    addWallBlock(150, 450);
    addWallBlock(110, 450);
    addWallBlock(70, 450);
    addWallBlock(30, 450);
    addWallBlock(-10, 450);
    addWallBlock(-50, 450);
    addWallBlock(-90, 450);
    addWallBlock(-130, 450);
    addWallBlock(-170, 450);
    addWallBlock(-210, 450);
    addWallBlock(-250, 450);
    addWallBlock(-290, 450);
    addWallBlock(-330, 450);
    addWallBlock(-370, 450);
    addWallBlock(-410, 450);
    addWallBlock(-450, 450);
    addWallBlock(-490, 450);
    addWallBlock(-530, 450);
    addWallBlock(-570, 450);
    addWallBlock(-610, 450);
    addWallBlock(-650, 450);
    addWallBlock(-690, 450);
    addWallBlock(-730, 450);
    addWallBlock(-770, 450);
    addWallBlock(-810, 450);
    addWallBlock(-850, 450);
    addWallBlock(-890, 450);
    addWallBlock(-930, 450);
    addWallBlock(-970, 450);
    //левая вертикальная
    addWallBlock(-970, 410);
    addWallBlock(-970, 370);
    addWallBlock(-970, 330);
    addWallBlock(-970, 290);
    addWallBlock(-970, 250);
    addWallBlock(-970, 210);
    addWallBlock(-970, 170);
    addWallBlock(-970, 130);
    addWallBlock(-970, 90);
    addWallBlock(-970, 50);
    addWallBlock(-970, 10);
    addWallBlock(-970, -30);
    addWallBlock(-970, -70);
    addWallBlock(-970, -110);
    addWallBlock(-970, -150);
    addWallBlock(-970, -190);
    addWallBlock(-970, -230);
    addWallBlock(-970, -270);
    addWallBlock(-970, -310);
    addWallBlock(-970, -350);
    addWallBlock(-970, -390);
    addWallBlock(-970, -430);
    addWallBlock(-970, -470);
    addWallBlock(-970, -510);
    addWallBlock(-970, -550);
    addWallBlock(-970, -590);
    addWallBlock(-970, -630);
    addWallBlock(-970, -670);
    addWallBlock(-970, -710);
    addWallBlock(-970, -750);
    addWallBlock(-970, -790);
    addWallBlock(-970, -830);
    addWallBlock(-970, -870);
    addWallBlock(-970, -910);
    addWallBlock(-970, -950);



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
}

function render() {

}
