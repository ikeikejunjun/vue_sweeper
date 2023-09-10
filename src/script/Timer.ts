export default class Timer {
    playTime: number = 0;
    startTime: number | null = null;
    timer: number | null = null;

    constructor() {
        this.playTime = 0
        this.startTime = null
        this.timer = null
    }

    start() {
        console.log('Timer start playTime:' + this.playTime)
        this.startTime = Date.now()
        this.timer = setInterval(() => {
            this.playTime = Math.floor((Date.now() - this.startTime!) / 1000)
        }, 1000)
    }

    stop() {
        clearInterval(this.timer!)
    }

    reset() {
        this.stop()
        this.playTime = 0
        this.startTime = null
    }
}