import Swiper from 'swiper/dist/js/swiper.js';
import 'jquery-ui/ui/widget.js';
import 'jquery-ui/ui/widgets/autocomplete.js';
import Cookies from 'js-cookie';
import { getRegions, getOther, getProducts } from 'products/data';
import { getRegions2, getOther2, getProducts2 } from 'products/data2';

export function initProducts() {
    let input = $('#autocomplete');

    if (Cookies.get('geocode_city')) {
        input.val(Cookies.get('geocode_city'));
    }
    // if (!$('#map').length) return false;
    let products;
    let regions;
    let other;
    let folder = '';
    if ($('.jsSliderProducts').hasClass('version_2')) {
        products = getProducts2();
        regions = getRegions2();
        other = getOther2();
        folder = '2';
    } else {
        products = getProducts();
        regions = getRegions();
        other = getOther();
    }
    let productsSlider;

    input.on('focusin', function(event) {
        $(this).val('');
    }).on('focusout', function(event) {
        if (Cookies.get('geocode_city')) {
            input.val(Cookies.get('geocode_city'));
        } else {
            input.val('');
        }
    });;

    input.autocomplete({
        source: function(request, response){
          $.ajax({
            url: 'https://kladr-api.ru/api.php',
            dataType: "jsonp",
            type: 'GET',
            data:{
              contentType: 'city',
              query: $('#autocomplete')[0].value,
              limit: 6,
              // withParent: 1,
              typeCode: 1|2
            },
            success: function(data){
                if (input.val().slice(0,5).toLowerCase() === 'марий') {
                    data.result.push({ name: 'Марий Эл' })
                }
                response($.map(data.result, function(item){
                    return{
                        label: item.name,
                        value: item.name
                    }
                }));
            }
          });
        },
        select: function( event, ui) {
            geocode(ui.item.value);
        }
      });

    function geocode(request) {
        // Геокодируем введённые данные.
        ymaps.geocode(request).then(function (res) {
            var result = res.geoObjects.get(0).properties.get('metaDataProperty');
            var address = result.GeocoderMetaData.Address.Components;
            var area = result.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
            var city;

            for (var i = 0; i < address.length; i++) {
                if (address[i].kind === 'locality') {
                    city = address[i].name;
                }
            }

            Cookies.set('geocode_city', request);
            Cookies.set('geocode_area', area);
            filter(area, city);
        }, function (e) {
            console.log(e)
        })

    }

    if ($('body').hasClass('mobile')) {
        productsSlider = new Swiper('.jsSliderProducts', {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            autoHeight: true,
            bulletClass:'paginationBullet',
            bulletActiveClass:'paginationBullet_active',
            renderBullet: function (index, className) {
              return '<span class="paginationBullet"></span>';
            },
          },
        });

        productsSlider.on('slideChangeTransitionEnd', function () {
            let index = productsSlider.realIndex;
            console.log(index);
            $('.jsSliderProducts .paginationBullet').removeClass('paginationBullet_active')
                .eq(index).addClass('paginationBullet_active');
        });
    } else {
        productsSlider = new Swiper ($('.jsSliderProducts').find('.swiper-container'), {
            slidesPerView: 'auto',
            // loop: true,
            navigation: {
              nextEl: $('.jsSliderProducts').find('.swiper-next'),
              prevEl: $('.jsSliderProducts').find('.swiper-prev'),
            }
        });
    }

    function searchRegion(value) {
        for (var i = 0; i < regions.length; i++) {
            let item = regions[i].region;
            for (var j = 0; j < item.length; j++) {
                if (item[j] === value) {
                    return i;
                }
            }
        }
    }

    function filter(value) {
        let item = searchRegion(value),
            result = [];
        console.log(item);
        // если совпадений нет выводим федеральный список
        
        // выводим все товары
        // for (var i = 0; i < products.length; i++) {
        //     if (other[i]) {
        //         result.push(products[i]);
        //     }
        // }
        // addSlides(result);
        // return;
        if (item === undefined) {
            for (var i = 0; i < products.length; i++) {
                if (other[i]) {
                    if (!products[i].hidden) {
                        result.push(products[i]);
                    }
                }
            }
            console.log('федеральный', value);
        } else {
            let currentRegion = regions[item];

            if (currentRegion.filter.length) {
                let filter = true;

                // проверяем регион на особые товары
                for (var i = 0; i < currentRegion.filter.length; i++) {
                    if (currentRegion.filter[i] === value) {
                        filter = false;
                    }
                }

                if (filter) {
                    console.log('регион');
                    for (var i = 0; i < currentRegion.list.length; i++) {
                        if (currentRegion.exclude[i] === 1) {
                            currentRegion.list[i] = null;
                        }
                    }
                } else {
                    console.log('особый регион');
                    for (var i = 0; i < currentRegion.list.length; i++) {
                        if (currentRegion.exclude[i] === 1) {
                            currentRegion.list[i] = 1;
                        }
                    }
                }
            }

            for (var i = 0; i < products.length; i++) {
                if (currentRegion.list[i]) {
                    if (!products[i].hidden) {
                        result.push(products[i]);
                    }
                }
            }
        }

        addSlides(result);
    }
    // filter('Нижегородская область');
    // filter('Кировская область');
    // filter('Нижегородская область');

    function addSlides(list) {
        let slides = [];

        for (var i = 0; i < list.length; i++) {
            let product = list[i];

            slides.push(`
                <div class="swiper-slide">
                    <a class="landing-products__item">
                        <span class="landing-products__pic" style="background-image: url('/images/desktop/products${folder}/${product.id}.jpeg');">
                            <span class="landing-products__sticker landing-products__sticker_${product.points}"></span>
                        </span>
                        <span class="landing-products__name">${product.name}</span>
                    </a>
                </div>
            `);
        }

        productsSlider.removeAllSlides();
        productsSlider.appendSlide(slides);
    }

    if (Cookies.get('geocode_city')) {
        let area = Cookies.get('geocode_area'),
            city = Cookies.get('geocode_city');
        filter(area, city);
    } else {
        filter();
        function ymInit() {
            ymaps.ready(function () {
                var map;
                ymaps.geolocation.get({
                    provider: 'yandex'
                }).then(function (res) {
                    var result = res.geoObjects.get(0).properties.get('metaDataProperty');
                    var address = result.GeocoderMetaData.Address.Components;
                    var area = result.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;
                    var city;

                    for (var i = 0; i < address.length; i++) {
                        if (address[i].kind === 'locality') {
                            city = address[i].name;
                        }
                    }

                    if (city) {
                        Cookies.set('geocode_city', city);
                        input.val(city);
                    } else {
                        Cookies.set('geocode_city', area);
                        input.val(area);
                    }

                    filter(area, city);
                }, function (e) {
                    // Если местоположение невозможно получить, выводим федеральные товары.
                    filter();
                });

                function createMap (state) {
                    map = new ymaps.Map('map', state);
                }
            });
        }

        var timerId = setTimeout(function() {
            if (typeof ymaps === 'object') {
                ymInit();
                clearTimeout(timerId);
            }
        }, 1000);
    }
}