import * as React from 'react';

const MobileBtnBlock = ({ currentSlideNumber }) => {
    return (
        <div className="infoBlock__button mBth">
            <span>{ currentSlideNumber === 0 ? 'Подробнее' : 'Погнали' }</span>
        </div>
    )
}

export default MobileBtnBlock