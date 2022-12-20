import { ResourceLoader } from "../base/ResourceLoader";
import {
    Sprite
} from "../base/Sprite";

const WIDTH = 15;
const HEIGHT = 30;
/**
 * 子弹类
 */
export class Bullet extends Sprite {
    /**
     * 构造函数
     * @param {number} x 玩家飞机中心的x坐标
     * @param {number} y 玩家飞机y坐标
     */
    constructor(x, y) {
        let img = ResourceLoader.getInstance().getImage("bullet");
        super(img,x-WIDTH/2,y-HEIGHT,WIDTH,HEIGHT,true);
    }
}