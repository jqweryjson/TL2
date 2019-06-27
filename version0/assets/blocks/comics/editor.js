import 'babel-polyfill';
import { getSvgParamForIe, isIEorEDGE } from './ieFix';
import 'canvas-toBlob';
import 'fabric';
import { initUploader } from 'comics/uploader';
import {
    getXY,
} from 'comics/utils';
import {
    createBubble,
    createBubbleNew,
    createBubbleExample,
} from 'comics/objects';
import Cookies from 'js-cookie';

import 'expose-loader?Popper!popper.js';
window.Popper = Popper.default;
import 'bootstrap/js/dist/tooltip';


dataLayer.push({
    'event': 'VirtualPageview',
    'url': '/editor/step1'
});

$('.jsModalSign').on('shown.bs.modal', function() {
    dataLayer.push({
        'event': 'VirtualPageview',
        'url': '/editor/login'
    });
});


// Controls
let editor = $('.jsEditor'),
    nav = editor.find('.jsEditorNav'),
    soundToggle = editor.find('.jsEditorSoundToggle'),
    templatesButtonLeft = editor.find('.jsEditorTemplates .editor-templates__button.left'),
    templatesButtonRight = editor.find('.jsEditorTemplates .editor-templates__button.right'),
    templatesButtonClose = editor.find('.jsEditorTemplates .editor-templates__close'),
    nextStep = editor.find('.jsEditorNext'),
    inputName = editor.find('.jsEditorInputName'),
    kitCategoryToggle = editor.find('.jsEditorKit .editor-kit__item'),
    resultBack = editor.find('.jsEditorResultBack'),
    elements = editor.find('.jsEditorElements'),
    elementsCategory = editor.find('.jsEditorElements > .editor-elements__item'),
    again = editor.find('.jsEditorAgain');

let $photoCache = $('.jsComicsPhotoUploadCache img');
let photos = [];

if (!$('body').hasClass('mobile')) {
    $('[data-toggle="tooltip"]').tooltip();
}


var cornerSize = 13;

if ($('body').hasClass('mobile')) {
    cornerSize = 30;
}

function sound() {
    soundToggle.hide();
    if (Cookies.get('sound_editor') !== 'true') {
        soundToggle.addClass('off');
    }

    var AudioContext = window.AudioContext          // Default
                    || window.webkitAudioContext;  // Safari and old versions of Chrome
    var source;

//ie 11 не поддерживает звуки- поэтому
    if(!AudioContext){
        soundToggle.hide();
        return;
    }

    var context = new AudioContext();
    var request = new XMLHttpRequest();

    request.open('GET', '/files/Eyes_of_Glory.mp3', true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        var audioData = request.response;
        context.decodeAudioData(
            audioData,
            function (buffer) {
                source = context.createBufferSource();
                source.buffer = buffer;
                source.connect( context.destination );
                source.start();
                source.loop = true;
                if (Cookies.get('sound_editor') === 'true') {
                    source.disconnect(context.destination);
                }
            },
            function (e) {
                soundToggle.hide();
            }
        );

        soundToggle.show();
        soundToggle.click(function() {
            if ($(this).hasClass('off')) {
                $(this).removeClass('off');
                Cookies.set('sound_editor', 'true');
                source.disconnect(context.destination);

                dataLayer.push({
                    'event':'event',
                    'event_category':'editor',
                    'event_action':'off',
                    'event_label':'sound'
                });
            } else {
                $(this).addClass('off');
                Cookies.set('sound_editor', 'false');
                source.connect(context.destination);

                dataLayer.push({
                    'event':'event',
                    'event_category':'editor',
                    'event_action':'on',
                    'event_label':'sound'
                });
            }
            return false;
        });
    };
    request.send();
}


if (!$('body').hasClass('mobile')) {
    sound();
}

var canvas,
    scalingBubble;

