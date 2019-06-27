$(document).ready(function() {

    var Share = {
        popup: function (url) {
            if ($('body').hasClass('mobile')) {
                window.open(url, '_blank');
            } else {
                window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
            }
        }
    };
    var url;

    $(document).on('click', '.jsShareLink, .landing-test-result__social a', function() {
        var parent = $(this).parents('[data-url]');

        if ($(this).hasClass('vk')) {
            url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + parent.attr('data-url') + '?source=vk';
            // url += '&noparse=true';
            // url += '&title=' + parent.attr('data-title');
            url += '&image=' + parent.attr('data-image');
            // url += '&description=' + parent.attr('data-description');
            Share.popup(url);
        } else if ($(this).hasClass('fb')) {
            url = 'https://www.facebook.com/dialog/feed?app_id=520585758372400';
            // url += '&display=popup&description=' + parent.attr('data-description');
            url += '&link=' + parent.attr('data-url') + '?source=fb';
            Share.popup(url);
        } else if ($(this).hasClass('ok')) {
            url = 'https://connect.ok.ru/offer';
            url += '?url=' + parent.attr('data-url') + '?source=ok';
            // url += '&title=' + parent.attr('data-title');
            // url += '&description=' + parent.attr('data-description');
            // url += '&imageUrl=' + parent.attr('data-image');
            Share.popup(url);
        }

        return false;
    });
});