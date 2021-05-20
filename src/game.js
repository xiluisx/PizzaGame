class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }
    preload() {
        this.load.image("dough", "assets/sprites/dough.png");
        this.load.image("pepperoni", "assets/sprites/pepperoni.png");
        this.load.image("cheese", "assets/sprites/cheese.png");
        this.load.image("tomato", "assets/sprites/tomato.png");
        this.load.image("fondo", "assets/sprites/fondo.png");
        this.load.image("sign", "assets/sprites/sign.png");
        this.load.audio("pizzaSong", "assets/music/pizzaSong.mp3");
    }
    create() {
        let music = this.scene.scene.sound.add("pizzaSong", {
            loop: true,
            volume: 0.1,
        });
        music.play();
        this.levelInfo = {
            pepCount: 1,
            cheeseCount: 0,
            tomatoCount: 0,
            placedItems: [],
            completed() {
                return (
                    this.pepCount == 0 &&
                    this.cheeseCount == 0 &&
                    this.tomatoCount == 0
                );
            },
        };
        this.curLevel = 1;
        this.secLeft = 30;
        this.timer = this.scene.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.secLeft -= 1;
                console.log("time");
                this.timerText.setText(`Tiempo restante: ${this.secLeft}`);
                if (this.secLeft <= 0) {
                    console.log("End");
                    music.stop();
                    this.scene.start("GameOver", { score: this.score });
                }
            },
        });

        this.scene.add("GameOver", new GameOver());

        this.input.keyboard.on(
            "keydown-SPACE",
            function () {
                music.stop();
                this.scene.start("GameOver", { score: this.score });
            },
            this
        );
        this.add.sprite(0, 0, "fondo").setOrigin(0, 0);
        this.add.sprite(650, 20, "sign").setOrigin(0, 0).setScale(0.75, 0.75);

        this.add.text(10, 10, "Score: ", {
            font: "50pt Unispace",
            fill: "000",
        });
        this.scoreNum = this.add.text(250, 10, "0 ", {
            font: "50pt Unispace",
            fill: "000",
        });

        this.timerText = this.add.text(400, 640, "Tiempo restante: 30", {
            font: "50pt Unispace",
            fill: "000",
        });

        this.currentSelected = null;
        this.moving = false;
        this.score = 0;
        this.text = this.add.text(0, 640, "", {
            font: "16px Courier",
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 10,
        });

        var dough = this.add.sprite(200, 300, "dough").setInteractive();
        dough.setScale(1.5, 1.5);

        dough.on("pointerdown", (pointer) => {
            if (!this.moving || this.currentSelected == null) return;
            this.levelInfo.placedItems.push(this.currentSelected);
            this.placeAndCheck(this.currentSelected.name);
            this.moving = false;
            this.currentSelected = null;
        });

        this.pepperoniGen = this.add
            .sprite(750, 300, "pepperoni")
            .setInteractive();
        this.add.text(795, 285, "Pepperoni", {
            font: "bold 32px Courier",
            fill: "#000",
            stroke: "#d1923f",
            strokeThickness: 6,
        });
        this.pepCountText = this.add
            .text(690, 285, "x1", {
                font: "bold 32px Courier",
                fill: "#000",
                stroke: "#d1923f",
                align: "right",
                strokeThickness: 6,
            })
            .setOrigin(1, 0);
        this.pepperoniGen.on("pointerdown", (pointer) => {
            if (this.moving) return;
            let newPepperoni = this.add
                .sprite(pointer.x, pointer.y, "pepperoni")
                .setScale(0.5, 0.5);
            this.moving = true;
            this.currentSelected = newPepperoni;
            this.currentSelected.name = "Pepperoni";
        });

        this.cheeseGen = this.add.sprite(750, 400, "cheese").setInteractive();
        this.add.text(795, 385, "Queso", {
            font: "bold 32px Courier",
            fill: "#000",
            stroke: "#d1923f",
            strokeThickness: 6,
        });
        this.cheeseCountText = this.add
            .text(690, 385, "x0", {
                font: "bold 32px Courier",
                fill: "#000",
                stroke: "#d1923f",
                align: "right",
                strokeThickness: 6,
            })
            .setOrigin(1, 0);
        this.cheeseGen.on("pointerdown", (pointer) => {
            if (this.moving) return;
            let newCheese = this.add
                .sprite(pointer.x, pointer.y, "cheese")
                .setScale(0.5, 0.5);
            this.moving = true;
            this.currentSelected = newCheese;
            this.currentSelected.name = "Cheese";
        });

        this.cheeseGen = this.add.sprite(750, 500, "tomato").setInteractive();
        this.add.text(795, 485, "Tomate", {
            font: "bold 32px Courier",
            fill: "#000",
            stroke: "#d1923f",
            strokeThickness: 6,
        });
        this.tomCountText = this.add
            .text(690, 485, "x0", {
                font: "bold 32px Courier",
                fill: "#000",
                stroke: "#d1923f",
                align: "right",
                strokeThickness: 6,
            })
            .setOrigin(1, 0);
        this.cheeseGen.on("pointerdown", (pointer) => {
            if (this.moving) return;
            let newTomato = this.add
                .sprite(pointer.x, pointer.y, "tomato")
                .setScale(0.5, 0.5);
            this.moving = true;
            this.currentSelected = newTomato;
            this.currentSelected.name = "Tomato";
        });
    }
    update(time, delta) {
        var p = this.input.activePointer;
        this.text.setText(["x: " + p.x, "y: " + p.y, "moving: " + this.moving]);
        if (!this.moving) return;
        this.currentSelected.x = p.x;
        this.currentSelected.y = p.y;
    }
    onCompleteLevel() {
        console.log("Completing");
        this.secLeft = 30;
        this.timerText.setText(`Tiempo restante: ${this.secLeft}`);
        this.curLevel++;
        this.updateLevel();
    }
    updateLevel() {
        this.levelInfo.pepCount = this.curLevel;
        this.levelInfo.cheeseCount =
            this.curLevel - 3 < 0 ? 0 : this.curLevel - 3;
        this.levelInfo.tomatoCount =
            this.curLevel - 7 < 0 ? 0 : this.curLevel - 7;
        this.updateText();
    }
    updateText() {
        console.log(this.curLevel);
        console.log(this.levelInfo);
        this.pepCountText.setText(`x${this.levelInfo.pepCount}`);
        this.cheeseCountText.setText(`x${this.levelInfo.cheeseCount}`);
        this.tomCountText.setText(`x${this.levelInfo.tomatoCount}`);
    }
    placeAndCheck(type) {
        let dict = {
            Pepperoni: () => {
                if (this.levelInfo.pepCount > 0) {
                    this.levelInfo.pepCount--;
                    this.updateScore(1000);
                } else {
                    this.currentSelected.destroy();
                    this.updateScore(-100);
                }
            },
            Cheese: () => {
                if (this.levelInfo.cheeseCount > 0) {
                    this.levelInfo.cheeseCount--;
                    this.updateScore(1000);
                } else {
                    this.currentSelected.destroy();
                    this.updateScore(-100);
                }
            },
            Tomato: () => {
                if (this.levelInfo.tomatoCount > 0) {
                    this.levelInfo.tomatoCount--;
                    this.updateScore(1000);
                } else {
                    this.currentSelected.destroy();
                    this.updateScore(-100);
                }
            },
        };
        dict[type]();
        this.updateText();
        if (!this.levelInfo.completed()) return;
        this.clearAndChange();
    }
    clearAndChange() {
        while (this.levelInfo.placedItems.length > 0) {
            this.levelInfo.placedItems.pop().destroy();
        }
        this.onCompleteLevel();
    }
    updateScore(value) {
        this.score = this.score + value < 0 ? 0 : this.score + value;
        this.scoreNum.setText(this.score);
    }
}
