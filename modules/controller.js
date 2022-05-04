export class Controller {
    stage = 0;

    constructor(game, view) {
        this.game = game;
        this.view = view;
    }

    init(keyCode) {
        window.addEventListener('keydown', event => {
            if (event.code === keyCode && this.stage === 0) {
                this.stage = 1;
                this.view.init();
                this.startGame();
            } else if (event.code === keyCode && this.stage === 2) {
                this.stage = 1;
                this.view.init();
                this.game.restartGame();
                this.startGame();
            }
        })
    }

    startGame() {
        this.view.showArea(this.game.viewArea);
        this.game.createUpdatePanels(this.view.createBlockScore(), this.view.createBlockNextTetramino());

        const timer = () => {
            const time = 1000 - 100 * this.game.level;

            if (this.game.gameOver) {
                this.stage = 2;
                this.view.endScreen(this.game.score, this.game.record);
                return;
            }

            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.viewArea);
                timer();
            }, time > 100 ? time : 100);
        };

        timer();

        window.addEventListener('keydown', event => {
            event.preventDefault();
            const keyCode = event.code;
            
            switch (keyCode) {
                case 'ArrowLeft':
                    this.game.moveLeft();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowRight':
                    this.game.moveRight();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowDown':
                    this.game.moveDown();
                    this.view.showArea(this.game.viewArea);
                    break;
                case 'ArrowUp':
                    this.game.rotateTetramino();
                    this.view.showArea(this.game.viewArea);
                    break;
            }
        });
    }
}