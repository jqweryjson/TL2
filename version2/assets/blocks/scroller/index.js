import baron from 'baron';

export default class Scroller {
    constructor() {
        this.scroller;
        this.container = $('.jsScroller');
        this.options = {
            root: '.jsScroller',
            scroller: '.baron__scroller',
            bar: '.baron__bar'
        };
    }
    init() {
        if (!this.container.length) return;

        this.scroller = baron(this.options);
    }
    update() {
        if (this.scroller) {
            this.scroller.update();
        }
    }
}