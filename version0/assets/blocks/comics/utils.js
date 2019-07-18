export function getXY(e) {
    var x,
        y;

    if (e.originalEvent && e.originalEvent.changedTouches) {
        x = e.originalEvent.changedTouches[0].pageX;
        y = e.originalEvent.changedTouches[0].pageY;
    } else if (e.changedTouches) {
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
    }
    else {
        x = e.pageX;
        y = e.pageY;
    }
    return { x: x, y: y };
}