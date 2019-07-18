$('.landing-promo__logo-marvel').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'header',
        'event_action':'click',
        'event_label':'marvel'
    });
});

$('.landing-promo__button .button-play').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main',
        'event_action':'click',
        'event_label':'video'
    });
});

$('.landing-promo__logo-disney').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main',
        'event_action':'click',
        'event_label':'disneyland'
    });
});

$('.landing-promo__eraser').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main',
        'event_action':'click',
        'event_label':'stiratels'
    });
});

$('.nav__list ul li a').click(function() {
    var id = $(this).attr('href');

    switch(id) {
        case '#section-main':
        case '/#section-main':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'main'
            });
            break;
        case '#section-team':
        case '/#section-team':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'stiratels'
            });
            break;
        case '#section-products-2':
        case '/#section-products-2':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'goods'
            });
            break;
        case '#section-action':
        case '/#section-action':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'contest'
            });
            break;
        case '#section-video':
        case '/#section-video':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'video'
            });
            break;
        case '#section-test':
        case '/#section-test':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'test'
            });
            break;
        case '#section-gallery':
        case '/#section-gallery':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'gallery'
            });
            break;
        case 'https://dm-five-dev.uiux.ru/cabinet':
        case 'https://dm-five-stage.uiux.ru/cabinet':
        case 'https://стиратели.рф/cabinet':
        case 'https://xn--80akhco1afid.xn--p1ai/cabinet':
            dataLayer.push({
                'event':'event',
                'event_category':'menu',
                'event_action':'click',
                'event_label':'lk'
            });
            break;
    }
});

$('.nav__list [data-type="login"]').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'menu',
        'event_action':'click',
        'event_label':'login'
    });
});

$('.nav__list .btn_exit').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'menu',
        'event_action':'click',
        'event_label':'logout'
    });
});

$('.nav__foot .button').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'menu',
        'event_action':'click',
        'event_label':'rules'
    });
});

$('[data-target=".jsModalAlbum"]').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-stiratels',
        'event_action':'click',
        'event_label':'albom'
    });
});

$('.landing-erasers__button a').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-stiratels',
        'event_action':'click',
        'event_label':'test'
    });
});

$('.jsModalEraserToggle').click(function() {
    setTimeout(function() {
        var name = $('.jsModalEraser .swiper-slide-active .modal-eraser__title').text();

        dataLayer.push({
            'event':'event',
            'event_category':'main-stiratels',
            'event_action':'click',
            'event_label':'hero-' + name
        });
    }, 1000);
});

$('.jsModalEraserGoToTest').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'stiratels-modal',
        'event_action':'click',
        'event_label':'test'
    });
});

$('.landing-prizes__button a').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-stiratels',
        'event_action':'click',
        'event_label':'shop'
    });
});

$('.landing-action-prize_1 .landing-action-prize__icon, .landing-info-prize_1 .landing-info-prize__icon').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-contest',
        'event_action':'info',
        'event_label':'step2'
    });
});

$('.landing-action-prize_2 .landing-action-prize__icon, .landing-info-prize_2 .landing-info-prize__icon').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-contest',
        'event_action':'info',
        'event_label':'step3'
    });
});

$('.landing-action__item-body_1 .landing-action__button a, .gtm_go_to_constructor').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-contest',
        'event_action':'click',
        'event_label':'construct'
    });
});

$('.landing-action__item-body_2 .landing-action__button a, .gtm_go_to_lk').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-contest',
        'event_action':'click',
        'event_label':'lk'
    });
});

$('.landing-action__item-body_3 .landing-action__button a, .gtm_go_to_rules').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-contest',
        'event_action':'click',
        'event_label':'rules'
    });
});

$('.jsLandingVideoToggle').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-video',
        'event_action':'click',
        'event_label':'play'
    });
});

$('.jsTestReturn').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-test',
        'event_action':'click',
        'event_label':'again'
    });
});

$('.landing-test-result__social .vk').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-test',
        'event_action':'click',
        'event_label':'shareVK'
    });
});

$('.landing-test-result__social .fb').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-test',
        'event_action':'click',
        'event_label':'shareFB'
    });
});

$('.landing-test-result__social .ok').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-test',
        'event_action':'click',
        'event_label':'shareOK'
    });
});


$('#section-gallery .jsModalWorkToggle').click(function() {
    var id = $(this).attr('data-id');
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'show-' + id
    });
});

$('.landing-gallery__pic[href="https://5ka.ru/clubs/kids/"]').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'babyclub'
    });
});

$('.landing-gallery__buttons a').eq(0).click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'all'
    });
});
$('.landing-gallery__buttons a').eq(1).click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'construct'
    });
});

$('.jsSliderGallery .swiper-prev').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'prev'
    });
});
$('.jsSliderGallery .swiper-next').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'next'
    });
});

$('.jsSliderGallery .landing-gallery__download').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'main-gallery',
        'event_action':'click',
        'event_label':'download'
    });
});

