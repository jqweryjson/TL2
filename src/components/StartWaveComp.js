import * as React from 'react';

import { ReactComponent as StartWave } from './img/startWave.svg';
import { ReactComponent as StartWaveMobile } from './img/startWaveMobile.svg';

import { isMobile } from 'react-device-detect';

import Couple from './img/couple.png';
import CoupleMobile from './img/couple-mobile.png';

const StartWaveComp = () => {
  return (
    <>
      {isMobile ? <StartWaveMobile /> : <StartWave />}
      {/* <img src={isMobile ? CoupleMobile : Couple} className="svgST__image" alt="" /> */}
    </>
  );
};
export default StartWaveComp;
