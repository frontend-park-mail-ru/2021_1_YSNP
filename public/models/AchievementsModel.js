import {http} from '../modules/http/http.js';
import {backUrls} from '../modules/urls/backUrls.js';
import {BaseModel} from './BaseModel';

/***
 * Auth user model
 */
export class AchievementsModel extends BaseModel {
    /***
     * constructor of AchievementsModel
     */
    constructor() {
        super();
        this.__achievements = [];
    }

    /***
     * Get achievements model Json
     * @returns {Array}
     * @public
     */
    getData() {
        return this.__achievements;
    }


    /***
     * parse data Achievements from backend
     * @param{Object} data
     * @private
     */
    __parseData(data) {
        this.__achievements = data.reduce((accum, el) => {
            // eslint-disable-next-line no-use-before-define
                const achievement = new AchievementModel();
                achievement.fillData(el);
                accum.push(achievement.jsonData());
                return accum;
            }, []);
    }

    /***
     * get data from backend
     * @returns {Promise<{data: *, status: number}>}
     */
    async update(idSeller, idUser) {
        const url = idSeller === idUser ? backUrls.achievements : backUrls.achievementsSeller(idSeller);
        return http.get(url)
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
    /***
     * fill model
     * @param{Object} data
     */
    fillData(data) {
        this.__title = data.title;
        this.__des = data.description;
        this.__data = this.__datePrepare(data.date);
        this.__pic = data.link_pic;
        this.__achievemented = data.achieved;
    }

    /***
     *  make format date
     * @param {string} data
     * @return {string}
     * @private
     */
    __datePrepare(data) {
        const date = new Date(data);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    /***
     * json data for AchievementModel
     * @return {{date: string, description, title, linkPic}}
     */
    jsonData() {
        return {
            title: this.__title,
            description: this.__des,
            date: this.__data,
            linkPic: this.__pic,
            achievemented: this.__achievemented
        };
    }
}
