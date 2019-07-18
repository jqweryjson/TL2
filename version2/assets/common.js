import 'expose-loader?$!expose-loader?jQuery!jquery';

import { TimelineMax, TweenMax, Linear } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

// init controller
var controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
    triggerElement: '#t2',
    triggerHook: 0,
})
    // .setClassToggle('#t1', 'fixed')
    .setClassToggle('#l1', 'transition_double')
    .addTo(controller); // assign the scene to the controller

// create a scene
new ScrollMagic.Scene({
    triggerElement: '#p2',
    triggerHook: 0,
    // duration: '100%',	// the scene should last for a scroll distance of 100px
})
    // .triggerHook(.1)
    .setClassToggle('#p1', 'hidden')
    // .setPin("#p1") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller


// new ScrollMagic.Scene({
//     triggerElement: '#p2',
//     triggerHook: 0,
// })
//     .setClassToggle('#l1', 'transition_double')
//     // .setClassToggle('#t1_d', 'db')
//     .addTo(controller); // assign the scene to the controller


function pathPrepare($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dashoffset", -lineLength);
}

var $path = $("path#hand_path");
var $pathMobile = $("path#hand_path_mobile");
pathPrepare($path);
pathPrepare($pathMobile);

var tween = new TimelineMax()
    .add([
        TweenMax.to("#hand_left", .5, { x: 0, opacity: 1 }),
        TweenMax.to("#hand_right", .5, { x: 0, opacity: 1 }),
        TweenMax.to($path, .2, { opacity: 1, delay: .5 }),
        TweenMax.to($path, .5, { strokeDashoffset: 0, delay: .5 }),
        TweenMax.to($pathMobile, .2, { opacity: 1, delay: .5 }),
        TweenMax.to($pathMobile, .5, { strokeDashoffset: 0, delay: .5 }),
    ]);

var scene = new ScrollMagic.Scene({
    triggerElement: '#p2',
    triggerHook: 0,
    offset: -200,
    duration: 1000,	// the scene should last for a scroll distance of 100px
    // tweenChanges: true
})
    .setTween(tween)
    .addTo(controller);


// 3 экран
let $counter = $('.jsCounter');
let $hands = $('.jsHands');
new ScrollMagic.Scene({
    triggerElement: '#p3',
    triggerHook: 0,
    duration: 1000,
})
    .addTo(controller)
    .on('progress', function (e) {
        let valueCounter = 1;
        let valueHands = 1;
        let progress = (e.progress * 100).toFixed();
        let progressCounter = (progress / 3.333333).toFixed();
        let progressHands = (progress / 5).toFixed();

        valueCounter = progressCounter;
        if (progressCounter < 1) {
            valueCounter = 1;
        }
        if (progressCounter > 30) {
            valueCounter = 30;
        }

        valueHands = progressHands;
        if (progressHands < 1) {
            valueHands = 1;
        }
        if (progressHands > 20) {
            valueHands = 20;
        }
        $counter.text(('0' + valueCounter).slice(-2));
        $hands.removeClass().addClass(`hands jsHands active-${valueHands}`)
    });


var tween3 = new TimelineMax()
    .add([
        TweenMax.to("#circle3", 1, { scale: 10 }),
        TweenMax.to("#text3", .5, { opacity: 0 }),
    ]);

new ScrollMagic.Scene({
    triggerElement: '#p3',
    triggerHook: 0,
    duration: 300,
    offset: 1000
})
    .setTween(tween3)
    .addTo(controller);


// 4 экран
new ScrollMagic.Scene({
    triggerElement: '#p4',
    triggerHook: 0,
})
    .setClassToggle('#p3', 'hidden')
    .addTo(controller);

var tween4 = new TimelineMax()
    .add([
        TweenMax.to("#p4_text_1", .2, { opacity: 1, y: 0, delay: 0, }),
        TweenMax.to("#p4_text_3", .2, { opacity: 1, y: 0, delay: .2, }),
        TweenMax.to("#p4_text_1", .2, { opacity: 0, y: 50, delay: .5, }),
        TweenMax.to("#p4_text_2", .2, { opacity: 1, y: 0, delay: .7, }),
    ]);

new ScrollMagic.Scene({
    triggerElement: '#p4',
    triggerHook: 0,
    duration: '100%',
})
    .setTween(tween4)
    .addTo(controller);

// 5 экран

var tween5 = new TimelineMax()
    .add([
        TweenMax.to("#t5_d", 1, { y: 0 }),
    ]);

new ScrollMagic.Scene({
    triggerElement: '#p5_trigger',
    triggerHook: 0,
    duration: 300,
})
    .setTween(tween5)
    .addTo(controller);

function transitionNav(number, direction) {
    if (direction === 'FORWARD') {
        $navNum.addClass('transition-next');
        $navLine.addClass('transition-next');
        setTimeout(() => {
            $navNum.text(number);
        }, 200);  
    } else {
        $navNum.addClass('transition-prev');
        $navLine.addClass('transition-prev');
        setTimeout(() => {
            $navNum.text(number);
        }, 200);
    }
    setTimeout(() => {
        $navNum.removeClass('transition-next transition-prev');
        $navLine.removeClass('transition-next transition-prev');
    }, 400);
}

// Навигация
let $body = $('body');
let $navNum = $('.jsNavNumber');
let $navLine = $('.jsNavLine');
new ScrollMagic.Scene({
    triggerElement: '#ln_1',
    duration: $('#ln_1').height()
})
    .setClassToggle('#n_1', 'active')
    .addTo(controller)
    .on('enter', function (e) {
        $body.removeClass('theme-white');
        transitionNav('01', e.scrollDirection);
    });
new ScrollMagic.Scene({
    triggerElement: '#ln_2',
    duration: $('#ln_2').height()
})
    .setClassToggle('#n_2', 'active')
    .addTo(controller)
    .on('enter', function (e) {
        $body.removeClass('theme-white');
        transitionNav('02', e.scrollDirection);
    });
new ScrollMagic.Scene({
    triggerElement: '#ln_3',
    duration: $('#ln_3').height()
})
    .setClassToggle('#n_3', 'active')
    .addTo(controller)
    .on('enter', function (e) {
        $body.addClass('theme-white');
        transitionNav('03', e.scrollDirection);
    });
new ScrollMagic.Scene({
    triggerElement: '#ln_4',
    duration: $('#ln_4').height()
})
    .setClassToggle('#n_4', 'active')
    .addTo(controller)
    .on('enter', function (e) {
        $body.removeClass('theme-white');
        transitionNav('04', e.scrollDirection);
    });
new ScrollMagic.Scene({
    triggerElement: '#ln_5',
    duration: $('#ln_5').height()
})
    .setClassToggle('#n_5', 'active')
    .addTo(controller)
    .on('enter', function (e) {
        $body.addClass('theme-white');
        transitionNav('05', e.scrollDirection);
    });
new ScrollMagic.Scene({
    triggerElement: '#ln_6',
    duration: $('#ln_6').height()
})
    .setClassToggle('#n_6', 'active')
    .addTo(controller)
    .on('enter', function (e) {
        $body.addClass('theme-white');
        transitionNav('06', e.scrollDirection);
    });

// scroll up
new ScrollMagic.Scene({
    triggerElement: '#ln_6',
    duration: $('#ln_6').height()
})
    .setClassToggle('#scroll_button', 'up')
    .addTo(controller);