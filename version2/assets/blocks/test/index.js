if ($('body').data('user-test')) {
    let index = $('body').data('user-test');
    $('.jsTestResult').show().find('.landing-test-result__item').eq(index).addClass('active');
    $('.landing-test').addClass('landing-test_result');
} else {
    if (Cookies.get('landing_result_test') && Cookies.get('landing_result_test') !== '') {
        let index = Cookies.get('landing_result_test');
        $('.jsTestResult').show().find('.landing-test-result__item').eq(index).addClass('active');
        $('.landing-test').addClass('landing-test_result');
    }
}

let isMobile = $('body').hasClass('mobile');



let points = [[
    [ 33, 81,  0, 66,  6,  0, 46, ],
    [  0, 99,  0, 49, 13, 39, 21, ],
    [  0, 13, 26, 85, 42, 99, 39, ],
    [  0,  0, 13, 99,  5, 65, 23, ],
], [
    [ 72, 79, 12,  2, 99,  0,  0, ],
    [  9, 15, 53, 99, 12, 83, 34, ],
    [  0, 16, 99,  0,  0, 61, 23, ],
    [  0,  0, 51,  0,  0, 38, 99, ],
],
[
    [ 99, 12, 53,  0,  0,  0, 12, ],
    [  0, 99,  0, 73, 62, 52, 51, ],
    [ 13, 66,  0, 15, 99,  0, 43, ],
    [  0,  0,  0,  0,  0, 41, 99, ],
],
[
    [  0, 42,  0, 99, 88, 43, 69, ],
    [  0, 57,  0, 45, 99, 49, 56, ],
    [  0, 99,  0, 39, 45, 39, 41, ],
    [ 99,  0, 43,  0,  0,  0,  0, ],
],
[
    [ 16, 28,  0,  0,  3, 99, 37, ],
    [  0,  0,  0, 99, 52, 59, 63, ],
    [ 45, 99, 69,  0,  0,  0,  0, ],
    [ 15,  0,  0, 51, 99, 42, 67, ],
],
[
    [ 72, 69,  0, 56, 99,  0, 16, ],
    [ 99, 12,  0,  0, 27,  0, 14, ],
    [ 52, 21, 15, 99, 72,  0,  0, ],
    [ 0,   0,  0,  0,  0, 99, 12, ],
],
[
    [ 18, 31, 73, 24, 13, 99, 57, ],
    [ 83, 81,  0, 52, 99,  0, 16, ],
    [ 71, 51,  0, 12,  7,  0, 99, ],
    [ 12,  0, 99,  0,  0, 41, 41, ],
],];

function getResult(answers) {
    let sumPoints = [0, 0, 0, 0, 0, 0, 0];
    let result;

    for (var i = 0; i < answers.length; i++) {
        for (var j = 0; j < sumPoints.length; j++) {
            sumPoints[j] += points[j][answers[i].value][i];
        }
    }

    let maxPoints = Math.max.apply(null, sumPoints);

    for (var i = 0; i < sumPoints.length; i++) {
        if (sumPoints[i] === maxPoints) {
            result = i;
        }
    }

    console.log('sumPoints', sumPoints);
    console.log('maxPoints', maxPoints);

    return result;
}

$('.jsTestList input').change(function() {
    let next = $('.landing-test__item.active').next();

    if (next.length) {
        if (next.index() !== 0) {
            $('.jsTestBack').addClass('active');
        } else {
            $('.jsTestBack').removeClass('active');
        }
        next.addClass('active').prev().removeClass('active');
        setTimeout(function() {
            next.addClass('animated');
        }, 0);

        let index = $(this).closest('.landing-test__item').index();

        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/test/answer/q' + (index + 1)
        });
    } else {
        let result = getResult($('.landing-test__vote').serializeArray());

        $('.jsTestResult').show().find('.landing-test-result__item').eq(result).addClass('active');

        Cookies.set('landing_result_test', result);
        $('.landing-test').addClass('landing-test_result');

        if (typeof getResultTest === 'function') {
            getResultTest({ hero_id: result });
        }

        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/test/answer/q7'
        });

        dataLayer.push({
            'event': 'VirtualPageview',
            'url': '/test/results'
        });
    }
    return false;
});

$('.jsTestBack').click(function() {
    let prev = $('.landing-test__item.active').prev();

    if (prev.index() <= 0) {
        $('.jsTestBack').removeClass('active');
    } else {
        $('.jsTestBack').addClass('active');
    }

    prev.addClass('active').next().removeClass('active animated');
    prev.find('input[type="radio"]').prop('checked', false);
    setTimeout(function() {
        prev.addClass('animated');
    }, 0);

    return false;
});

$('.jsTestReturn').click(function() {
    $('.jsTestList input').prop('checked', false);
    $('.jsTestBack').removeClass('active');
    $('.jsTestResult').fadeOut().find('.landing-test-result__item.active').removeClass('active');
    $('.landing-test__item').removeClass('active').eq(0).addClass('active');
    Cookies.set('landing_result_test', '');
    $('.landing-test').removeClass('landing-test_result');

    if (typeof deleteResultTest === 'function') {
        deleteResultTest();
    }
    return false;
});