function initEditor() {
    let canvasNew = new fabric.Canvas('canvas', {
        selection: false,
        allowTouchScrolling: true,
        preserveObjectStacking: true,
        backgroundColor: "#ffffff",
    });

    canvas = canvasNew;

    function toggleTouchScrolling(e) {
        let obj = e.target;
        if (obj.customType === 'bg') {
            canvas.allowTouchScrolling = true;
        } else {
            canvas.allowTouchScrolling = false;
        }
    }

    canvas.on('selection:created', toggleTouchScrolling);
    canvas.on('selection:updated', toggleTouchScrolling);

    let bg,
        footer,
        logo5ka;

    fabric.Image.fromURL('/images/desktop/editor/pic/book.jpg', function(img) {
        bg = img;
        bg.scale(0.25);
        bg.evented = false;
        canvas.add(bg);
    });

    fabric.Image.fromURL('/images/desktop/editor/pic/footer.png', function(img) {
        footer = img;
        footer.scale(0.25);
        footer.top = 447;
        footer.evented = false;
        canvas.add(footer);
    });

    fabric.Image.fromURL('/images/desktop/editor/icon/logo-5ka.png', function(img) {
        logo5ka = img;
        logo5ka.scale(0.25);
        logo5ka.top = 0;
        logo5ka.left = 658;
        logo5ka.evented = false;
        canvas.add(logo5ka);
    });


    let photosOptions = {
        customType: 'bg',
        fill: '#E2E2E2',
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        strokeWidth: 0,
        stroke: "#000",
        hasRotatingPoint: false,
        hoverCursor: 'default'
    };

    function addLeftPage(data, indexActive) {
        data.bg.forEach(function(el, index) {
            photosOptions.index = index;
            photosOptions.top = el.options.top + 13;
            photosOptions.left = el.options.left + 18;
            photos[index] = new fabric.Polygon(el.polygon, photosOptions);
            canvas.add(photos[index]);
        });

        editor.data('left-page-active', indexActive);

        dataLayer.push({
            'event':'event',
            'event_category':'editor',
            'event_action':'click',
            'event_label':'leftpage'
        });
    }
    function addRightPage(data, indexActive) {
        data.bg.forEach(function(el, index) {
            photosOptions.index = index + 3;
            photosOptions.top = el.options.top + 13;
            photosOptions.left = el.options.left + 18 + 370;
            photos[index + 3] = new fabric.Polygon(el.polygon, photosOptions);
            canvas.add(photos[index + 3]);
            canvas.bringToFront(logo5ka);
        });

        editor.data('right-page-active', indexActive);

        dataLayer.push({
            'event':'event',
            'event_category':'editor',
            'event_action':'click',
            'event_label':'rightpage'
        });
    }

    function removeLeftPage() {
        photos.forEach(function(el, index) {
            if (index < 3) {
                canvas.remove(el);
                photos[index] = null;
            }
        });
    }

    function removeRightPage() {
        photos.forEach(function(el, index) {
            if (index > 2) {
                canvas.remove(el);
                photos[index] = null;
            }
        });
    }

    templatesButtonLeft.click(function() {
        let index = $(this).closest('.editor-templates__item').index();
        if ($(this).hasClass('active')) {
            let side = $(this).closest('.editor-templates__item').siblings('.active.left');
            if (side.length) {
                if (side.hasClass('right')) {
                    side.removeClass('left');
                } else {
                    side.removeClass('active left');
                }
                removeLeftPage();

                templatesButtonLeft.addClass('active');
                $(this).closest('.editor-templates__item').addClass('active left');
                validateToStep1();

                addLeftPage(templates[index], index);
                return false;
            }

            removeLeftPage();

            if ($(this).closest('.editor-templates__item').hasClass('right')) {
                $(this).closest('.editor-templates__item').removeClass('left');
            } else {
                $(this).closest('.editor-templates__item').removeClass('active left');
            }

            templatesButtonLeft.removeClass('active');
            validateToStep1();
        } else {
            templatesButtonLeft.addClass('active');
            $(this).closest('.editor-templates__item').addClass('active left');
            validateToStep1();

            addLeftPage(templates[index], index);
        }
    });

    templatesButtonRight.click(function() {
        let index = $(this).closest('.editor-templates__item').index();
        if ($(this).hasClass('active')) {
            let side = $(this).closest('.editor-templates__item').siblings('.active.right');
            if (side.length) {
                if (side.hasClass('left')) {
                    side.removeClass('right');
                } else {
                    side.removeClass('active right');
                }
                removeRightPage();

                templatesButtonRight.addClass('active');
                $(this).closest('.editor-templates__item').addClass('active right');
                validateToStep1();

                addRightPage(templates[index], index);
                return false;
            }

            removeRightPage();

            if ($(this).closest('.editor-templates__item').hasClass('left')) {
                $(this).closest('.editor-templates__item').removeClass('right');
            } else {
                $(this).closest('.editor-templates__item').removeClass('active right');
            }
            templatesButtonRight.removeClass('active');
            validateToStep1();
        } else {
            templatesButtonRight.addClass('active');
            $(this).closest('.editor-templates__item').addClass('active right');
            validateToStep1();

            addRightPage(templates[index], index);
        }
    });


    templatesButtonClose.click(function() {
        let container = $(this).closest('.editor-templates__item');

        if (container.hasClass('left')) {
            removeLeftPage();
            container.removeClass('active left');
            templatesButtonLeft.removeClass('active');
        } else {
            removeRightPage();
            container.removeClass('active right');
            templatesButtonRight.removeClass('active');
        }
        validateToStep1();
    });


    let photosButton = $('.jsComicsPhotoUploadButton');

    // nextStep.click(function() {
    //     let index = $(this).index();

    //     if (index === 0 && validateToStep1()) {
    //         addPhotoGrid();
    //     }
    // });


    photosButton.click(function() {
        let index = $(this).index();

        $('.jsModalCropPhoto').data('ratio', photos[index].width / photos[index].height)
                              .data('width', photos[index].width)
                              .data('height', photos[index].height);
        $('.jsComicsPhotoUpload').data('index', index).trigger('click');
    });

    initUploader(photos, canvas);

    // createImage
    function createImage(x, y, img) {
        if (!img.src) {
            console.error('нет исходного изображения');
        }

        var image = new Image();
        var width, height;

        if (isIEorEDGE()) {
            getSvgParamForIe(img,createWhenImgReady)
        } else {
            image.onload = createWhenImgReady;
        }

        function createWhenImgReady(e, msSvgSize) {
            if(msSvgSize){
                width = msSvgSize.width;
                height = msSvgSize.height;
            } else {
                width = this.width;
                height = this.height;
            }

            var newImage = new fabric.Image(img, {
                width: width,
                height: height,
                left: x,
                top: y,
                lockUniScaling: true,
                transparentCorners: false,
                cornerStyle: 'circle',
                cornerSize: cornerSize,
            });
            canvas.add(newImage).setActiveObject(newImage);
        };
        image.src = img.src;
    }

    let title;
    $('.jsControlTitleText').on('keyup', function(e) {
        let val = $(this).val(),
            widthInput = $(this).val().length * 18;

        if (widthInput < 18) {
            widthInput = 18;
        }

        title.set('text', $(this).val().toUpperCase());
        title.set('width', widthInput);
        canvas.renderAll();
        contolsUpdatePosition(title);

        return false;
    });

    $('.jsControlTitleText').on('focusout', function(e) {
        if (!/\S/.test($(this).val())) {
            title.set('text', 'ЗАГОЛОВОК');
            title.set('width', 9 * 18);
            canvas.renderAll();
            contolsUpdatePosition(title);
        }
    });

    function createTitle(x, y) {
        title = new fabric.Text('   ', {
            customType: 'title',
            fontFamily: 'Heading Pro Medium',
            fontWeight: 500,
            fontStyle: 'italic',
            left: x,
            top: y,
            // width : 35,
            fontSize: 30,
            angle: -6,
            fill: '#C0853A',
            shadow: '#5D2F20 3px 3px 0px',
            textAlign: 'center',
            // lockMovementX: true,
            // lockMovementY: true,
            // hasControls: false,
            // hasRotatingPoint: false,
            // hoverCursor: 'pointer',
            stroke: '#652D22',
            strokeWidth: 1,

            lockUniScaling: true,
            transparentCorners: false,
            cornerStyle: 'circle',
            cornerSize: cornerSize,
            originX: 'center',
        });

        title.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: title.height,
            colorStops: {
                0: '#C0853A',
                0.16: '#FADF80',
                0.41: '#EAC060',
                0.46: '#F8EBBD',
                0.54: '#FADF80',
                0.78: '#C68C3A',
                1: '#BA853A',
            }
        });

        canvas.add(title).setActiveObject(title);
    }

    scalingBubble = function() {
        if (this.scaleX !== this.scaleY) {
            let newWidth = this.scaleX / this.scaleY * this.width;

            if (newWidth <= 130) {
                newWidth = 130;
            }

            this.set('scaleX', this.scaleY);

            this.set('width', newWidth);
            this.item(0).set('width', newWidth);
            this.item(1).set('width', newWidth);
            autoHeightBubble(this);
            contolsUpdatePosition(this);
        }
    }


    // move object
    let canvasObject = $('.canvas-container'),
        imageSelected,
        imageCloned,
        imageOffsetX,
        imageOffsetY;

    function moveImage(e) {
        let pageXY = getXY(e);

        if (!imageCloned) {
            $('body').append(imageSelected.parent().clone().addClass('jsObjectClone'));
            imageCloned = $('body > .jsObjectClone');
        }

        imageCloned.css({
            'top': pageXY.y - imageOffsetY,
            'left': pageXY.x - imageOffsetX
        })
    }

    let isMobile = $('body').hasClass('mobile');

    $('.jsComicsImage').on('touchstart mousedown', function(e) {
        e.preventDefault();

        let offset = $(this).offset(),
            pageXY = getXY(e);

        imageOffsetX = pageXY.x - offset.left;
        imageOffsetY = pageXY.y - offset.top;
        if (isMobile) {
            let parent = $(this).parent(),
                scaleX = parent[0].getBoundingClientRect().width / parent[0].offsetWidth;

            imageOffsetX = pageXY.x - (offset.left - parent.width() * (1 - scaleX));
            imageOffsetY = pageXY.y - (offset.top - parent.height() * (1 - scaleX));
        }
        imageSelected = $(this);

        moveImage(e);
    });

    $(document).on('touchmove mousemove', function(e) {
        if (!imageSelected) return;

        moveImage(e);
    });

    $(document).on('touchend mouseup', function(e) {
        if (!imageSelected) return;

        imageCloned.remove();
        imageCloned = null;

        let scale = scaleContainer.data('scale')

        if (!scale) {
            scale = 1;
        }

        let pageXY = getXY(e),
            canvasOffset = canvasObject.offset();

        if (pageXY.x > canvasOffset.left && pageXY.x < canvasOffset.left + canvasObject.width() &&
            pageXY.y > canvasOffset.top && pageXY.y < canvasOffset.top + canvasObject.height()) {

            if (isMobile) {
                // высчитываем подложку со списком элементов и блокируем перетаскивание на ней
                if (pageXY.y > $(window).height() - $('.jsEditorElements').height() - 80) {
                    imageSelected = null;
                    return;
                }
            }


            let x = (pageXY.x - (canvasOffset.left + imageOffsetX)) / scale,
                y = (pageXY.y - (canvasOffset.top + imageOffsetY)) / scale;

            if (imageSelected.hasClass('bubble')) {
                createBubble(x, y, canvas, imageSelected, autoHeightBubble, scalingBubble);
            } else if (imageSelected.hasClass('bubbleNew')) {
                createBubbleNew(x, y, canvas, imageSelected, autoHeightBubble, scalingBubble);
            } else if (imageSelected.hasClass('title')) {
                imageSelected.addClass('disabled');
                createTitle(x, y);
            } else {
                createImage(x, y, imageSelected[0]);
            }

            canvas.bringToFront(footer);
            canvas.bringToFront(logo5ka);
        }

        imageSelected = null;
    });

    // controls

    $('.jsControlBgDelete').click(function() {
        let activeObject = canvas.getActiveObject();

        activeObject.set({
            fill: '#E2E2E2',
            strokeWidth: 0,
            hoverCursor: 'pointer',
            uploaded: false,
            selectable: false,
        });
        canvas.discardActiveObject().renderAll();
        photosButton.eq(activeObject.index).show();
        $photoCache.eq(activeObject.index).attr('src', '').removeClass('uploaded');
        validateToStep2();

        return false;
    });

    $('.jsControlCopy').click(function() {
        let obj = canvas.getActiveObject();

        if (obj.customType === 'bubble') {
            obj.clone(function(cloned) {
                cloned.set({
                    tailOffsetY: obj.tailOffsetY,
                    customType: 'bubble',
                    left: cloned.left + 20,
                    top: cloned.top + 20,
                    lockScalingFlip: true,
                    // lockUniScaling: true,
                    hasRotatingPoint: false,
                    objectCaching : false,
                    minScaleLimit: .6,
                    transparentCorners: false,
                    cornerStyle: 'circle',
                    cornerSize: cornerSize,
                });
                cloned.setControlVisible('mb', false);
                cloned.setControlVisible('mt', false);
                cloned.item(2).set('tailLeft', obj.item(2).tailLeft);
                cloned.item(2).set('tailPosition', obj.item(2).tailPosition);
                cloned.on('scaling', scalingBubble);
                canvas.add(cloned);
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        } else if (obj.customType === 'bubbleNew') {
            obj.clone(function(cloned) {
                cloned.set({
                    tailOffsetY: obj.tailOffsetY,
                    customType: 'bubbleNew',
                    left: cloned.left + 20,
                    top: cloned.top + 20,
                    lockScalingFlip: true,
                    // lockUniScaling: true,
                    // hasRotatingPoint: false,
                    objectCaching : false,
                    minScaleLimit: .6,
                    transparentCorners: false,
                    cornerStyle: 'circle',
                    cornerSize: cornerSize,
                });
                if (obj.exampleBubble) {
                    cloned.exampleBubble = true;
                }
                cloned.on('scaling', scalingBubble);
                canvas.add(cloned);
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        } else {
            obj.clone(function(cloned) {
                cloned.set({
                    left: cloned.left + 10,
                    top: cloned.top + 10,
                    lockUniScaling: true,
                });
                canvas.add(cloned);
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        }

        return false;
    });

    $('.jsControlOk').click(function() {
        canvas.discardActiveObject().renderAll();

        return false;
    });

    $('.jsControlDelete').click(function() {
        let activeObject = canvas.getActiveObject();

        if (activeObject.customType === 'title') {
            $('.jsComicsImage.title').removeClass('disabled');
            $('.jsControlTitleText').val('');
        }
        canvas.remove(activeObject);

        return false;
    });

    $('.jsControlSendBackwards').click(function() {
        let activeObject = canvas.getActiveObject();

        canvas.sendBackwards(activeObject);

        photos.forEach(function(el, index) {
            canvas.sendToBack(el);
        });
        canvas.sendToBack(bg);
        return false;
    });
    $('.jsControlBringForward').click(function() {
        let activeObject = canvas.getActiveObject();

        canvas.bringForward(activeObject);

        canvas.bringToFront(footer);
        canvas.bringToFront(logo5ka);
        return false;
    });
    $('.jsControlSendToBack').click(function() {
        let activeObject = canvas.getActiveObject();

        canvas.sendToBack(activeObject);

        photos.forEach(function(el, index) {
            canvas.sendToBack(el);
        });
        canvas.sendToBack(bg);
        return false;
    });
    $('.jsControlBringToFront').click(function() {
        let activeObject = canvas.getActiveObject();

        canvas.bringToFront(activeObject);

        canvas.bringToFront(footer);
        canvas.bringToFront(logo5ka);
        return false;
    });

    $('.jsControlFlipX').click(function() {
        let activeObject = canvas.getActiveObject();

        if (activeObject.customType === 'bubbleNew') {
            activeObject.item(0).toggle('flipX');
        } else {
            activeObject.toggle('flipX');
        }
        canvas.renderAll();
        return false;
    });

    $('.jsControlFlipY').click(function() {
        let activeObject = canvas.getActiveObject();

        if (activeObject.customType === 'bubbleNew') {
            activeObject.item(0).toggle('flipY');
        } else {
            activeObject.toggle('flipY');
        }
        canvas.renderAll();
        return false;
    });

    function autoHeightBubble(activeObject) {
        if (activeObject !== 'bubble') {
            return false;
        }
        let heightText = activeObject.item(1).height;
        let widthText = activeObject.item(1).width,
            tailPosition = activeObject.item(2).tailPosition,
            tailOffset = 0,
            tailLeft = -widthText / 2 + activeObject.item(2).tailLeft;

        activeObject.item(0).set('height', heightText + 20);
        activeObject.set('height', heightText + 20);

        // хвост
        if (tailPosition === 'right') {
            tailLeft = widthText - activeObject.item(2).tailLeft - widthText / 2;
        }

        activeObject.item(2).set('left', tailLeft);
        activeObject.item(2).set('top', heightText / 2 + activeObject.tailOffsetY);



        if (widthText !== activeObject.width) {
            activeObject.item(0).set('width', widthText + 20);
            activeObject.set('width', widthText + 20);
        }

        activeObject.setCoords();
        canvas.renderAll();
    }

    let controlFontSize = $('.jsControlFontSize');
    controlFontSize.on('input', function() {
        let activeObject = canvas.getActiveObject();

        activeObject.item(1).set('fontSize', controlFontSize.val());
        canvas.renderAll();
        autoHeightBubble(activeObject);
        contolsUpdatePosition(activeObject);

        return false;
    });
    // $('.jsControlFontSize').change(function() {
    //     let activeObject = canvas.getActiveObject();

    //     activeObject.item(1).set('fontSize', $(this).val());
    //     canvas.renderAll();
    //     autoHeightBubble(activeObject);
    //     contolsUpdatePosition(activeObject);

    //     return false;
    // });

    $('.jsControlText').on('keyup',function() {
        let activeObject = canvas.getActiveObject();

        if (activeObject.exampleBubble) {
            activeObject.exampleBubble = false;
            activeObject.item(1).set('fill', '#000');
        }
        activeObject.item(1).set('text', $(this).val());
        canvas.renderAll();
        autoHeightBubble(activeObject);
        contolsUpdatePosition(activeObject);
    });

    // controls panel
    let $contols = $('.jsControls'),
        $contolsType = $contols.find('.jsContolType'),
        $contolsBg = $contols.find('.jsControlBg'),
        $contolsImage = $contols.find('.jsControlImage'),
        $contolsBubble = $contols.find('.jsControlBubble'),
        $contolsTitle = $contols.find('.jsControlTitle');

    function controlsShow(e) {
        let obj = e.target;

        if (!obj) return;

        let leftPosition = obj.left + obj.width * obj.scaleX + 10;
        if (obj.customType === 'title') {
            leftPosition = obj.left + obj.width/2 * obj.scaleX + 10;
        }

        if ($('body').hasClass('mobile')) {
            elements.hide();
            kitCategoryToggle.removeClass('active');
            elementsCategory.removeClass('active');
        }

        $contols.css({
            top: obj.top,
            left: leftPosition
        }).addClass('active');

        $contolsType.hide();

        if (obj.customType === 'bg') {
            $contolsBg.show();
        } else if (obj.customType === 'title') {
            $contolsTitle.show();
            setTimeout(function() {
                $('.jsControlTitleText').focus();
            }, 100);
        } else if (obj.customType === 'bubble') {
            $contolsBubble.show();
        } else if (obj.customType === 'bubbleNew') {
            $contolsBubble.show();
        } else {
            $contolsImage.show();
        }
    }

    function contolsHide(e) {
        $contols.removeClass('active');
    }

    function contolsUpdatePosition(obj) {
        let leftPosition = obj.left + obj.width * obj.scaleX + 10;
        if (obj.customType === 'title') {
            leftPosition = obj.left + obj.width/2 * obj.scaleX + 10;
        }

        $contols.css({
            top: obj.top,
            left: leftPosition
        });
    }

    canvas.on('selection:created', controlsShow);
    canvas.on('selection:updated', controlsShow);
    canvas.on('object:moving', controlsShow);
    canvas.on('object:scaling', controlsShow);
    canvas.on('selection:cleared', contolsHide);

    // обновление controls для баблов
    function updateControls(e) {
        let obj = e.target;

        if (obj && obj._objects) {
            let currentFontSize = obj.item(1).get('fontSize');
            let currentText = obj.item(1).get('text');

            $('.jsControlFontSize').val(currentFontSize);
            if (obj.exampleBubble) {
                $('.jsControlText').val('');
            } else {
                $('.jsControlText').val(currentText);
            }
        }
    }
    canvas.on('selection:created', updateControls);
    canvas.on('selection:updated', updateControls);


    // экспорт
    $('.jsToPng').click(function() {
        var data = canvas.toDataURL({
            multiplier: 4,
            format: 'jpg',
            quality: .8
        });

        if (typeof getResultEditor === 'function') {
            setTimeout(function() {
                $('.jsToPng').removeClass('rendering');
            }, 500);
            getResultEditor(data);
        }
        // $('.jsToPngResult').attr('src', data);
    });

    $('.jsEditorDownload').click(function() {
        var data = canvas.toDataURL({
            multiplier: 4,
            format: 'jpg',
            quality: .8
        });

        var link = document.createElement('a');
        link.href = data;
        link.style = 'display:none;';
        link.target = '_blank';
        link.download = 'work.jpg';
        document.body.appendChild(link);
        link.click();

        return false;
    });

    // убираем фокус с элементов
    $('.editor__sidebar, .editor-book__bg, .editor-book__head, .editor-book__foot, .jsEditorNext, .jsEditorSoundToggle').click(function(e) {
        e.preventDefault();
        canvas.discardActiveObject().renderAll();
    });
}

$('.jsComicsTemplate').click(function() {
    let index = $(this).index() - 1;
    initEditor(templates[index]);

    $('.jsStep1').hide();
    $('.jsStep2').show();

    return false;
});

$('.jsComicsTemplate').eq(0).click();


$('.jsModalCropPhoto').on('hidden.bs.modal', function() {
    validateToStep2();
});


let modalMessage = $('.jsModalEditorError'),
    modalMessageTitle = modalMessage.find('.jsModalEditorErrorMessage');

function validateToStep1(event) {
    if (templatesButtonLeft.eq(0).hasClass('active') &&
        templatesButtonRight.eq(0).hasClass('active') &&
        inputName.val() !== '') {
        editor.find('.jsEditorNext').eq(0).removeClass('disabled');
        return true;
    } else {
        editor.find('.jsEditorNext').eq(0).addClass('disabled');

        if (event === 'click-next') {
            if (inputName.val() !== '') {
                modalMessage.modal('show');
                modalMessageTitle.text('Чтобы продолжить выбери  форму для разворотов!');
            } else {
                modalMessage.modal('show');
                modalMessageTitle.text('Введи название будущей истории!');
            }
            dataLayer.push({
                'event':'event',
                'event_category':'editor',
                'event_action':'click',
                'event_label':'next_try'
            });
        }
        return false;
    }
}

function validateToStep2(event) {
    if (inputName.val() !== '' &&
        $('.jsComicsPhotoUploadCache img.uploaded').length >= 6) {
        // $('.jsComicsPhotoUploadCache img.uploaded').length >= 0) {
        editor.find('.jsEditorNext').eq(1).removeClass('disabled');
        return true;
    } else {
        editor.find('.jsEditorNext').eq(1).addClass('disabled');

        if (event === 'click-next') {
            modalMessage.modal('show');
            modalMessageTitle.html('Чтобы продолжить добавь фото и элементы для комикса!');
            dataLayer.push({
                'event':'event',
                'event_category':'editor',
                'event_action':'click',
                'event_label':'results_try'
            });
        }
        return false;
    }
}

// function validateInputName() {
//     if (inputName.val() === '') {
//         // inputName.focus();
//         return false;
//     }
// }

inputName.keydown(function() {
    setTimeout(function() {
        if (editor.hasClass('step-1')) {
            validateToStep1();
        } else if (editor.hasClass('step-2')) {
            validateToStep2();
        }
    }, 0);
});

function addPhotoGrid() {
    photos.forEach(function(el, index) {
        $('.jsComicsPhotoUploadButton').eq(index).css({
            top: el.top,
            left: el.left,
            height: el.height,
            width: el.width,
        });
    });
}

function addExampleBubble() {
    let indexLeft = editor.data('left-page-active');
    let indexRight = editor.data('right-page-active');
    let x1 = 40;
    let x2 = 410;
    let y1 = 30;
    let y2 = 210;

    switch (indexLeft) {
        case 0:
            y1 = 70;
            break;
        case 1:
            y1 = 130;
            break;
        case 2:
            y1 = 110;
            break;
        case 3:
        case 4:
            y1 = 80;
            break;
        case 5:
        case 6:
            y1 = 110;
            break;
        case 7:
        case 8:
            y1 = 130;
            break;
        case 9:
            y1 = -20;
            break;
    }

    switch (indexRight) {
        case 1:
            y2 = 190;
            break;
        case 2:
        case 5:
        case 6:
            x2 = 430;
            y2 = 160;
            break;
        case 7:
        case 8:
            y2 = 190;
            break;
        case 9:
            x2 = 390;
            y2 = 200;
            break;
    }

    var bubble1 = $('.bubbleNew').eq(6);
    bubble1.attr('src', bubble1.data('src')).one('load', function() {
        createBubbleExample(x1, y1, `Расскажи, почему твоя
семья - Супергерои!`, canvas, bubble1, scalingBubble, 2.3, 10);
    });

    var bubble2 = $('.bubbleNew').eq(5);
    bubble2.attr('src', bubble2.data('src')).one('load', function() {
        createBubbleExample(x2, y2, `Расскажи свою
 супер историю!`, canvas, bubble2, scalingBubble, 1.7, 14);
    });
}

nextStep.click(function() {
    let index = $(this).index();

    if (!$(this).hasClass('active')) {
        return false;
    }

    // validateInputName();
    if (index === 0 && validateToStep1('click-next')) {
        addPhotoGrid();
        editor.removeClass('step-1 step-2 step-3')
              .addClass('step-' + (index + 2));
        nextStep.removeClass('active').eq(1).addClass('active');
        dataLayer.push({
            'event':'event',
            'event_category':'editor',
            'event_action':'click',
            'event_label':'next'
        });
        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/editor/step2'
        });

        addExampleBubble();
        setTimeout(function() {
            $('.jsModalEditorHintShow').click();
        }, 400);
        return false;
    } else if (index === 1 && validateToStep2('click-next')) {
        editor.removeClass('step-1 step-2 step-3')
              .addClass('step-3');
        nextStep.removeClass('active').eq(2).addClass('active');
        nav.addClass('white');

        inputName.prop('readonly', true);

        dataLayer.push({
            'event':'event',
            'event_category':'editor',
            'event_action':'click',
            'event_label':'results'
        });
        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/editor/step3'
        });

        return false;
    } else if (index === 2) {
        if ($('.jsToPng').hasClass('rendering')) {
            return false;
        }
        $('.jsToPng').addClass('rendering').click();
        return false;
    }

    return false;
});

kitCategoryToggle.click(function(e) {
    e.preventDefault();
    let index = $(this).index();


    if ($('body').hasClass('mobile')) {
        if ($(this).hasClass('active')) {
            elements.hide();
            kitCategoryToggle.removeClass('active');
            elementsCategory.removeClass('active');
            return false;
        }
    }

    elements.show();
    kitCategoryToggle.removeClass('active');
    $(this).addClass('active');
    editor.addClass('step-2_elements');

    elementsCategory.removeClass('active').eq(index).addClass('active');

    let img = elementsCategory.eq(index).find('img');
    img.each(function(index, el) {
        $(this).attr('src', $(this).data('src'));
    });

});

resultBack.click(function() {
    editor.removeClass('step-3')
          .addClass('step-2');
    nav.removeClass('white');
    nextStep.removeClass('active').eq(1).addClass('active');
    inputName.prop('readonly', false);
    return false;
});

again.click(function() {
    window.location.reload();
    // if (confirm('Вы уверены? Ваши изменения не будут сохранены')) {
    //     window.location.href = '/html/desktop/editor.html';
    // }
    return false;
});

initEditor();

$('.jsMobileCapStart').click(function(event) {
    $('.editor-info').hide();
    $('.editor-info-name').show();
    $('.editor-hint').show();
    return false;
});

$('.jsMobileCapNext').click(function(event) {
    if (/\S/.test($('.jsMobileCapTextarea').val())) {
        $('.jsMobileCap').hide();
        $('.jsEditorInputName').val($('.jsMobileCapTextarea').val());
        $('.editor-hint').addClass('dark');
        $('.jsEditorNav').addClass('white');
    } else {
        modalMessage.modal('show');
        modalMessageTitle.text('Введи название будущей истории!');
    }
    return false;
});

$('.jsMobileCapTextarea').keydown(function(e){
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        return false;
    }
});

inputName.keydown(function(e){
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        return false;
    }
});


var scaleContainer = $('.jsMobileBookScale');
function scalingBook() {
    let offsetTop = 87,
        offsetBottom = 113,
        staticWidth = 740,
        staticHeight = 516,
        ratio = 1.368217054,
        wh = $(window).height(),
        result;

    result = (wh - offsetTop - offsetBottom) / staticHeight;

    scaleContainer.css({
        'transform': 'scale(' + result + ')',
        'height': staticHeight * result,
        'width': staticWidth * result
    }).data('scale', result);
}

$(window).on('load resize', function() {
    scalingBook();
});
scalingBook();


// setTimeout(function() {
//     $('.jsEditorInputName').val('test');
//     $('.editor-templates__button.left').eq(0).click();
//     $('.editor-templates__button.right').eq(0).click();
//     $('.jsEditorNext.active').click();

//     $('.editor-kit__item').eq(0).click();
//     $('.jsComicsPhotoUploadButton').hide();
// }, 500);

window.onbeforeunload = function(e) {
    if (editor.hasClass('disabled-confirm')) {
        return false;
    }
    if (editor.hasClass('step-2')) {
        return 'Вы уверены? Ваши изменения не будут сохранены';
    }
};