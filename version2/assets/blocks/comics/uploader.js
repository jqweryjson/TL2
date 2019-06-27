import Cropper from 'cropperjs/dist/cropper.common.js';
import filterous from 'filterous/demo-browser/filterous2.js';
import 'rangeslider.js';

export function initUploader(photos, canvas) {
    let cropper,
        $modal = $('.jsModalCropPhoto'),
        $photoInput = $('.jsComicsPhotoUpload'),
        $photoCache = $('.jsComicsPhotoUploadCache img'),
        $photoSave = $('.jsComicsPhotoSave'),
        $photoImg = $('.jsCropPhotoImg'),
        $photoRotate = $('.jsCropPhotoRotate'),
        $photoZoomIn = $('.jsCropPhotoZoomIn'),
        $photoZoomOut = $('.jsCropPhotoZoomOut');

    function scaleImage(img, width, orientation, url) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        var newWidth = width,
            newHeight = width * (img.height / img.width);

        // set proper canvas dimensions before transform & export
        if (4 < orientation && orientation < 9) {
          canvas.width = newHeight;
          canvas.height = newWidth;
        } else {
          canvas.width = newWidth;
          canvas.height = newHeight;
        }

        // transform context before drawing image
        switch (orientation) {
          case 2: ctx.transform(-1, 0, 0, 1, newWidth, 0); break;
          case 3: ctx.transform(-1, 0, 0, -1, newWidth, newHeight); break;
          case 4: ctx.transform(1, 0, 0, -1, 0, newHeight); break;
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
          case 6: ctx.transform(0, 1, -1, 0, newHeight, 0); break;
          case 7: ctx.transform(0, -1, -1, 0, newHeight, newWidth); break;
          case 8: ctx.transform(0, -1, 1, 0, 0, newWidth); break;
          default: break;
        }

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        $photoImg.attr('src', canvas.toDataURL());

        $photoImg.one('load', function() {
            updateImage(canvas.toDataURL());
        });
    }

    function updateImage(url) {
        let index = $photoInput.data('index');

        $photoCache.eq(index).attr('src', url).addClass('uploaded');

        if (!$('.jsCropPhotoImg').hasClass('cropper-hidden')) {
            initCropper();
        }
    }

    $photoInput.on('change', function(e) {
        var files = e.target.files;
        var reader;
        var file;

        var done = function(url, orientation) {
            $photoInput.val('');
            $photoImg.attr('src', url);
            $modal.modal('show');

            $photoImg.one('load', function() {
                scaleImage($photoImg[0], 1332, orientation, url);
            });
        };

        if (files && files.length > 0) {
            file = files[0];

            getOrientation(file, function(orientation) {
                if (URL) {
                    done(URL.createObjectURL(file), orientation);
                } else if (FileReader) {
                    reader = new FileReader();
                    reader.onload = function (e) {
                        done(reader.result, orientation);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    });

    function getOrientation(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {

            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8)
            {
                return callback(-2);
            }
            var length = view.byteLength, offset = 2;
            while (offset < length) 
            {
                if (view.getUint16(offset+2, false) <= 8) return callback(-1);
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) 
                {
                    if (view.getUint32(offset += 2, false) != 0x45786966) 
                    {
                        return callback(-1);
                    }

                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++)
                    {
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                        {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                }
                else if ((marker & 0xFF00) != 0xFF00)
                {
                    break;
                }
                else
                { 
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }

    $photoSave.click(function() {
        $modal.modal('hide');
        $modal.addClass('saved');
        cropper.getCroppedCanvas({
            width: $modal.data('width') * 4,
            height: $modal.data('height') * 4,
            imageSmoothingQuality: 'high',
        }).toBlob((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            // $('#preview').attr('src', imageUrl);

            let filter =  $('.jsFilter.active');
            if (filter.length) {
                $('img.photo').attr('src', imageUrl).one('load', function() {
                    let srcImg = $('img.photo')[0];

                    filter.removeClass('active');
                    $('.jsFilter').eq(0).addClass('active');

                    filterous.importImage(srcImg, { format: 'png' })
                        .applyInstaFilter(filter.data('filter'))
                        .exportImage(function(img) {
                            loadPattern(img.canvas.toDataURL('image/' + img.options.format), canvas);
                        }
                    );
                });
            } else {
                loadPattern(imageUrl, canvas);
            }
        });
    });

    $modal.on('shown.bs.modal', function() {
        if ($('body').hasClass('mobile')) {
            $('.jsCropPhotoRotate').rangeslider({
                polyfill: false,
            });
        }
    });

    if ($('body').hasClass('mobile')) {
        $('.jsCropPhotoRotate').on('change', function() {
            let current = $(this).val() - lastValue;

            cropper.rotate(current);
            lastValue = $(this).val();
        });
    }

    $modal.on('hidden.bs.modal', function() {
        $photoRotate.val(0);
        lastValue = 0;
        if ($('body').hasClass('mobile')) {
            $('.jsCropPhotoRotate').rangeslider('update', true);
        }
        destroyCropper();
    });

    let lastValue = $photoRotate.val();
    $photoRotate.on('input mouseup', function() {
        let current = $photoRotate.val() - lastValue;

        cropper.rotate(current);
        lastValue = $photoRotate.val();
    });



    $photoZoomIn.click(function() {
        cropper.zoom(0.1);
    });
    $photoZoomOut.click(function() {
        cropper.zoom(-0.1);
    });

    function destroyCropper() {
        cropper.destroy();
        cropper = null;
    }

    function initCropper() {
        let ratio = $modal.data('ratio');
        let init = false;

        let container = $('.modal-photo__pic'),
            image = $('.jsCropPhotoImg')[0];

        container.css('opacity', 0);
        image.addEventListener('ready', () => {
            container.css('opacity', 1);
        });

        cropper = new Cropper(image, {
            aspectRatio: ratio,
            viewMode: 1,
            dragMode: 'move',
            restore: false,
            guides: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
            autoCrop: true,
        });
    }

    function loadPattern(url, canvas) {
        let index = $photoInput.data('index');

        fabric.util.loadImage(url, function(img) {
            photos[index].set({
                fill: new fabric.Pattern({
                    source: img,
                    repeat: 'no-repeat',
                    patternTransform: [.25, 0, 0, .25, 0, 0,]
                }),
                strokeWidth: 1,
                hoverCursor: 'default',
                uploaded: true,
                selectable: true,
            });
            canvas.renderAll();

            $('.jsComicsPhotoUploadButton').eq(index).hide();
        });
    }

    $('.jsFilterOriginal').click(function() {
        let imgSrc = $('.cropper-canvas img')[0],
            nameFilter = $(this).data('filter');

        if ($(this).hasClass('process') || $(this).hasClass('active')) {
            return false;
        }

        $(this).addClass('process');
        filterous.importImage(imgSrc, { format: 'png' })
            .applyInstaFilter(nameFilter)
            .renderHtml($('.cropper-view-box img')[0], $(this));
    });

    $('.jsFilter').click(function() {
        let imgSrc = $('.cropper-canvas img')[0],
            nameFilter = $(this).data('filter');

        if ($(this).hasClass('process') || $(this).hasClass('active')) {
            return false;
        }

        $(this).addClass('process');
        filterous.importImage(imgSrc, { format: 'png' })
            .applyInstaFilter(nameFilter)
            .renderHtml($('.cropper-view-box img')[0], $(this));
    });

    $('.jsControlBgUpdate').click(function() {
        let activeObject = canvas.getActiveObject(),
            index = activeObject.index;

        $('.jsComicsPhotoUpload').data('index', index);
        $('.jsCropPhotoImg').attr('src', $photoCache.eq(index).attr('src'))
        $('.jsModalCropPhoto').one('shown.bs.modal', function() {
            if (!$('.jsCropPhotoImg').hasClass('cropper-hidden')) {
                initCropper();
            }
        }).data('ratio', photos[index].width / photos[index].height)
          .data('width', photos[index].width)
          .data('height', photos[index].height)
          .modal('show');

        return false;
    });

    // $('.jsFilter2').click(function() {
    //     let imgSrc = $('.cropper-canvas img')[0],
    //         nameFilter = $(this).data('filter');

    //     $(this).addClass('active').siblings('.jsFilter').removeClass('active');
    //     filterous.importImage(imgSrc, { format: 'png' })
    //         .applyInstaFilter(nameFilter)
    //         .renderHtml($('.cropper-view-box img')[0]);
    // });
}