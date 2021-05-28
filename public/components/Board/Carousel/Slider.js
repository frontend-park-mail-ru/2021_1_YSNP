import CarouselTemplate from './Slider.hbs';
import './Slider.scss';

import {sentryManager} from '../../../modules/sentry';

/* eslint-disable no-magic-numbers */

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
     * insert forward img in carousel
     * @public
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
     * @public
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
     * @public
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
     * @public
     * @this {Slider}
     */
    createCarousel() {
        const carousel = this.__carousel.carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img'),
            numImages = images.length,
            imageWidth = this.__carousel.width;
        carousel.style.width = `${imageWidth}px`;
        for (let i = 0; i < numImages; ++i) {
            const image = images[i],
                frame = document.createElement('div');
            frame.className = 'picture-frame';
            // image.style.width = frame.style.width = '5vw';
            // image.style.height = '4vw';
            image.style.paddingTop = '1vh';
            image.style.paddingBottom = '1vh';
            // frame.style.height = '5vw';
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
        wrapper.className = 'carousel-wrapper';
        // wrapper.style.width = '5vw';
        // wrapper.style.height = '43vh';
        carousel.parentNode.insertBefore(wrapper, carousel);
        wrapper.appendChild(carousel);
    }

    /***
     * @author Ivan Gorshkov
     *
     * context for template
     * @return {{firstPhoto: *, photos: ([*]|*)}}
     * @private
     */
    __context() {
        return {
            firstPhoto: this.__data.__linkImages[0],
            photos: this.__data.__linkImages,
            hideCarousel: this.__data.__linkImages.length > 7
        };
    }

    /***
     * @author Ivan Gorshkov
     *
     * Add component to parent
     * @this {Slider}
     * @public
     */
    render() {
        try {
            this.__parent.insertAdjacentHTML('beforeend', CarouselTemplate(this.__context()));
            this.createCarousel();
        } catch (err) {
            sentryManager.captureException(err);
            console.log(err.message);
        }
    }
}