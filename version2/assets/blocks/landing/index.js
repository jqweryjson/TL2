import Swiper from 'swiper/dist/js/swiper.js';
import skrollr from 'skrollr';
import Typed from 'typed.js';
import Visible from '@egjs/visible';
import 'test';
import 'bootstrap/js/dist/scrollspy';
import PerfectScrollbar from 'perfect-scrollbar';

import { initProducts } from 'landing/products';
initProducts();

// custom scrollbar
$('.jsScroller').each(function() {
    let container = $(this)[0];

    new PerfectScrollbar(container)
});

let sliderPrizesDown,
    sliderPrizesDownAutoplay = false;

let sliderCenter,
    sliderCenterAutoplay = false;
$('body').scrollspy({ target: '#list-example' });
$(window).on('activate.bs.scrollspy', function () {
    let id = $('.list-group-item.active').attr('href');

    if (id === '#section-test') {
        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/test'
        });
    }

    $('body').attr('data-section-active', id.slice(1));

    switch(id) {
        case '#section-main':
            dataLayer.push({
                'event':'event',
                'event_category':'main',
                'event_action':'show',
                'event_label':'block'
            });
            break;
        case '#section-team':
            //if (!sliderPrizesDownAutoplay) {
            //    sliderPrizesDownAutoplay = true;
            //    sliderPrizesDown.autoplay.start();
            //    $('.landing-prizes').addClass('landing-elements-action_animated');
            //}
            //
            //dataLayer.push({
            //    'event':'event',
            //    'event_category':'main-stiratels',
            //    'event_action':'show',
            //    'event_label':'block'
            //});
            break;
        case '#section-products-2':
            if (!sliderCenterAutoplay) {
                sliderCenterAutoplay = true;
                sliderCenter.autoplay.start();
            }
            dataLayer.push({
                'event':'event',
                'event_category':'main-goods',
                'event_action':'show',
                'event_label':'block'
            });
            break;
        case '#section-action':
            dataLayer.push({
                'event':'event',
                'event_category':'main-contest',
                'event_action':'show',
                'event_label':'block'
            });
            break;
        case '#section-video':
            dataLayer.push({
                'event':'event',
                'event_category':'main-video',
                'event_action':'show',
                'event_label':'block'
            });
            break;
        case '#section-test':
            dataLayer.push({
                'event':'event',
                'event_category':'main-test',
                'event_action':'show',
                'event_label':'block'
            });
            break;
        case '#section-gallery':
            dataLayer.push({
                'event':'event',
                'event_category':'main-gallery',
                'event_action':'show',
                'event_label':'block'
            });
            break;
    }
});

var deviceDetector = (function () {
    var ua = navigator.userAgent.toLowerCase();
    var detect = (function(s) {
        if(s===undefined)s=ua;
        else ua = s.toLowerCase();
        if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua))
                    return 'tablet';
        else
        if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(ua))            
                    return 'phone';
                else return 'desktop';
    });
    return{
        device:detect(),
        detect:detect,
        isMobile:((detect()!='desktop')?true:false),
        userAgent:ua
    };
}());

function startPromoAnimation() {
    if ($('.landing-promo').hasClass('landing-promo_start')) {
        return false;
    }

    $('.landing-promo').addClass('landing-promo_start');
    setTimeout(function() {
        $('.landing-promo').addClass('landing-promo_end');
    }, 2700);
}

