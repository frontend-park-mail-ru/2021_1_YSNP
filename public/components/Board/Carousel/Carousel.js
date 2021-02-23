'use strict';

export class Slider {
    constructor(parent) {
        this.__parent = parent;
        this.Carousel = {
            width: 60,
            numVisible: 6,
            duration: 400,
            padding: 10
        };
    }

    get listeners() {
        return this.__listeners;
    }

    set listeners(val) {
        this.__listeners = val;
    }


    rotateForward() {
        const carousel = this.Carousel.carousel,
            children = carousel.children,
            firstChild = children.item(0),
            lastChild = children.item(children.length - 1);
        carousel.insertBefore(lastChild, firstChild);
    }

    rotateBackward() {
        const carousel = this.Carousel.carousel,
            children = carousel.children,
            firstChild = children.item(0),
            lastChild = children.item(children.length - 1);
        carousel.insertBefore(firstChild, lastChild.nextSibling);
    }

    animate(begin, end, finalTask) {
        const carousel = this.Carousel.carousel,
            change = end - begin,
            duration = this.Carousel.duration,
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

    run() {
        document.getElementById('spinner').style.display = 'none';
        let carousel = this.Carousel.carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img'),
            numImages = images.length,
            imageWidth = this.Carousel.width,
            aspectRatio = images[0].width / images[0].height,
            imageHeight = imageWidth / aspectRatio,
            padding = this.Carousel.padding,
            rowHeight = this.Carousel.rowHeight = imageHeight + 2 * padding;
        carousel.style.width = `${imageWidth}px`;
        for (let i = 0; i < numImages; ++i) {
            const image = images[i],
                frame = document.createElement('div');
            frame.className = 'pictureFrame';
            aspectRatio = image.offsetWidth / image.offsetHeight;
            image.style.width = frame.style.width = `${imageWidth}px`;
            image.style.height = `${imageHeight}px`;
            image.style.paddingTop = `${padding}px`;
            image.style.paddingBottom = `${padding}px`;
            frame.style.height = `${rowHeight}px`;
            image.style.opacity = '0.3';
            carousel.insertBefore(frame, image);
            frame.appendChild(image);

            image.addEventListener('click', this.foo1, false);
            images[0].style.opacity = '1.0';
        }
        this.Carousel.rowHeight = 70;
        carousel.style.height = `${this.Carousel.numVisible * this.Carousel.rowHeight}px`;
        carousel.style.visibility = 'visible';
        const wrapper = this.Carousel.wrapper = document.createElement('div');
        wrapper.id = 'carouselWrapper';
        wrapper.style.width = `${carousel.offsetWidth}px`;
        wrapper.style.height = `${carousel.offsetHeight}px`;
        carousel.parentNode.insertBefore(wrapper, carousel);
        wrapper.appendChild(carousel);
    }

    foo1() {
        const elem = document.getElementById('pic');
        elem.src = this.src;

        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].style.opacity = '0.3';
        }
        this.style.opacity = '1.0';
    }

    __getTemplate() {
        return `   
   <div class="slider-inner">
    <div class="slider">
        <div id="spinner"> 
          Loading...
        </div>
        <div class="buttons"> 
          <a id="prev"><svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 10.5L10 1.5L19 10.5" stroke="black"/></svg></a>
        </div>
        <div id="carousel">
          <img src="../../../img/pic1.jpeg" alt="">
          <img src="../../../img/pic2.jpeg" alt="">
          <img src="../../../img/pic3.jpeg" alt="">
          <img src="../../../img/pic4.jpeg" alt="">
          <img src="../../../img/pic5.jpeg" alt="">
          <img src="../../../img/pic6.jpeg" alt="">
          <img src="../../../img/pic7.jpeg" alt="">
        </div>
        
        <div class="buttons">
          <a id="next"><svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L10.5 11L20 1" stroke="black"/></svg></a>
        </div>
    </div>
    <div class="preview">
          <img id="pic" src="../../../img/pic1.jpeg" alt="">
    </div>
</div>
        `;
    }

    addListeners() {
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        console.log(this.__listeners);
        nextButton.addEventListener(this.__listeners.toNext.type, this.__listeners.toNext.listener);
        prevButton.addEventListener(this.__listeners.toBack.type, this.__listeners.toBack.listener);
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        this.run();
        this.addListeners();
    }
}
