/**
 * 游戏精灵类
 */
export class Sprite {
    constructor(img = null, x = 0, y = 0, width = 0, height = 0, visible = true) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = visible;
        //表示是否参加碰撞
        this.isCollision = true;
    }
    /**
     * 将精灵对象会制在画布上
     * @param {RenderingContext} ctx 
     */
    draw(ctx) {
        if (this.visible) {
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.width, this.height);
        }
    }
    /**
     * x坐标增加一个数值
     * @param {*} value 
     */
    addX(value) {
        this.x += value;
    }
    /**
     * y坐标增加一个数值
     * @param {*} value 
     */
    addY(value) {
        this.y += value;
    }
    /**
     * 将精灵移动到x，y坐标
     * @param {*} y 
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * 销毁对象
     */
    destory() {
        this.img = null;
    }
    /**
     * 碰撞检测
     * 如果发生碰撞，返回true
     * 否则返回false
     * @param {Sprite} traget 目标对象
     */
    collisionDetectioin(traget) {
        /**
         * 判断是否参加碰撞
         */
        if (!this.isCollision || !traget.isCollision) {
            return false;
        }
        let t_left = traget.x;
        let t_right = traget.x + traget.width;
        let t_top = traget.y;
        let t_bottom = traget.y + traget.height;
        //判断左上角是否碰撞
        if (this.x >= t_left && this.x <= t_right && this.y >= t_top && this.y <= t_bottom) {
            return true;
        }
        //判断右上角是否碰撞
        if (this.x + this.width >= t_left && this.x + this.width <= t_right && this.y >= t_top && this.y <= t_bottom) {
            return true;
        }
        //判断左下角是否碰撞
        if (this.x >= t_left && this.x <= t_right && this.y + this.height >= t_top && this.y + this.height <= t_bottom) {
            return true;
        }
        //判断右下角是否碰撞
        if (this.x + this.width >= t_left && this.x + this.width <= t_right && this.y + this.height >= t_top && this.y + this.height <= t_bottom) {
            return true;
        }
        return false;
    }
}