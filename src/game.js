const config = {
    width: 1280,
    height: 720,
    parent: "container",
    type: Phaser.AUTO,
    scene: {
        preload,
        create,
        update,
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image("dough", "assets/sprites/dough.png");
    this.load.image("pepperoni", "assets/sprites/pepperoni.png");
    this.load.image("cheese", "assets/sprites/cheese.png");
    this.load.image("fondo", "assets/sprites/fondo.png");
    this.load.image("sign", "assets/sprites/sign.png");
}

function create() {
    this.add.sprite(0, 0, "fondo").setOrigin(0, 0);
    this.add.sprite(650, 20, "sign").setOrigin(0, 0).setScale(0.75, 0.75);

    this.add.text(10, 10, "Score: ", { font: "50pt Unispace", fill: "000" });
    scoreNum = this.add.text(250, 10, "0 ", {
        font: "50pt Unispace",
        fill: "000",
    });

    currentSelected = null;
    moving = false;
    score = 0;
    text = this.add.text(0, 640, "", {
        font: "16px Courier",
        fill: "#fff",
        stroke: "#000",
        strokeThickness: 10,
    });

    var dough = this.add.sprite(200, 300, "dough").setInteractive();
    dough.setScale(1.5, 1.5);

    dough.on("pointerdown", (pointer) => {
        if (!moving || currentSelected == null) return;
        moving = false;
        currentSelected = null;
        score += 1000;
        scoreNum.setText(score);
    });

    pepperoniGen = this.add.sprite(750, 300, "pepperoni").setInteractive();
    this.add.text(795, 285, "Pepperoni", {
        font: "bold 32px Courier",
        fill: "#000",
        stroke: "#d1923f",
        strokeThickness: 6,
    });
    pepperoniGen.on("pointerdown", (pointer) => {
        if (!moving) {
            newPepperoni = this.add
                .sprite(pointer.x, pointer.y, "pepperoni")
                .setScale(0.5, 0.5);
            moving = true;
            currentSelected = newPepperoni;
        }
    });

    cheeseGen = this.add.sprite(750, 400, "cheese").setInteractive();
    this.add.text(795, 385, "Queso", {
        font: "bold 32px Courier",
        fill: "#000",
        stroke: "#d1923f",
        strokeThickness: 6,
    });
    cheeseGen.on("pointerdown", (pointer) => {
        if (!moving) {
            newCheese = this.add
                .sprite(pointer.x, pointer.y, "cheese")
                .setScale(0.5, 0.5);
            moving = true;
            currentSelected = newCheese;
        }
    });
}

function update(time, delta) {
    var p = this.input.activePointer;
    text.setText(["x: " + p.x, "y: " + p.y, "moving: " + moving]);
    if (moving) {
        currentSelected.x = p.x;
        currentSelected.y = p.y;
    }
}

function listener(sprite) {
    console.log("click");
}
