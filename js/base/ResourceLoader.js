const IMAGE_PATH = "./images/";
const IMAGES = [
    ["background", `${IMAGE_PATH}bg.jpg`],
    ["enemy", `${IMAGE_PATH}enemy.png`],
    ["player", `${IMAGE_PATH}hero.png`],
    ["bullet", `${IMAGE_PATH}bullet.png`],
    ["common", `${IMAGE_PATH}Common.png`]
];
let instance;
/**资源加载器**/
export class ResourceLoader {
    constructor() {
        for(let i = 1;i<=19;i++){
            IMAGES.push([`explosion${i}`,`${IMAGE_PATH}explosion${i}.png`]);
        }
        this.imageMap = new Map(IMAGES);
        for (let [key, value] of this.imageMap) {
            let img = new Image();
            img.src = value;
            this.imageMap.set(key, img);
        }
    }
    getImage(key) {
        return this.imageMap.get(key);
    }
    /** 加载所有图片资源
     * @param{function}callBack
     * **/
    onLoad(callBack) {
        let loadCount = 0;
        for (let img of this.imageMap.values()) {
            img.onload = () => {
                loadCount++;
                if (loadCount == this.imageMap.size) {
                    callBack();
                }
            }
        }
    }
    /**单例获取资源加载器对象 **/
    static getInstance() {
        if (!instance) {
            instance = new ResourceLoader();
        }
        return instance;
    }
}