$(document).on('click', '.jsShareLink.vk', function(event) {
    dataLayer.push({
        'event':'event',
        'event_category':'comicsmodal',
        'event_action':'click',
        'event_label':'shareVK'
    });
});

$(document).on('click', '.jsShareLink.fb', function(event) {
    dataLayer.push({
        'event':'event',
        'event_category':'comicsmodal',
        'event_action':'click',
        'event_label':'shareFB'
    });
});

$(document).on('click', '.jsShareLink.ok', function(event) {
    dataLayer.push({
        'event':'event',
        'event_category':'comicsmodal',
        'event_action':'click',
        'event_label':'shareOK'
    });
});

$(document).on('click', '.modal-work__cell.download a', function(event) {
    dataLayer.push({
        'event':'event',
        'event_category':'comicsmodal',
        'event_action':'click',
        'event_label':'download'
    });
});

$('.footer__list ul li a').click(function() {
    var id = $(this).attr('href');

    switch(id) {
        case '#section-main':
        case '/#section-main':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'main'
            });
            break;
        case '#section-team':
        case '/#section-team':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'stiratels'
            });
            break;
        case '#section-products-2':
        case '#section/-products-2':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'goods'
            });
            break;
        case '#section-action':
        case '/#section-action':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'contest'
            });
            break;
        case '#section-video':
        case '/#section-video':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'video'
            });
            break;
        case '#section-test':
        case '/#section-test':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'test'
            });
            break;
        case '#section-gallery':
        case '/#section-gallery':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'gallery'
            });
            break;
        case 'https://dm-five-dev.uiux.ru/cabinet':
        case 'https://dm-five-stage.uiux.ru/cabinet':
        case 'https://стиратели.рф/cabinet':
        case 'https://xn--80akhco1afid.xn--p1ai/cabinet':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'lk'
            });
            break;
        case '/files/Правила конкурса Моя семья - супергерои.pdf':
            dataLayer.push({
                'event':'event',
                'event_category':'footer',
                'event_action':'click',
                'event_label':'rules'
            });
            break;
    }
});

$('.footer__logo').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'footer',
        'event_action':'click',
        'event_label':'5ka'
    });
});

$('.footer__phone').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'footer',
        'event_action':'click',
        'event_label':'phone'
    });
});

$('.landing-gallery_gallery .jsModalWorkToggle').click(function() {
    var id = $(this).attr('data-id');

    dataLayer.push({
        'event':'event',
        'event_category':'gallery',
        'event_action':'click',
        'event_label':'show-' + id
    });
});

$('.landing-gallery_gallery .landing-gallery__download').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'gallery',
        'event_action':'click',
        'event_label':'download'
    });
});

$('.landing-gallery__create .button').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'gallery',
        'event_action':'click',
        'event_label':'construct'
    });
});

$('.editor-info [data-target=".jsModalTutorial"], [data-target=".jsModalTutorialMobile"]').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'instruction'
    });

    dataLayer.push({
        'event':'event',
        'event_category':'instruction',
        'event_action':'show',
        'event_label':'step1'
    });
});

$('.editor-kit [data-target=".jsModalTutorial"]').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'instruction'
    });

    dataLayer.push({
        'event':'event',
        'event_category':'instruction',
        'event_action':'show',
        'event_label':'step1'
    });
});

$('.jsEditorAgain').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'back_to_step1'
    });
});


$('.jsEditorKit .editor-kit__item_text').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'text'
    });
});
$('.jsEditorKit .editor-kit__item_sticker').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'stickers'
    });
});
$('.jsEditorKit .editor-kit__item_element').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'elements'
    });
});

$('.jsEditorResultBack').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'back_to_step2'
    });
});

$('.jsEditorNext.save_editor').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'editor',
        'event_action':'click',
        'event_label':'save'
    });
});

$('.lk-menu .btn_lk-menu').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-menu',
        'event_action':'click',
        'event_label':'back'
    });
});

$('.lk-menu .lk-nav__list-item').eq(0).click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-menu',
        'event_action':'click',
        'event_label':'gallery'
    });
});
$('.lk-menu .lk-nav__list-item').eq(1).click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-menu',
        'event_action':'click',
        'event_label':'notifications'
    });
});
$('.lk-menu .lk-nav__list-item').eq(2).click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-menu',
        'event_action':'click',
        'event_label':'options'
    });
});
$('.lk-menu .lk-nav__list-item').eq(3).click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-menu',
        'event_action':'click',
        'event_label':'gifts'
    });
});

$('.lk-works .jsModalWorkToggle').click(function() {
    var id = $(this).attr('data-id');

    dataLayer.push({
        'event':'event',
        'event_category':'lk-gallery',
        'event_action':'click',
        'event_label':'show-' + id
    });
});

$('.upload-photo .button-lk').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-gallery',
        'event_action':'click',
        'event_label':'load_stiratels'
    });
});

$('.lk-works__link').click(function() {
    dataLayer.push({
        'event':'event',
        'event_category':'lk-gallery',
        'event_action':'click',
        'event_label':'construct'
    });
});