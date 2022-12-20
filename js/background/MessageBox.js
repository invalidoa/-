import {
    ResourceLoader
} from "../base/ResourceLoader";
//let instance;
const SCORE_KEY = "score";
const P_WIDTH = 300;
const P_HEIGHT = 240;
const P_X = (window.innerWidth - P_WIDTH) / 2;
const P_Y = (window.innerHeight - P_HEIGHT) / 2;
const B_WIDTH = 150;
const B_HEIGHT = 40;
const B_X = (window.innerWidth - B_WIDTH) / 2;
const B_Y = P_Y + 160;
/**
 * 消息框类
 */
export class MessageBox {
    constructor() {
        this.img = ResourceLoader.getInstance().getImage("common");
        this.pannel_x = 270;
        this.pannel_y = 126;
        this.pannel_width = 114;
        this.pannel_height = 84;
        this.button_x = 160;
        this.button_y = 5;
        this.button_width = 41;
        this.button_height = 26;
    }
    /**
     * 读取历史记录分数
     * @param {number} currentScore 当前游戏得分
     * @return {number} 历史最高分
     */
    loadHistoryScore(currentScore){
        let h_score = wx.getStorageSync(SCORE_KEY);
        if(!h_score){
            wx.setStorageSync(SCORE_KEY, currentScore);
            return currentScore;
        }
        if(currentScore>h_score){
            wx.setStorageSync(SCORE_KEY, currentScore);
            return currentScore;
        }
        return h_score;
    }
    /**
     * 显示提示框
     * @param {RenderingContext} ctx 上下文对象
     */
    show(ctx,currentScore) {
        // 绘制面板
        ctx.drawImage(this.img, this.pannel_x, this.pannel_y, this.pannel_width, this.pannel_height, P_X, P_Y, P_WIDTH, P_HEIGHT);
        //绘制文字信息
        ctx.fillText("菜，就多练！！！", P_X + 26, P_Y + 36);
        ctx.fillText(`历史最高分：${this.loadHistoryScore(currentScore)}`, P_X + 58, P_Y + 120);
        //绘制从新开始按钮
        ctx.drawImage(this.img, this.button_x, this.button_y, this.button_width, this.button_height, B_X, B_Y, B_WIDTH, B_HEIGHT);
        ctx.fillText("重新开始", B_X + 26, B_Y + 28);
        return [B_X,B_Y,B_WIDTH,B_HEIGHT];
    }
}