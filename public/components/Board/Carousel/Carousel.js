'use strict';

/***
 * @author Ivan Gorshkov
 * Slider class for carousel and preview pictures
 * @class Slider
 */
export class Slider {

    /***
     * @author Ivan Gorshkov
     *
     * init of class Slider
     * @param {HTMLElement} parent - parent element
     * @param {Object} data - JSON Object
     * @constructor
     * @this {Slider}
     * @public
     */
    constructor(parent, data) {
        this.__parent = parent;
        this.__carousel = {
            width: 60,
            numVisible: 6,
            duration: 400,
            padding: 10
        };
        this.__data = data;

    }

    /***
     * @author Ivan Gorshkov
     *
     * get Slider listeners
     * @this {Slider}
     * @private
     * @readonly
     * @return  {Object[]} array of listeners
     */
    get listeners() {
        return this.__listeners;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Set new listeners
     * @this {Slider}
     * @param  {Object[]} val - Object of listeners
     * @public
     */
    set listeners(val) {
        this.__listeners = val;
    }

    /***
     * @author Ivan Gorshkov
     *
     * insert forward img in carousel
     * @private
     * @this {Slider}
     */
    rotateForward() {
        const carousel = this.__carousel.carousel,
            children = carousel.children,
            firstChild = children.item(0),
            lastChild = children.item(children.length - 1);
        carousel.insertBefore(lastChild, firstChild);
    }

    /***
     * @author Ivan Gorshkov
     *
     * insert backward img in carousel
     * @private
     * @this {Slider}
     */
    rotateBackward() {
        const carousel = this.__carousel.carousel,
            children = carousel.children,
            firstChild = children.item(0),
            lastChild = children.item(children.length - 1);
        carousel.insertBefore(firstChild, lastChild.nextSibling);
    }

    /***
     * @author Ivan Gorshkov
     *
     * animation carousel when scroll
     * @private
     * @this {Slider}
     */
    animate(begin, end, finalTask) {
        const carousel = this.__carousel.carousel,
            change = end - begin,
            duration = this.__carousel.duration,
            startTime = Date.now();
        carousel.style.top = `${begin}px`;
        const animateInterval = window.setInterval(() => {
            let t = Date.now() - startTime;
            if (t >= duration) {
                window.clearInterval(animateInterval);
                finalTask();
                return;
            }
            t /= (duration / 2);
            const top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                change / 2 * (Math.pow(t - 2, 3) + 2));
            carousel.style.top = `${top}px`;
        }, 1000 / 60);
    }

    /***
     * @author Ivan Gorshkov
     *
     * function create vertical carousel
     * @private
     * @this {Slider}
     */
    createCarousel() {
        const carousel = this.__carousel.carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img'),
            numImages = images.length,
            imageWidth = this.__carousel.width;
        let aspectRatio = images[0].width / images[0].height;
        const imageHeight = imageWidth / aspectRatio,
            padding = this.__carousel.padding,
            rowHeight = this.__carousel.rowHeight = imageHeight + 2 * padding;
        carousel.style.width = `${imageWidth}px`;
        for (let i = 0; i < numImages; ++i) {
            const image = images[i],
                frame = document.createElement('div');
            frame.className = 'picture-frame';
            aspectRatio = image.offsetWidth / image.offsetHeight;
            image.style.width = frame.style.width = `${imageWidth}px`;
            image.style.height = `${imageHeight}px`;
            image.style.paddingTop = `${padding}px`;
            image.style.paddingBottom = `${padding}px`;
            frame.style.height = `${rowHeight}px`;
            image.style.opacity = '0.3';
            carousel.insertBefore(frame, image);
            frame.appendChild(image);

            images[0].style.opacity = '1.0';
        }
        this.__carousel.rowHeight = 70;
        carousel.style.height = `${this.__carousel.numVisible * this.__carousel.rowHeight}px`;
        carousel.style.visibility = 'visible';
        const wrapper = this.__carousel.wrapper = document.createElement('div');
        wrapper.id = 'carousel-wrapper';
        wrapper.style.width = `${carousel.offsetWidth}px`;
        wrapper.style.height = `${carousel.offsetHeight}px`;
        carousel.parentNode.insertBefore(wrapper, carousel);
        wrapper.appendChild(carousel);
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for all photos
     * @return {string}
     * @private
     * @this {Slider}
     * @readonly
     */
    get __getPhotos() {
        const photoArray = this.__data.photos;
        let htmlImg = '';
        photoArray.forEach((value) => {
            htmlImg += `<img src="${value}" alt="">`;
        });
        return htmlImg;
    }

    /***
     * @author Ivan Gorshkov
     *
     * getter for first photo of product
     * @return {string}
     * @private
     * @this {Slider}
     * @readonly
     */
    get __getFirstPhotos() {
        const photoArray = this.__data.photos;
        let htmlImg = '';
        htmlImg += `<img class="preview-picture" id="pic" src="${photoArray[0]}" alt="">`;
        return htmlImg;
    }

    /***
     * @author Ivan Gorshkov
     * main template of component
     * @return {string}
     * @private
     * @this {Slider}
     */
    __getTemplate() {
        return `   
        <div class="slider">
            <div class="slider-inner">
                <div class="slider-inner__button"> 
                    <a class="slider-inner__button-prev" id="prev"><svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 10.5L10 1.5L19 10.5" stroke="black"/></svg></a>
                </div>
                <div id="carousel">
                    ${this.__getPhotos}
                </div>
                <div class="slider-inner__button">
                    <a class="slider-inner__button-next" id="next"><svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L10.5 11L20 1" stroke="black"/></svg></a>
                </div>
            </div>
            <div class="preview">
                ${this.__getFirstPhotos}
            </div>
        </div>
        `;
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add listeners from component
     * @private
     * @this {Slider}
     */
    addListeners() {
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        nextButton.addEventListener(this.listeners.toNext.type, this.listeners.toNext.listener);
        prevButton.addEventListener(this.listeners.toBack.type, this.listeners.toBack.listener);
        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].addEventListener(this.listeners.selectImage.type, this.listeners.selectImage.listener);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * Remove listeners from component
     * @public
     * @this {Slider}
     */
    removeListeners() {
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        nextButton.removeEventListener(this.listeners.toNext.type, this.listeners.toNext.listener);
        prevButton.removeEventListener(this.listeners.toBack.type, this.listeners.toBack.listener);
        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].removeEventListener(this.listeners.selectImage.type, this.listeners.selectImage.listener);
        }
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Slider}
     * @public
     */
    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        this.createCarousel();
        this.addListeners();
    }
}
