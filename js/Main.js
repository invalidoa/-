import {
    Background
} from "./background/Background";
import {
    ResourceLoader
} from "./base/ResourceLoader";
import {
    Sound
} from "./base/Sound";
import {
    Enemy
} from "./enemy/Enemy";
import {
    Bullet
} from "./player/Bullet";
import {
    Player
} from "./player/Player";
import {
    MessageBox
} from "./background/MessageBox";
// 画布绘画上下文对象
const ctx = canvas.getContext("2d");
// 屏幕宽度
const SCREEN_WIDTH = window.innerWidth;
// 屏幕高度
const SCREEN_HEIGHT = window.innerHeight;
//游戏是否结束
let isGameOver = false;
//游戏帧动画的ID
let animationID;
//敌机生成的定时器ID
let enemyTimerID;
//子弹生成的定时器ID
let bulletTimerID;
//得分
let score = 0;
//
let restartBtn = [];
// 背景图数组
let background = [];
// 敌机数组
let enemys = [];
//玩家飞机对象
let player = null;
//子弹数组
let bullets = [];
/**
 * 游戏主类
 */
export class Main {
    constructor() {
        console.log("分辨率" + SCREEN_WIDTH + "*" + SCREEN_HEIGHT);
        let rl = ResourceLoader.getInstance();
        rl.onLoad(() => this.init());
    }
    init() {
        //初始化背景图
        background[0] = new Background();
        background[1] = new Background();
        background[1].y = -SCREEN_HEIGHT;

        // 初始敌机,每一秒产生一个新敌机
        // enemys[0] = new Enemy();
        enemyTimerID = setInterval(() => {
            this.createEnemy()
        }, 1000);
        //初始化子弹，每0.5秒产生一枚
        bulletTimerID = setInterval(() => {
            this.shoot()
        }, 500);
        // 初始化玩家飞机
        player = new Player();
        //初始化游戏背景音乐
        Sound.getInstance().playBgmAudio();
        // 启动run方法，产生帧动画
        this.run();

    }
    /**
     * 背景图自动向下滚
     */
    backgroundAutoRun() {
        for (let i = 0; i < background.length; i++) {
            background[i].addY(2);
            background[i].draw(ctx);
            if (background[i].y >= SCREEN_HEIGHT) {
                background[i].y = -SCREEN_HEIGHT + 2;
            }
        }
    }
    /**
     * 生成一个敌机，并且将该敌机放入enemys中
     */
    createEnemy() {
        enemys.push(new Enemy());
    }
    /**
     * 敌机自动向下运动，超过屏幕下边界时自动回收
     */
    enemyMove() {
        //飞出屏幕下边界的敌机的索引
        let indexs = [];
        for (let i = 0; i < enemys.length; i++) {
            enemys[i].draw(ctx);
            enemys[i].addY(4);
            if (enemys[i].y > SCREEN_HEIGHT) {
                indexs.push(i);
            }
            //如果敌机和玩家飞机发生碰撞则游戏结束
            if (enemys[i].collisionDetectioin(player)) {
                isGameOver = true;
                console.log("Gameover")
            }
        }
        for (let i of indexs) {
            enemys[i].destory();
            enemys.splice(i, 1);
        }
    }
    /**
     * 射击生成一个子弹对象
     */
    shoot() {
        Sound.getInstance().playBulletAudio();
        bullets.push(new Bullet(player.x + player.width / 2, player.y));
    }
    /**
     * 子弹自动向上飞
     * 超过屏幕上边界自动回收
     */
    bulletMove() {
        let index = [];
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].draw(ctx);
            bullets[i].addY(-10);
            if (bullets[i].y < 0) {
                index.push(i);
            }
            for (let j = 0; j < enemys.length; j++) {
                if (bullets[i].collisionDetectioin(enemys[j])) {
                    Sound.getInstance().playBoomAudio();
                    score++;
                    bullets[i].visible = false;
                    bullets[i].isCollision = false;
                    // enemys[j].visible = false;
                    enemys[j].isCollision = false;
                    enemys[j].playExplosion();

                }
            }
        }
        for (let i of index) {
            bullets[i].destory();
            bullets.splice(i, 1);
        }
    }
    /**
     * 显示分数
     */
    showScore() {
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px Arial";
        ctx.fillText(`得分：${score}`, 10, 24);
    }
    /**
     * 游戏结束的触摸响应
     * @param {TouchEvent} e 
     */
    gameoverHandler(e) {
        e.preventDefault();
        const fx = e.touches[0].clientX;
        const fy = e.touches[0].clientY;
        let x = restartBtn[0];
        let y = restartBtn[1];
        let w = restartBtn[2];
        let h = restartBtn[3];
        if (fx >= x && fx <= x + w && fy >= y && fy <= y + h){
            
            this.restart();
        }
    }
    /**
     * 重新开始游戏
     */
    restart(){
        canvas.removeEventListener("touchstart",this.touchHandler);
        isGameOver = false ;
        score = 0;
        enemys = [];
        bullets =[];
        this.init();
    }
    /**
     * 产生游戏的帧动画
     */
    run() {
        if (isGameOver) {
            cancelAnimationFrame(animationID);
            clearInterval(enemyTimerID);
            clearInterval(bulletTimerID);
            restartBtn = new MessageBox().show(ctx, score);
            this.touchHandler = this.gameoverHandler.bind(this);
            addEventListener("touchstart",this.touchHandler);
            return;
        }
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.backgroundAutoRun();
        this.enemyMove();
        this.showScore();
        player.draw(ctx);
        this.bulletMove();
        animationID = requestAnimationFrame(() => this.run());
    }
}