import 'whatwg-fetch' // полифил для ie11 для работы c fetch

/**
 * ie не может получить доступ к ширине и высоте svg поэтому грузим svg как строку и через регулярку достаем нужные значения
 * 
 * @param {source} - откуда грузим
 * @param {callback} - что выполняем после загрузки
 * @return - none
 */
export function getSvgParamForIe(source, callback) {
	let msSvgSize = {};
    if (source && source.src) {
        fetch(source.src)
            .then(response => response.text())
            .then(svgText => {
                msSvgSize.width = parseInt(svgText.match(/width=".*?"/i)[0].match(/[0-9.]+/)[0]);
                msSvgSize.height = parseInt(svgText.match(/height=".*?"/i)[0].match(/[0-9.]+/)[0]);
                callback(null,msSvgSize);
            })
            .catch(err => console.log(err));
    }
}


/**
 * ie test
 *
 * @param none
 * @return - {Bool}
 */
export function isIEorEDGE() {
    if (navigator.appName == 'Microsoft Internet Explorer') {
        return true; // IE10
    } else if (navigator.appName == "Netscape") {
        return navigator.appVersion.indexOf('Edge') > -1 || navigator.appVersion.indexOf('Trident') > -1; // EDGE or ie11
    }
    return false;
}