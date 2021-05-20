class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }
    init(data) {
        this.finalScore = data.score;
    }
    create() {
        this.add
            .text(
                1280 / 2,
                720 / 2,
                "Perdiste\nTu score fue: " +
                    this.finalScore +
                    "\n\nPresiona espacio\npara jugar de nuevo",
                {
                    fontSize: "64px",
                    align: "center",
                }
            )
            .setOrigin(0.5);
        this.scene.remove("Menu");
        this.scene.remove("Game");
        this.scene.add("Menu", new Menu());
        this.input.keyboard.on(
            "keydown-SPACE",
            function () {
                this.scene.start("Menu", { score: this.score });
                this.scene.remove("GameOver");
            },
            this
        );
    }
}
