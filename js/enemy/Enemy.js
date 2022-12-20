import {
    ResourceLoader
} from "../base/ResourceLoader";
import {
    Sprite
} from "../base/Sprite";

const WIDTH = 60;
const HEIGHT = 60;
export class Enemy extends Sprite {
    constructor() {
        let img = ResourceLoader.getInstance().getImage("enemy");
        let randX = Math.floor(Math.random() * (window.innerWidth - WIDTH));
        let y = -HEIGHT - 20
        super(img, randX, y, WIDTH, HEIGHT, true);
        this.frameIndex = 1;
    }
    /**
     * 播放爆炸动画
     * 当全部爆炸动画的帧图都播放完毕
     * 停止播放，并隐藏当前enemy对象
     */
    playExplosion() {
        if (this.frameIndex > 19) {
            this.visible = false;
            return;
        }
        this.img = ResourceLoader.getInstance().getImage(`explosion${this.frameIndex}`);
        this.frameIndex++;
        setTimeout(() => this.playExplosion(), 1000 / 60);

    }
}