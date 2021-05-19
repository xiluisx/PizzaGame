class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    }
    preload() {
        this.load.image("menuSign", "assets/sprites/menu.png");
    }
    create() {
        this.scene.add("Game", new Game());
        this.add
            .sprite(1280 / 2, 0, "menuSign")
            .setOrigin(0.5, 0)
            .setScale(0.8, 0.8);

        this.input.on("pointerdown", () => {
            this.scene.start("Game");
        });
        this.clickText = this.add
            .text(1280 / 2, 550, "Haz click para comenzar a jugar!!!", {
                fontSize: "48px",
            })
            .setOrigin(0.5, 0.5);
    }
    update(time, delta) {
        this.clickText.alpha = Math.cos(time * 0.005);
    }
}
