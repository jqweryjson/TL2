import { getSvgParamForIe, isIEorEDGE } from './ieFix'; 
import FontFaceObserver from 'FontFaceObserver';

var cornerSize = 13;

if ($('body').hasClass('mobile')) {
    cornerSize = 30;
}

export function createBubble(x, y, canvas, image, autoHeightBubble, scalingBubble) {
    let type = image.data('type'),
        bubbleWidth = 150,
        tailPath = 'M 10 0 L 0 30 L 30 0',
        tailLeft = 45,
        tailOffsetY = 24,
        tailPosition = 'left';

    if (type === 1) {
        bubbleWidth = 220;
        tailPath = 'M 10 0 L 50 60 L 40 0';
        tailLeft = 65;
        tailOffsetY = 39;
        tailPosition = 'right';
    }

    let textBox = new fabric.Textbox('', {
        width : bubbleWidth,
        fill: '#000',
        fontSize: 18,
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
    });

    let box = new fabric.Rect({
        rx: 20,
        width : bubbleWidth,
        fill : '#fff',
        strokeWidth: 1,
        stroke: "#000",
        originX: 'center',
        originY: 'center'
    });

    let tail = new fabric.Path(tailPath, {
        stroke: '#000',
        strokeWidth: 1,
        fill: '#fff',
        originX: 'center',
        originY: 'center',
        tailLeft: tailLeft,
        tailPosition: tailPosition,
    });
    let tail2 = new fabric.Path(tailPath, {
        visible: false,
        stroke: '#000',
        strokeWidth: 1,
        fill: '#fff',
        originX: 'center',
        originY: 'center',
        tailLeft: tailLeft,
        tailPosition: tailPosition,
    });

    let groupBubble = new fabric.Group([ box, textBox, tail, tail2, ], {
        left: x,
        top: y,
        customType: 'bubble',
        width : bubbleWidth,
        lockScalingFlip: true,
        hasRotatingPoint: false,
        objectCaching : false,
        minScaleLimit: .6,
        transparentCorners: false,
        cornerStyle: 'circle',
        cornerSize: cornerSize,
        tailOffsetY: tailOffsetY,
    });

    groupBubble.setControlVisible('mb', false);
    groupBubble.setControlVisible('mt', false);


    autoHeightBubble(groupBubble);
    canvas.add(groupBubble).setActiveObject(groupBubble);

    groupBubble.on('scaling', scalingBubble);
}

export function createBubbleNew(x, y, canvas, image, autoHeightBubble, scalingBubble) {
    let source = image[0];
    var image = new Image();
    var width, height;

    if (isIEorEDGE()) {
        getSvgParamForIe(source,createWhenImgReady)
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

        let textBox = new fabric.Textbox('', {
            width : width,
            height: height,
            fill: '#000',
            fontFamily: 'Chalkboard SE',
            fontWeight: 300,
            fontStyle: 'normal',
            fontSize: 14,
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
        });

        var box = new fabric.Image(source, {
            width: width,
            height: height,
            originX: 'center',
            originY: 'center'
        });

        let groupBubbleNew = new fabric.Group([ box, textBox, ], {
            left: x,
            top: y,
            customType: 'bubbleNew',
            width : width,
            height: height,
            lockScalingFlip: true,
            hasRotatingPoint: true,
            objectCaching : false,
            minScaleLimit: .6,
            transparentCorners: false,
            cornerStyle: 'circle',
            cornerSize: cornerSize,
            lockUniScaling: true,
        });

        canvas.add(groupBubbleNew).setActiveObject(groupBubbleNew);

        groupBubbleNew.on('scaling', scalingBubble);
    };
    image.src = source.src;
}

export function createBubbleExample(x, y, text, canvas, image, scalingBubble, scale, fontSize) {
    let source = image[0];
    var image = new Image();
    var width, height;

    if (isIEorEDGE()) {
        getSvgParamForIe(source,createWhenImgReady)
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

        let textBox = new fabric.Textbox(text, {
            width : width,
            height: height,
            fill: '#ababab',
            fontFamily: 'Chalkboard SE',
            fontWeight: 300,
            fontStyle: 'normal',
            fontSize: fontSize,
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
        });

        var box = new fabric.Image(source, {
            width: width,
            height: height,
            originX: 'center',
            originY: 'center'
        });

        let groupBubbleNew = new fabric.Group([ box, textBox, ], {
            left: x,
            top: y,
            customType: 'bubbleNew',
            exampleBubble: true,
            width : width,
            height: height,
            lockScalingFlip: true,
            hasRotatingPoint: true,
            objectCaching : false,
            minScaleLimit: .6,
            transparentCorners: false,
            cornerStyle: 'circle',
            cornerSize: cornerSize,
            lockUniScaling: true,
        });
        groupBubbleNew.set('scaleX', scale);
        groupBubbleNew.set('scaleY', scale);


        var font = new FontFaceObserver('Chalkboard SE', {
          weight: 300
        });

        font.load().then(function () {
            canvas.add(groupBubbleNew);
            canvas.requestRenderAll();
            groupBubbleNew.on('scaling', scalingBubble);
        }, function () {
            canvas.add(groupBubbleNew);
            canvas.requestRenderAll();
            groupBubbleNew.on('scaling', scalingBubble);
        });

    };
    image.src = source.src;
}
