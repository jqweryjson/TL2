import 'url-polyfill';
let urlString = window.location.href,
    url = new URL(urlString),
    workId = url.searchParams.get('work');

if (workId) {
    $.ajaxSetup({
        headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')}
    });

    $.get('/works/item/' + workId, function(data) {
        let html = $.parseHTML(data),
            button = html[2];

        console.log(button);
        $('body').append(`<div class="jsWorkAutoOpen" style="display:none;"></div>`);
        $('.jsWorkAutoOpen').append(button);
        $('.jsWorkAutoOpen .jsModalWorkToggle').click();
    });
}