import * as React from 'react';
import { ReactComponent as StartWave } from './img/startWave.svg';
import Couple from './img/couple.png';

const StartWaveComp = () => {
  return (
    <>
      <StartWave />
      <img src={Couple} className="svgST__image" alt="" />
    </>
  );
};
export default StartWaveComp;
