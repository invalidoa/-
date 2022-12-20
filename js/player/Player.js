import {
    ResourceLoader
} from "../base/ResourceLoader";
import {
    Sprite
} from "../base/Sprite";
const WIDTH = 80;
const HEIGHT = 80;
export class Player extends Sprite {
    constructor() {
        let img = ResourceLoader.getInstance().getImage("player");
        let x = (window.innerWidth - WIDTH) / 2;
        let y = window.innerHeight - 200;
        super(img, x, y, WIDTH, HEIGHT, true);
        this.touched = false;
        this.addTouchListener();
    }
    /**
     * 添加手指触摸相应
     */
    addTouchListener() {
        //触摸开始
        canvas.addEventListener("touchstart", (e) => {
            //阻止默认的手指触摸事件
            e.preventDefault();
            const fingerX = e.touches[0].clientX;
            const fingerY = e.touches[0].clientY;
            if (this.checkFingerOnPlane(fingerX, fingerY)) {
                this.touched = true;
                this.setPlaneToFingerPos(fingerX, fingerY);
            }
        });
        //手指滑动
        canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const fingerX = e.touches[0].clientX;
            const fingerY = e.touches[0].clientY;
            if (this.touched) {
                this.setPlaneToFingerPos(fingerX, fingerY);
            }
        });
        //触摸结束
        canvas.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.touched = false;
        });
    }
    /**
     * 判断手指是否停留在玩家飞机上
     * @param {number} fx 
     * @param {number} fy 
     * @return{boolean}手指是否在飞机上
     */
    checkFingerOnPlane(fx, fy) {
        if (fx >= this.x && fx <= this.x + this.width && fy >= this.y && fy <= this.y + this.height) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 将飞机移动到手指的坐标
     * @param {*} fx 
     * @param {*} fy 
     */
    setPlaneToFingerPos(fx, fy) {
        //将飞机的正中心设置为手指的坐标
        let dx = fx - this.width / 2;
        let dy = fy - this.height / 2;
        //超出屏幕判断，始终保持在屏幕内
        if (dx < 0) {
            dx = 0;
        } else if (dx > window.innerWidth - this.width) {
            dx = window.innerWidth - this.width;
        }
        if (dy < 0) {
            dy = 0;
        } else if (dy > window.innerHeight - this.height) {
            dy = window.innerHeight - this.height;
        }
        this.x = dx;
        this.y = dy;
    }
}