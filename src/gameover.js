class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }
    init(data) {
        this.finalScore = data.score;
    }
    create() {
        this.add.text(0, 0, "Final Score: " + this.finalScore, {});
    }
}