let promo = (function() {
    if (Cookies.get('dm_loaded') === 'loaded') {
        $('body').addClass('loaded');
        // startPromoAnimation();
    }
    $(window).on('load', function() {
        $('body').addClass('loaded');
        startPromoAnimation();
        Cookies.set('dm_loaded', 'loaded', { expires: 1/24 });
    });
})(),
repeatAnimation = (function() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function run() {
        let timer = setInterval(function() {
            let el = $('.landing-elements_animated');
            el.removeClass('landing-elements_animated');
            setTimeout(function() {
                el.addClass('landing-elements_animated');
            }, 2500);
            clearTimeout(timer);
            run();
        }, 5000);
    }
    run();

})(),
erasers= (function() {
    $('.landing-erasers__item').on('mouseenter', function(event) {
        $('.landing-erasers__list').addClass('stop-animation');
    });
})(),
plax = (function() {
    if (deviceDetector.device === 'tablet') {
        return false;
    }

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (isFirefox) {
        $('html').addClass('firefox');
    }

    let ww = $(window).width(),
        wh = $(window).height();

    $(window).on('resize', function() {
        ww = $(window).width();
        wh = $(window).height();
    });

    let elements1 = $('.landing-promo__hero');
    $('.landing-promo').mousemove(function(event) {
        elements1.each(function(index, elem) {
            let el = $(elem);
            plax.setPosition(event, el, el.data('range'));
        });
    });


    let elements2 = $('.landing-parallax__pic_group_1');
    $('.section-parallax_1').mousemove(function(event) {
        elements2.each(function(index, elem) {
            let el = $(elem);
            plax.setPosition(event, el, el.data('range'));
        });
    });

    let elements3 = $('.landing-parallax__pic_group_2');
    $('.section-parallax_2').mousemove(function(event) {
        elements3.each(function(index, elem) {
            let el = $(elem);
            plax.setPosition(event, el, el.data('range'));
        });
    });


    $('.landing-test-result__item').mousemove(function(event) {
        let el = $(this).find('.landing-test-result__hero');
        plax.setPosition(event, el, el.data('range'));
    });

    // let elements4 = $('.landing-parallax__pic_group_3');
    // $('.section-parallax_3').mousemove(function(event) {
    //     elements4.each(function(index, elem) {
    //         let el = $(elem);
    //         plax.setPosition(event, el, el.data('range'));
    //     });
    // });

    return {
        getOffset: function(event, range) {
            let x = ((event.screenX * 100 / ww) * range[0] * 0.01);
            let y = ((event.screenY * 100 / wh) * range[1] * 0.01);
            return x + 'px, ' + y + 'px, 0px';
        },
        setPosition: function(event, el, range) {
            el.css({
                'transform': 'translate3d(' + this.getOffset(event, range) + ')',
            });
        }
    }
})(),
parallax = (function() {
    console.log(deviceDetector.device);
    if (deviceDetector.device === 'tablet') {
        return false;
    }
    var s = skrollr.init({
        forceHeight: false,
        keyframe: function(element, name, direction) {
            // console.log('element', element);
            // console.log('name', name);
            // console.log('direction', direction);

            let el = $(element);

            if (el.hasClass('jsLandingBubbleTyped')) {
                if (!el.hasClass('init')) {
                    new Typed(el.find('span span')[0], {
                        strings: ['ТСССС!', '...', 'ТСССС!'],
                        typeSpeed: 150,
                        backSpeed: 50,
                        showCursor: false,
                        backDelay: 3000,
                    });
                    el.addClass('init');
                }
            } else if (el.hasClass('landing-elements-emit')) {
                el.addClass('landing-elements_animated');
            } else if (el.hasClass('landing-comics-emit')) {
                el.addClass('landing-comics_animated');
                if (!el.hasClass('init')) {
                    el.addClass('init');
                    let container = el;
                    setInterval(function() {
                        container.removeClass('landing-comics_animated');
                        container.find('.landing-comics__item').hide();
                        setTimeout(function() {
                            container.find('.landing-comics__item').show();
                            container.addClass('landing-comics_animated');
                        }, 500);
                    }, 8000);

                    // let container2 = $('.landing-photo-emit');
                    // $('.landing-photo-emit').addClass('landing-photo_animated');
                    // setInterval(function() {
                    //     container2.removeClass('landing-photo_animated').addClass('no-transition');
                    //     setTimeout(function() {
                    //         container2.addClass('landing-photo_animated').removeClass('no-transition');
                    //     }, 500);
                    // }, 8000);

                    // let container3 = $('.landing-info__pic_3').parent();
                    // container3.addClass('landing-disnay_animated');
                }
            }
            // } else if (el.hasClass('landing-photo-emit')) {
            //     el.addClass('landing-photo_animated');
            //     if (!el.hasClass('init')) {
            //         el.addClass('init');
            //         let container = el;
            //         setInterval(function() {
            //             container.removeClass('landing-photo_animated');
            //             setTimeout(function() {
            //                 container.addClass('landing-photo_animated');
            //             }, 500);
            //         }, 8000);
            //     }
            // }
        }
    });
})(),
logo = (function() {
    let visiblePromoLogo = new Visible(document, {
        targetClass : 'landing-promo__logo',
        expandSize : 0
    }).on('change', function (e) {
        $(e.visible).removeClass('hidden');
        $(e.invisible).addClass('hidden');
    });

    visiblePromoLogo.check();

    var timer = null;
    $(window).scroll(function () {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function() {
            timer = null;

            visiblePromoLogo.check();
        }, 50);
    });

})(),
sliders = (function() {
    new Swiper ($('.jsSliderGallery').find('.swiper-container'), {
        slidesPerView: 4,
        slidesPerGroup: 4,
        slidesPerColumn: 2,
        // loop: true,
        navigation: {
          nextEl: $('.jsSliderGallery').find('.swiper-next'),
          prevEl: $('.jsSliderGallery').find('.swiper-prev'),
        },
        // Disable preloading of all images
        preloadImages: false,
        watchSlidesVisibility: true,
        // Enable lazy loading
        lazy: true,
        breakpoints: {
            1440: {
                spaceBetween: 50,
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
        }
    });
})(),
/*prizes = (function() {
    let sliderOver = new Swiper ($('.jsSliderPrizesOver').find('.swiper-container'), {
        slidesPerView: 1,
        loop: true,
        allowTouchMove: false,
    });
    sliderPrizesDown = new Swiper ($('.jsSliderPrizes').find('.swiper-container'), {
        slidesPerView: 1,
        loop: true,
        allowTouchMove: false,
        navigation: {
          nextEl: $('.jsSliderPrizes').find('.swiper-next'),
          prevEl: $('.jsSliderPrizes').find('.swiper-prev'),
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    sliderPrizesDown.on('slideChange', function () {
        $('.landing-prizes').removeClass('landing-elements-action_animated');
        setTimeout(function() {
            $('.landing-prizes').addClass('landing-elements-action_animated');
        }, 0);
    });

    //sliderPrizesDown.autoplay.stop();

    $('.jsSliderPrizes .swiper-prev, .jsSliderPrizes .swiper-next').click(function() {
        sliderPrizesDown.autoplay.stop();
    });

    //sliderPrizesDown.controller.control = sliderOver;
})(),*/
winners = (function() {
    let sliderWinners = new Swiper ($('.jsSliderWinners').find('.swiper-container'), {
        slidesPerView: 1,
        initialSlide: Number($('.jsSliderWinners').data('week')) - 1,
        // loop: true,
        allowTouchMove: false,
        navigation: {
          nextEl: $('.jsSliderWinners').find('.swiper-next'),
          prevEl: $('.jsSliderWinners').find('.swiper-prev'),
        },
        on: {
            init: function () {
                let textPrev = $('.jsSliderWinners').find('.swiper-slide-prev .landing-winners-slider__week').text();
                let textNext = $('.jsSliderWinners').find('.swiper-slide-next .landing-winners-slider__week').text();

                $('.jsSliderWinners').find('.swiper-prev span').text(textPrev);
                $('.jsSliderWinners').find('.swiper-next span').text(textNext);
            },
        },
    });

    sliderWinners.on('transitionStart', function () {
        let textPrev = $('.jsSliderWinners').find('.swiper-slide-prev .landing-winners-slider__week').text();
        let textNext = $('.jsSliderWinners').find('.swiper-slide-next .landing-winners-slider__week').text();

        $('.jsSliderWinners').find('.swiper-prev span').text(textPrev);
        $('.jsSliderWinners').find('.swiper-next span').text(textNext);
    });

    $('.jsWinnersMoreToggle').click(function() {
        $(this).closest('.landing-winners-slider__item').find('.landing-winners-slider__table').addClass('full');
        $(this).fadeOut();

        return false;
    });
})(),
nav = (function() {
    let button = $('.jsNavToggle'),
    section1 = $('.landing-promo'),
    section2 = $('.landing-action'),
    // section2 = $('.landing-info'),
    section3 = $('.landing-test'),
    section4 = $('.landing-prizes'),
    section5 = $('.landing-winners'),
    offset = -40,
    a, b,
    c, d,
    e, f,
    g, h,
    j, k;

    function getPosition() {
        if (section1.length) {
            a = section1.offset().top + offset;
            b = a + section1.height() + offset;
        }

        if (section2.length) {
            c = section2.offset().top + offset;
            d = c + section2.height() + offset;
        }
        if (section3.length) {
            e = section3.offset().top + offset;
            f = e + section3.height() + offset;
        }
        if (section4.length) {
            g = section4.offset().top + offset;
            h = g + section4.height() + offset;
        }
        if (section5.length) {
            j = section5.offset().top + offset;
            k = j + section5.height() + offset;
        }
    }

    function setColor(scrollTop) {
        if (scrollTop >= a && scrollTop <= b ||
            scrollTop >= c && scrollTop <= d ||
            scrollTop >= e && scrollTop <= f ||
            scrollTop >= g && scrollTop <= h ||
            scrollTop >= j && scrollTop <= k) {
            button.removeClass('white');
        } else {
            button.addClass('white');
        }

        if (scrollTop <= 10) {
            button.addClass('full');
        } else {
            button.removeClass('full');
        }
    }

    $(window).on('resize', function() {
        getPosition();
    });

    $(window).on('load', function() {
        let scrollTop = $(window).scrollTop();

        getPosition();
        setColor(scrollTop);
    });

    $(window).on('scroll', function() {
        let scrollTop = $(this).scrollTop();
        setColor(scrollTop);
    });
})(),
video = (function() {
    $('.jsLandingVideoToggle').click(function() {
        let container = $('.jsLandingVideo');
        let iframe = container.find('.landing-video__iframe');

        $('.jsLandingVideoPreview').fadeOut();
        iframe.show();
        video.show($(this), container, iframe);

        return false;
    });

    return {
        show(element, container, iframe) {
            let video = this.setVideo(element);

            if (!video) return;

            iframe.html(video).hide().fadeIn()
        },
        setVideo(element) {
            let source = element.data('src'),
                html = '<iframe class="iframe-youtube" width="100%" height="100%" src="https://youtube.ru/embed/' + source +
                       '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';

            if (!source) {
                console.error('Не удалось получить источник для видео');
                return false;
            }
            return html;
        }
    }
})(),
/*action = (function() {
    let sliderTop = new Swiper ($('.jsLandingSliderActionHead').find('.swiper-container'), {
        //effect: 'fade',
        slidesPerView: 1,
        allowTouchMove: false,
        loop: true,
    });

    sliderCenter = new Swiper ($('.jsLandingSliderActionBody').find('.swiper-container'), {
        slidesPerView: 1,
        allowTouchMove: false,
        loop: true,
        navigation: {
          nextEl: $('.jsLandingSliderActionBody').find('.swiper-next'),
          prevEl: $('.jsLandingSliderActionBody').find('.swiper-prev'),
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        on: {
            init: function () {
                $('.landing-action').addClass('landing-elements-action_animated');
                $('.landing-comics').addClass('landing-comics_animated');
                dataLayer.push({
                    'event':'event',
                    'event_category':'main-contest',
                    'event_action':'show',
                    'event_label':'step1'
                });
            },
        },
    });
    sliderCenter.autoplay.stop();

    $('.jsLandingSliderActionBody .swiper-prev, .jsLandingSliderActionBody .swiper-next').click(function() {
        sliderCenter.autoplay.stop();
    });

    sliderCenter.on('slideChange', function () {
        $('.landing-action').removeClass('landing-elements-action_animated');
        $('.landing-comics').hide().removeClass('landing-comics_animated');
        setTimeout(function() {
            $('.landing-action').addClass('landing-elements-action_animated');
            $('.landing-comics').show().addClass('landing-comics_animated');
        }, 0);

        if (sliderCenter.realIndex === 1) {}

        switch(sliderCenter.realIndex) {
            case 0:
                dataLayer.push({
                    'event':'event',
                    'event_category':'main-contest',
                    'event_action':'show',
                    'event_label':'step1'
                });
                break;
            case 1:
                dataLayer.push({
                    'event':'event',
                    'event_category':'main-contest',
                    'event_action':'show',
                    'event_label':'step2'
                });
                break;
            case 2:
                dataLayer.push({
                    'event':'event',
                    'event_category':'main-contest',
                    'event_action':'show',
                    'event_label':'step3'
                });
                break;
        }
    });

    let sliderBottom = new Swiper ($('.jsLandingSliderActionFoot').find('.swiper-container'), {
        effect: 'fade',
        slidesPerView: 1,
        allowTouchMove: false,
        loop: true,
    });

   // sliderTop.controller.control = sliderBottom;
    sliderCenter.controller.control = sliderTop;
})(),*/
info = (function() {
    $('.jsLandingInfoToggle').click(function() {
        let container = $(this).closest('.landing-action-prize');
        container.find('.landing-action-prize__front').fadeToggle();
        container.find('.landing-action-prize__back').fadeToggle();
        return false;
    });

    let visiblePromoLogo = new Visible(document, {
        targetClass : 'landing-info',
        expandSize : 0
    }).on('change', function (e) {
        $(e.visible).removeClass('hidden');
        $(e.invisible).addClass('hidden');
    });

    visiblePromoLogo.check();

    var timer = null;
    $(window).scroll(function () {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function() {
            timer = null;

            visiblePromoLogo.check();
        }, 50);
    });
})();