'use strict';

export class Slider {
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

    get listeners() {
        return this.__listeners;
    }

    set listeners(val) {
        this.__listeners = val;
    }

    rotateForward() {
        const carousel = this.__carousel.carousel,
            children = carousel.children,
            firstChild = children.item(0),
            lastChild = children.item(children.length - 1);
        carousel.insertBefore(lastChild, firstChild);
    }

    rotateBackward() {
        const carousel = this.__carousel.carousel,
            children = carousel.children,
            firstChild = children.item(0),
            lastChild = children.item(children.length - 1);
        carousel.insertBefore(firstChild, lastChild.nextSibling);
    }

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

    run() {
        document.getElementById('spinner').style.display = 'none';
        let carousel = this.__carousel.carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img'),
            numImages = images.length,
            imageWidth = this.__carousel.width,
            aspectRatio = images[0].width / images[0].height,
            imageHeight = imageWidth / aspectRatio,
            padding = this.__carousel.padding,
            rowHeight = this.__carousel.rowHeight = imageHeight + 2 * padding;
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

            image.addEventListener('click', this.choosePhoto, false);
            images[0].style.opacity = '1.0';
        }
        this.__carousel.rowHeight = 70;
        carousel.style.height = `${this.__carousel.numVisible * this.__carousel.rowHeight}px`;
        carousel.style.visibility = 'visible';
        const wrapper = this.__carousel.wrapper = document.createElement('div');
        wrapper.id = 'carouselWrapper';
        wrapper.style.width = `${carousel.offsetWidth}px`;
        wrapper.style.height = `${carousel.offsetHeight}px`;
        carousel.parentNode.insertBefore(wrapper, carousel);
        wrapper.appendChild(carousel);
    }

    choosePhoto() {
        const elem = document.getElementById('pic');
        elem.src = this.src;

        const carousel = document.getElementById('carousel'),
            images = carousel.getElementsByTagName('img');
        for (let i = 0; i < images.length; ++i) {
            images[i].style.opacity = '0.3';
        }
        this.style.opacity = '1.0';
    }

    get __getPhotos() {
        const photoArray = this.__data.photos;
        let htmlImg = '';
        photoArray.forEach((value) => {
            htmlImg += `<img src="${value}" alt="">`;
        });
        return htmlImg;
    }

    get __getFirstPhotos() {
        const photoArray = this.__data.photos;
        let htmlImg = '';
        htmlImg += `<img id="pic" src="${photoArray[0]}" alt="">`;
        return htmlImg;
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
              ${this.__getPhotos}
        </div>
        
        <div class="buttons">
          <a id="next"><svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L10.5 11L20 1" stroke="black"/></svg></a>
        </div>
    </div>
    <div class="preview">
         ${this.__getFirstPhotos}
    </div>
</div>
        `;
    }

    addListeners() {
        const prevButton = document.getElementById('prev'),
            nextButton = document.getElementById('next');
        nextButton.addEventListener(this.listeners.toNext.type, this.__listeners.toNext.listener);
        prevButton.addEventListener(this.listeners.toBack.type, this.__listeners.toBack.listener);
    }

    render() {
        const template = this.__getTemplate();
        this.__parent.insertAdjacentHTML('beforeend', template);
        this.run();
        this.addListeners();
    }
}
