import * as React from 'react';
import classnames from 'classnames';

const InfoBlock = ({title , header, btnText, onClick, hasBg }) => {
    const blockClass = classnames({
        hasBg: hasBg,
        infoBlock: true,
    });
    return (
        <div className={blockClass}>
            <h2 className="infoBlock__header">{ header }</h2>
            <div className="infoBlock__text">{ title }</div>
            <button onClick={ onClick } className="infoBlock__button">{ btnText }</button>
        </div>
    );
}
export default InfoBlock;