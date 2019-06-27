import Swiper from 'swiper';
import skrollr from 'skrollr';
import Typed from 'typed.js';
import Visible from '@egjs/visible';
import 'test';
import 'bootstrap/js/dist/scrollspy';

import { initProducts } from 'landing/products';
//initProducts();

$('body').scrollspy({ target: '#list-example' });
let navToggle = $('.nav-toggle');
$(window).on('activate.bs.scrollspy', function () {
    let id = $('.list-group-item.active').attr('href');

    if (id === '#section-test') {
        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/test'
        });
    }

    navToggle.removeClass('inverse');

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
            navToggle.addClass('inverse');
            dataLayer.push({
                'event':'event',
                'event_category':'main-stiratels',
                'event_action':'show',
                'event_label':'block'
            });
            break;
        case '#section-products-2':
            navToggle.addClass('inverse');
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
            navToggle.addClass('inverse');
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
            navToggle.addClass('inverse');
            dataLayer.push({
                'event':'event',
                'event_category':'main-gallery',
                'event_action':'show',
                'event_label':'block'
            });
            break;
    }
});

$(window).on('load', function() {
    heroPlay.start();
}); 

const anim = {
	startHero: function(){
		$('.landing-promo').addClass('landing-promo_start');
	},
	backHero: function(){
		$('.landing-promo').addClass('landing-promo_next');
	},
	showInfoSlider:function(){
		//$(document).unbind('touchmove');
		$('.landing-promo__logo-marvel , .landing-promo__copy').fadeOut(100);
		$('.landing-promo__infoSlider').addClass('landing-promo__infoSlider_start');
	}
}

const heroPlay = {
	start: function(){
		anim.startHero();
		setTimeout(function(){
			anim.backHero();
		},5000);
		setTimeout(function(){
			anim.showInfoSlider();
		},5400);
	}
}


let info = (function() {
    $('.jsLandingInfoToggle').click(function() {
        let container = $(this).closest('.landing-info-prize');

        container.find('.landing-info-prize__front').fadeToggle();
        container.find('.landing-info-prize__back').fadeToggle();
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
sliders = (function() {

    new Swiper ($('.jsSliderGallery').find('.swiper-container'), {
    lazy: {
      loadPrevNext: true,
    },
    spaceBetween: 10,
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	    bulletClass:'paginationBullet',
	    bulletActiveClass:'paginationBullet_active',
	    renderBullet: function (index, className) {
	      return '<span class="paginationBullet"></span>';
	    },
	  },
    });

	new Swiper('.jsInfoSlider', {
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	    bulletClass:'paginationBullet',
	    bulletActiveClass:'paginationBullet_active',
	    renderBullet: function (index, className) {
	      return '<span class="paginationBullet"></span>';
	    },
	  },
	});	

	new Swiper('.jsPrizesSlider', {
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	    bulletClass:'paginationBullet',
	    bulletActiveClass:'paginationBullet_active',
	    renderBullet: function (index, className) {
	      return '<span class="paginationBullet"></span>';
	    },
	  },
	});

	new Swiper('.jsSliderProducts', {
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	    bulletClass:'paginationBullet',
	    bulletActiveClass:'paginationBullet_active',
	    renderBullet: function (index, className) {
	      return '<span class="paginationBullet"></span>';
	    },
	  },
	});

})(),
winners = (function() {
    let sliderWinners = new Swiper ($('.jsSliderWinners').find('.swiper-container'), {
        slidesPerView: 1,
        initialSlide: Number($('.jsSliderWinners').data('week')) - 1,
        // loop: true,
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
        $('.landing-winners-slider__body').height($('.landing-winners-slider__body').height());
        $(this).closest('.landing-winners-slider__item').find('.landing-winners-slider__table').addClass('full');
        $(this).fadeOut();

        return false;
    });
})();

