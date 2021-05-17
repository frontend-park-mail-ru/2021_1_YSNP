import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';
import {BaseModel} from './BaseModel';

/***
 * Auth user model
 */
export class AchievementsModel extends BaseModel {
    constructor() {
        super();
        this.__achievements = [];
    }

    /***
     * Get auth user model Json
     * @returns {Array}
     * @public
     */
    getData() {
        return this.__achievements;
    }

    __parseData(data) {
        this.__achievements = data.reduce((accum, el) => {
                const achievement = new AchievementModel();
                achievement.fillData(el);
                accum.push(achievement.jsonData());
                return accum;
            }, []);
    }

    /***
     * Post auth user data to backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async update() {
        return http.get(backUrls.achievements)
            .then(({status, data}) => {
                this.checkError(status, {
                    message: data.message
                });

                this.__parseData(data);
            });
    }
}

/***
 *  model for one Achievement
 */
export class AchievementModel {
    fillData(data) {
        this.__title = data.title;
        this.__des = data.description;
        this.__data = data.date;
        this.__pic = data.link_pic;
    }

    jsonData() {
        return {
            title: this.__title,
            description: this.__des,
            date: this.__data,
            linkPic: this.__pic
        };
    }
}
