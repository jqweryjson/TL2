import React, { Component, PureComponent } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TimelineLite, Power2 } from 'gsap';
import { isMobile } from 'react-device-detect';

import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section/';
import BlackSection from './components/BlackSection';
import BlackSection2 from './components/BlackSection2';

import Couple from './components/img/couple.png';
import Pig from './components/img/pig.png';
import Robot from './components/img/robot.png';
import Girls from './components/img/girls.png';

import CoupleMobile from './components/img/couple-mobile.png';
import PigMobile from './components/img/pig-mobile.png';
import RobotMobile from './components/img/robot-mobile.png';
import GirlsMobile from './components/img/girls-mobile.png';

import { ReactComponent as Ball } from './components/img/ball.svg';
import { ReactComponent as Connect } from './components/img/connect.svg';
import { ReactComponent as Onhand } from './components/img/onhand.svg';


import { ReactComponent as StartWave } from './components/img/startWave.svg';
import { ReactComponent as StartWaveMobile } from './components/img/startWaveMobile.svg';

export default class App extends Component {
  constructor() {
    super();
    this.tl = new TimelineLite();
    this.tl.defaultEase = Power2.easeIn;
    this.isMobile = isMobile;
    this.isSwipe = isMobile ? true : false;
  }
  state = {
    isBlackScreen: false,
    currentSlideNumber: 0,
    animateTextDirection: null,
    afterChange: null,
    startSVG: true,
    fills: ['#C3E400', '#FF59A3', '#1EE7CA', '#FF6633']
  };
  sliderRef = React.createRef();
  BallRef = React.createRef();
  ConnectRef = React.createRef();
  OnhandRef = React.createRef();
  currentSlideNumber = 0;
  inProgress = true;
  autoplay;
  autoplayDelay = 5000;
  componentDidMount() {
      document.getElementById('svgWave').classList += ' initial-animation';
      document.getElementById('specialID').classList +=
      ' initial-animation';
      this.manageActiveClass(0);
    let self = this;
    setTimeout(() => {
      self.hideStartScgAnim();
      self.resetAutoPlay();
      self.inProgress = false;
    }, 8000);
  }
  autoplayStart() {
    if (this.currentSlideNumber === 5) {
      this.sliderRef.current.slickGoTo(0);
      this.animateWave(0);
      return;
    }
    this.preNext();
  }
  hideStartScgAnim() {
    document.getElementById('svgWave').getElementsByTagName('line')[0].style.display = 'none'
    if(!this.isMobile){
      window.addEventListener('wheel', event => this.mouseWheelHandler(event), {
        passive: false
      });
    }
  }
  mouseWheelHandler(event) {
    this.resetAutoPlay();

    if (this.inProgress) {
      return false;
    }
    event.preventDefault();
    const delta = event.wheelDelta;
    if (delta >= 100 && delta <= 150 && this.currentSlideNumber !== 0) {
      this.inProgress = true;
      this.prePrev();
    } else if (
      delta <= -100 &&
      delta >= -150 &&
      this.currentSlideNumber !== 5
    ) {
      this.inProgress = true;
      this.preNext();
    }
  }
  animateText(index, direction) {
    this.setState({
      animateTextDirection: direction
    });
  }
  animateWave(nextSlideNumber) {
    document
      .getElementById('svgWave')
      .getElementsByClassName('waveAnimation')[0]
      .beginElement();
    if (nextSlideNumber === 4 || nextSlideNumber === 5) {
      document
        .getElementById('svgWave')
        .getElementsByTagName('path')[0]
        .setAttribute('fill', `rgba(0,0,0,0)`);
      return;
    }
    document
      .getElementById('svgWave')
      .getElementsByTagName('path')[0]
      .setAttribute('fill', `${this.state.fills[nextSlideNumber]}`);
  }
  prePrev() {
    if (this.currentSlideNumber > 4) {
      this.sliderRef.current.slickPrev();
    } else {
      if (this.currentSlideNumber === 4) {
        document
          .getElementById('svgWave')
          .getElementsByTagName('path')[0]
          .setAttribute(
            'fill',
            `${this.state.fills[this.currentSlideNumber - 1]}`
          );
        this.tl
          .set(
            document.getElementsByClassName('subject-image')[
              this.currentSlideNumber - 1
            ],
            { right: '200%' }
          )
          .to(
            document.getElementsByClassName('subject-image')[
              this.currentSlideNumber - 1
            ],
            0.8,
            { right: '0%' }
          );
        this.sliderRef.current.slickPrev();
        return;
      }
      this.animateWave(this.currentSlideNumber - 1);
      this.animateText(this.currentSlideNumber, 'next');
      this.animateImage('prev');
      setTimeout(() => {
        this.sliderRef.current.slickPrev();
      }, 800);
    }
  }
  animateImage(direction) {
    if (this.currentSlideNumber === 0) {
      this.tl
        .to(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber
          ],
          0.8,
          { right: '-100%' }
        )
        .set(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber + 1
          ],
          { right: '200%' }
        )
        .to(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber + 1
          ],
          0.8,
          { right: '0%' }
        )
        .set(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber
          ],
          { right: '0%' }
        );
      return;
    }
    if (direction === 'prev') {
      this.tl
        .to(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber
          ],
          0.8,
          { right: '200%' }
        )
        .set(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber - 1
          ],
          { right: '200%' }
        )
        .to(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber - 1
          ],
          0.8,
          { right: '0%' }
        );
      return;
    }
    if (this.currentSlideNumber < 3) {
      this.tl
        .to(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber
          ],
          0.8,
          { right: '-100%' }
        )
        .set(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber + 1
          ],
          { right: '200%' }
        )
        .to(
          document.getElementsByClassName('subject-image')[
            this.currentSlideNumber + 1
          ],
          0.8,
          { right: '0%' }
        );
    }
    if (this.currentSlideNumber === 3) {
      this.tl.to(
        document.getElementsByClassName('subject-image')[
          this.currentSlideNumber
        ],
        0.8,
        { right: '-100%' }
      );
    }
  }
  resetAutoPlay(){
    clearInterval(this.autoplay);
    //this.autoplay = setInterval(this.autoplayStart.bind(this), this.autoplayDelay);
  }
  onSwipeMove(position, event) {

    this.resetAutoPlay();
    if (this.inProgress) {
      document.getElementById('svgWave').getElementsByTagName('line')[0].style.display = 'none'
      return true;
    }
    if (position === 'left' && this.currentSlideNumber !== 5) {
      if (this.currentSlideNumber === 4 || this.currentSlideNumber === 5) {
        document
          .getElementById('svgWave')
          .getElementsByTagName('path')[0]
          .setAttribute('fill', `rgba(0,0,0,0)`);
        return;
      }
      this.animateWave(this.currentSlideNumber + 1);
    } else if(position === 'right' && this.currentSlideNumber !== 0) {
      this.animateWave(this.currentSlideNumber - 1);
    }
    //return true;
  }
  append4Section(){
    document
    .getElementById('svgWave')
    .getElementsByTagName('path')[0]
    .setAttribute('fill', `rgba(0,0,0,0)`);
    var currentNlock = document.getElementsByClassName('blackSection')[0];
    var blackSec = currentNlock.cloneNode(true);
    var three = document.getElementsByClassName('slick-slide')[3].getElementsByTagName('div')[0];
    var threeSec = three.getElementsByClassName('section')[0];
    // Вставляем sp1 перед sp2
    three.insertBefore(blackSec, threeSec);
    currentNlock.getElementsByClassName('blackSection__slideLeft')[0].classList += ' blackSection__slideLeft-anim';
    blackSec.getElementsByClassName('blackSection__slideLeft')[0].classList += ' blackSection__slideLeft-anim';
    setTimeout(()=>{
      this.sliderRef.current.slickGoTo(4);
    },2000)
    //this.sliderRef.current.slickGoTo(4);
    // document.getElementsByClassName('slick-dots-custom')[0].id = 'dotsBlack';
    // document.getElementsByTagName('header')[0].id = 'logoWgite';
    // this.currentSlideNumber = 4;
  }
  preNext() {
    // if(this.currentSlideNumber === 3) {

    //   this.append4Section();
    //   return;
    // }
    if (this.currentSlideNumber <= 3) {
      this.animateWave(this.currentSlideNumber + 1);
      this.animateText(this.currentSlideNumber, 'next');
      this.animateImage();
      setTimeout(() => {
        this.sliderRef.current.slickNext();
      }, 800);
    } else {
      this.sliderRef.current.slickNext();
    }
  }
  manageClick(index) {
    clearInterval(this.autoplay);
    if (index === 4 || index === 5) {
      document
        .getElementById('svgWave')
        .getElementsByTagName('path')[0]
        .setAttribute('fill', `rgba(0,0,0,0)`);
    }
    debugger;
    if (index >= 4) {
      document.getElementsByClassName('slick-dots-custom')[0].id = 'dotsBlack';
      document.getElementsByTagName('header')[0].id = 'logoWgite';
    } else if (index < 4) {
      document.getElementsByClassName('slick-dots-custom')[0].id = 'null';
      document.getElementsByTagName('header')[0].id = 'logoBlac';
    }    
    this.sliderRef.current.slickGoTo(index);
    this.animateWave(index);
    
  }
  manageActiveClass(index){
    let arr = Array.from( document.getElementsByClassName('slick-dots-custom')[0].getElementsByTagName('li') );

    arr.forEach(item=>{item.classList = ''});

    document.getElementsByClassName('slick-dots-custom')[0].getElementsByTagName('li')[index].classList = 'custom-slick-active'
  }
  beforeChange(oldIndex, newIndex) {
    this.currentSlideNumber = newIndex;
    this.manageActiveClass(this.currentSlideNumber)
    this.resetAutoPlay();
    if(this.isMobile && this.currentSlideNumber === 0) {
      return;
    }
    if(this.isMobile){
      if (this.currentSlideNumber >= 4) {
        document.getElementsByClassName('slick-dots-custom')[0].id = 'dotsBlack';
        document.getElementsByTagName('header')[0].id = 'logoWgite';
      } else if (this.currentSlideNumber < 4) {
        document.getElementsByClassName('slick-dots-custom')[0].id = 'null';
        document.getElementsByTagName('header')[0].id = 'logoBlac';
      }
      this.setState({
        animateTextDirection: 'fromLeft'
      });
    }
  }
  afterChange(index) {
    if(this.currentSlideNumber === 4 || this.currentSlideNumber === 5){
      var currentNlock = document.getElementsByClassName('blackSection')[0];
      currentNlock.getElementsByClassName('blackSection__slideLeft')[0].classList += ' blackSection__slideLeft-anim';
    }
    if(this.currentSlideNumber === 5){
      var currentNlock = document.getElementsByClassName('blackSection')[1];
      currentNlock.getElementsByClassName('blackSection__slideLeft')[0].classList += ' blackSection__slideLeft-anim';
    }
    if(this.isMobile && this.currentSlideNumber === 0) {
      return;
    }
    if (this.currentSlideNumber <= 3) {
      setTimeout(() => {
        this.inProgress = false;
      }, 1000);
    } else {
      this.inProgress = false;
    }
    if (this.currentSlideNumber >= 4) {
      document.getElementsByClassName('slick-dots-custom')[0].id = 'dotsBlack';
      document.getElementsByTagName('header')[0].id = 'logoWgite';
    } else if (this.currentSlideNumber < 4) {
      document.getElementsByClassName('slick-dots-custom')[0].id = 'null';
      document.getElementsByTagName('header')[0].id = 'logoBlac';
    }
    if(this.isMobile){
      return;
    }
    this.setState({
      animateTextDirection: 'fromLeft'
    });
  }
  render() {
    let settings = {
      dots: false,
      arrows: false,
      easing: 'ease-in',
      infinite: false,
      draggable: false,
      swipe: this.isSwipe,
      swipeToSlide: false,
      adaptiveHeight: true,
      touchMove:this.isSwipe,
      //autoplay:true,
      //autoplaySpeed:6000,
      //initialSlide:5,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <>
        <Header isBlackScreen={this.state.isBlackScreen} />
        {isMobile ? <StartWaveMobile id="svgWave" /> : <StartWave id="svgWave" />}
        
        <Slider
          className="custom-slick"
          {...settings}
          afterChange={this.afterChange.bind(this)}
          beforeChange={this.beforeChange.bind(this)}
          onSwipe={this.onSwipeMove.bind(this)}
          ref={this.sliderRef}
        >
          <Section
            title="Теперь вы сами решаете, как использовать оставшиеся гигабайты: делитесь ими с друзьями, родственниками и просто знакомыми."
            header="ДЕЛИТЕСЬ ГИГАБАЙТАМИ"
            btnText="Подробнее"
            hasBg={true}
            image={isMobile ? CoupleMobile : Couple}
            specialID="specialID"
            number={0}
            slickSliderRef={this.sliderRef}
            animateTextDirection={this.state.animateTextDirection}
            currentSlideNumber={this.currentSlideNumber}
          />
          <Section
            title="Не требует дополнительной платы для использования."
            header="Бесплатно и ЛЕГКО"
            btnText="Погнали!"
            hasBg={false}
            image={isMobile ? PigMobile : Pig}
            number={1}
            slickSliderRef={this.sliderRef}
            animateTextDirection={this.state.animateTextDirection}
            currentSlideNumber={this.currentSlideNumber}
            icon={<Ball ref={this.BallRef} className="iconSec" />}
          />
          <Section
            title="Услуга доступна автоматически на открытых тарифах «Мой Tele2»"
            header="Не надо ничего подключать"
            btnText="Погнали!"
            hasBg={false}
            image={isMobile ? RobotMobile : Robot}
            number={2}
            slickSliderRef={this.sliderRef}
            animateTextDirection={this.state.animateTextDirection}
            currentSlideNumber={this.currentSlideNumber}
            icon={<Connect ref={this.ConnectRef} className="iconSec" />}
          />
          <Section
            title="Передавайте пакет интернета от 1 ГБ до 30 ГБ. Переданный пакет гигабайт действует 7 дней, но можно продлить и до 30 дней."
            header="делись со всеми tele2 друзьями"
            btnText="Погнали!"
            hasBg={false}
            image={isMobile ? GirlsMobile : Girls}
            number={3}
            slickSliderRef={this.sliderRef}
            animateTextDirection={this.state.animateTextDirection}
            currentSlideNumber={this.currentSlideNumber}
            icon={<Onhand ref={this.OnhandRef} className="iconSec" />}
          />
          <BlackSection
            header="воспользуйтесь прямо сейчас"
            upperText="быстрая команда:"
            textMark="*155*номер абонента#"
            text="Например: *155*9264799231#"
            btn={[
              {
                text: 'В приложении Мой Tele2',
                id: '1'
              },
              {
                text: 'В личном кабинете',
                id: '2'
              }
            ]}
          />
          <BlackSection2
            body={[
              {
                id: '1',
                headerText: 'подключайся к теле2',
                text: 'На любой тариф линейки “Мой Tele2”',
                buttons: [
                  {
                    text: 'Выбрать тариф',
                    id: '1'
                  }
                ]
              },
              {
                id: '2',
                headerText: 'стань абонентом',
                text:
                  'Подключись к Tele2 с новым номером или перенеси свой. Это займет не более 5 минут.',
                buttons: [
                  {
                    text: 'Выбрать новый номер',
                    id: '1'
                  },
                  {
                    text: 'Перейти со своим',
                    id: '2'
                  }
                ]
              }
            ]}
          />
        </Slider>
        <div className="slick-dots-custom">
        <ul>
          <li onClick={this.manageClick.bind(this,0)}></li>
          <li onClick={this.manageClick.bind(this,1)}></li>
          <li onClick={this.manageClick.bind(this,2)}></li>
          <li onClick={this.manageClick.bind(this,3)}></li>
          <li onClick={this.manageClick.bind(this,4)}></li>
          <li onClick={this.manageClick.bind(this,5)}></li>
        </ul></div>
        {isMobile ? null : <Footer />}
      </>
    );
  }
}
