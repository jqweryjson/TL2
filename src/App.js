import React, { Component, PureComponent } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TimelineLite, Power2 } from 'gsap';

import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section/';
import BlackSection from './components/BlackSection';
import BlackSection2 from './components/BlackSection2';
import StartWaveComp from './components/StartWaveComp.js';

import Couple from './components/img/couple.png';
import Pig from './components/img/pig.png';
import Robot from './components/img/robot.png';
import Girls from './components/img/girls.png';

import { ReactComponent as Ball } from './components/img/ball.svg';
import { ReactComponent as Connect } from './components/img/connect.svg';
import { ReactComponent as Onhand } from './components/img/onhand.svg';
import { ReactComponent as Wave } from './components/img/wave.svg';


export default class App extends Component {
  constructor() {
    super();
    this.tl = new TimelineLite();
    this.tl.defaultEase = Power2.easeIn;
  }
  state = {
    isBlackScreen: false,
    currentSlideNumber: 0,
    animateTextDirection: null,
    afterChange:null,
    startSVG: true,
    fills: ['#C3E400', '#FF59A3', '#1EE7CA', '#FF6633']
  };
  sliderRef = React.createRef();
  currentSlideNumber = 0;
  inProgress = false;
  svgStarIsOver = false;
  autoplay;
  autoplayDelay = 5000;
  componentDidMount() {
    document.getElementById('svgWave').style.visibility = 'hidden';
    document.getElementsByClassName('subject-image')[0].style.visibility =
      'hidden';
    document.getElementById('startSVG').classList += ' initial-animation';
    document.getElementsByClassName('svgST__image')[0].classList +=
      ' initial-animation';
    window.addEventListener('wheel', event => this.mouseWheelHandler(event), {
      passive: false
    });
    let self = this;
    setTimeout(() => {
      document.getElementById('svgWave').style.visibility = 'visible';
      document.getElementsByClassName('subject-image')[0].style.visibility =
        'visible';
      self.hideStartScgAnim();
    }, 5000);
    this.autoplay = setInterval(this.autoplayStart.bind(this),  this.autoplayDelay);
  }
  autoplayStart(){
    if (this.currentSlideNumber === 5) {
      this.sliderRef.current.slickGoTo(0);
      this.animateWave(0);
      return;
    }
    this.preNext(); 
  }
  hideStartScgAnim() {
    document.getElementById('startSVG').style.display = 'none';
    document.getElementsByClassName('svgST__image')[0].style.visibility =
      'hidden';
    this.svgStarIsOver = true;
  }
  mouseWheelHandler(event) {
    clearInterval(this.autoplay);
    this.autoplay = setInterval(this.autoplayStart.bind(this), this.autoplayDelay);
    if (!this.svgStarIsOver) {
      return false;
    }
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
      animateTextDirection:direction
    })
  }
  animateWave(nextSlideNumber) {
    document
      .getElementById('svgWave')
      .getElementsByClassName('waveAnimation')[0]
      .beginElement();
    if (nextSlideNumber === 4) {
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
          .set(document.getElementsByClassName('subject-image')[this.currentSlideNumber-1],{right:'200%'})
          .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber-1], .8, {right:'0%'})
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
  animateImage(direction){
    if(this.currentSlideNumber === 0){
      this.tl
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber], .8, {right:'-100%'})
        .set(document.getElementsByClassName('subject-image')[this.currentSlideNumber+1],{right:'200%'})
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber+1], .8, {right:'0%'})
        .set(document.getElementsByClassName('subject-image')[this.currentSlideNumber],{right:'0%'})
        return;
    }
    if(direction === 'prev') {
      this.tl
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber], .8, {right:'200%'})
        .set(document.getElementsByClassName('subject-image')[this.currentSlideNumber-1],{right:'200%'})
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber-1], .8, {right:'0%'})
        return;
    }
    if(this.currentSlideNumber < 3){
      this.tl
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber], .8, {right:'-100%'})
        .set(document.getElementsByClassName('subject-image')[this.currentSlideNumber+1],{right:'200%'})
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber+1], .8, {right:'0%'})
    }
    if(this.currentSlideNumber === 3){
      this.tl
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber], .8, {right:'-100%'})
    }
    
  }
  preNext() {
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
  beforeChange(oldIndex, newIndex) {
    this.currentSlideNumber = newIndex;
  }
  afterChange(index) {
    if(this.currentSlideNumber <= 3) {
      setTimeout(()=>{
        this.inProgress = false;
      },1000)
    } else {
      this.inProgress = false;
    }
    this.setState({
      animateTextDirection:'fromLeft'
    })
  }
  render() {
    let settings = {
      dots: true,
      arrows: false,
      easing: 'ease-in-out',
      infinite: false,
      draggable: false,
      swipe: false,
      swipeToSlide: false,
      adaptiveHeight: true,
      //autoplay:true,
      //autoplaySpeed:6000,
      //initialSlide:5,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <React.Fragment>
        <Header isBlackScreen={this.state.isBlackScreen} />
        <Wave id="svgWave" />
        <StartWaveComp />
          <Slider
            className="custom-slick"
            {...settings}
            afterChange={this.afterChange.bind(this)}
            beforeChange={this.beforeChange.bind(this)}
            ref={this.sliderRef}
          >
            <Section
              title="Теперь вы сами решаете, как использовать оставшиеся гигабайты: делитесь ими с друзьями, родственниками и просто знакомыми."
              header="ДЕЛИТЕСЬ ГИГАБАЙТАМИ"
              btnText="Подробнее"
              hasBg={true}
              image={Couple}
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
              image={Pig}
              number={1}
              slickSliderRef={this.sliderRef}
              animateTextDirection={this.state.animateTextDirection}
              currentSlideNumber={this.currentSlideNumber}
              icon={<Ball className="iconSec" />}
            />
            <Section
              title="Услуга доступна автоматически на открытых тарифах «Мой Tele2»"
              header="Не надо ничего подключать"
              btnText="Погнали!"
              hasBg={false}
              image={Robot}
              number={2}
              slickSliderRef={this.sliderRef}
              animateTextDirection={this.state.animateTextDirection}
              currentSlideNumber={this.currentSlideNumber}
              icon={<Connect className="iconSec" />}
            />
            <Section
              title="Передавайте пакет интернета от 1 ГБ до 30 ГБ. Переданный пакет гигабайт действует 7 дней, но можно продлить и до 30 дней."
              header="делись со всеми tele2 друзьями"
              btnText="Погнали!"
              hasBg={false}
              image={Girls}
              number={3}
              slickSliderRef={this.sliderRef}
              animateTextDirection={this.state.animateTextDirection}
              currentSlideNumber={this.currentSlideNumber}
              icon={<Onhand className="iconSec" />}
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
        <Footer />
      </React.Fragment>
    );
  }
}
