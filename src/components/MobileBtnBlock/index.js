import * as React from 'react';

const MobileBtnBlock = ({ currentSlideNumber, text }) => {
    return (
        <div className="infoBlock__button mBth">
            { currentSlideNumber === 0 ? 'Подробнее' : 'Погнали' }
        </div>
    )
}

export default MobileBtnBlock