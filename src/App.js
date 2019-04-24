import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TimelineLite, Power2 } from 'gsap';
import { isMobile } from 'react-device-detect';
import * as Visibility from 'visibilityjs';

import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section/';
import BlackSection from './components/BlackSection';
import BlackSection2 from './components/BlackSection2';
import MobileBtnBlock from './components/MobileBtnBlock';

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
import { ReactComponent as Onhand2 } from './components/img/onhand.svg';


import { ReactComponent as StartWave } from './components/img/startWave.svg';
import { ReactComponent as StartWaveMobile } from './components/img/startWaveMobile.svg';

export default class App extends Component {
  constructor() {
    super();
    this.tl = new TimelineLite();
    this.tlSubject = new TimelineLite();
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
  OnhandRef2 = React.createRef();
  blackSection1Ref = React.createRef();
  blackSection2Ref = React.createRef();
  currentSlideNumber = 0;
  inProgress = true;
  fromFourSlide = false;
  autoplay;
  autoplayDelay = 5000;
  componentDidMount() {
    if(isMobile) {
      this.tl
      .set('.mBth',{opacity:0,immediateRender:true})      
    }
      var body = document.body,
      timer;

      window.addEventListener('scroll', function() {
      clearTimeout(timer);
      if(!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover')
      }

      timer = setTimeout(function(){
      body.classList.remove('disable-hover')
      },500);
      }, false);
      document.getElementById('svgWave').classList += ' initial-animation';
      document.getElementById('specialID').classList +=
      ' initial-animation';
      this.manageActiveClass(0);
    let self = this;
    setTimeout(() => {
      document.getElementsByTagName('body')[0].classList.add('startesSub');
    }, 6000);
    setTimeout(() => {
      self.hideStartScgAnim();
      self.resetAutoPlay();
      self.inProgress = false;
      //document.getElementsByTagName('body')[0].classList.remove('startesSub');
    }, 8000);
  }
  autoplayStart() {
    if (!isMobile && this.currentSlideNumber === 5) {
      this.tl
      .set('.slick-slide',{backgroundColor:'#fff',immediateRender:true})
      .set('.isFourInfoBlock',{opacity:1,immediateRender:true})
      .set('#svgWave',{opacity:1,immediateRender:true})
      .set('.isFour',{opacity:1,immediateRender:true})
      .set(ReactDOM.findDOMNode(this.blackSection2Ref.current),{width:'0%',immediateRender:true})
      .set(ReactDOM.findDOMNode(this.blackSection1Ref.current),{width:'0%',immediateRender:true})
      this.sliderRef.current.slickGoTo(0);
      this.animateWave(0);
      return;
    }
    if(isMobile && this.currentSlideNumber === 5){
      this.tl
      .set('.slick-slide',{backgroundColor:'#fff',immediateRender:true})
      .set('.isFourInfoBlock',{opacity:1,immediateRender:true})
      .set('#svgWave',{opacity:1,immediateRender:true})
      .set('.isFour',{opacity:1,immediateRender:true})
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
  infiniteSubjectImage(){
    this.tlSubject.to('.subject-image', 12, {scale:1.1, repeatDelay:0, repeat:-1, yoyo:true})
    this.tlSubject.play();
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
  goToFour(){
    
    this.sliderRef.current.slickGoTo(4,true);
  }
  goToThree(){
    this.fromFourSlide = true;
    this.sliderRef.current.slickGoTo(3,true);
    this.inProgress = false;
    return;
  }
  prePrev() {
    
    if(this.currentSlideNumber === 5) {
      let self = this;
      this.manageDots();
      this.tl
      .to(ReactDOM.findDOMNode(this.blackSection2Ref.current),.6,{width:'0%',immediateRender:true, onComplete: self.goToFour.bind(self)})
      return;
    }
    if(this.currentSlideNumber === 4) {
      let self = this;
      this.manageDots();
      this.tl
      .set('.slick-slide',{backgroundColor:'#fff',immediateRender:true})
      .set('.isFour',{opacity:1,immediateRender:true})
      .set('#svgWave',{opacity:1,immediateRender:true})
      .set('.isFourInfoBlock',{opacity:1,immediateRender:true})
      .to(ReactDOM.findDOMNode(this.blackSection1Ref.current),.6,{width:'0%',immediateRender:true, onComplete: self.goToThree.bind(self)});
      return;
    }
    this.animateWave(this.currentSlideNumber - 1);
    this.animateText(this.currentSlideNumber, 'next');
    this.animateImage('prev');
    setTimeout(() => {
      this.sliderRef.current.slickPrev();
    }, 800);

  }
  animateImage(direction, nextIndex) {




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
  
    if(nextIndex){

    this.tl
      .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber],0.8,{ right: '200%' })
      // .set(document.getElementsByClassName('subject-image')[nextIndex],{ right: '200%',immediateRender:true })
      .to(document.getElementsByClassName('subject-image')[nextIndex],0.8,{ right: '0%' });     
      return;
    }

    if (this.currentSlideNumber < 3) {
      this.tl
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber],0.8,{ right: '-100%' })
        .set(document.getElementsByClassName('subject-image')[this.currentSlideNumber + 1],{ right: '200%' })
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber + 1],0.8,{ right: '0%' });
    }
    if (this.currentSlideNumber === 3) {
      this.tl
        .to(document.getElementsByClassName('subject-image')[this.currentSlideNumber],0.8,{ right: '-100%' });
    }
  }
  resetAutoPlay(){

    Visibility.stop(this.autoplay);
    //this.autoplay = Visibility.every(this.autoplayDelay, this.autoplayStart.bind(this) );

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
  preNext() {
   
    if(this.currentSlideNumber === 4) {
      //this.tl.to('.subject-image',{scale:1});

      if(isMobile){
        this.sliderRef.current.slickGoTo(5);
        return;
      } else {
        this.sliderRef.current.slickGoTo(5, true);
      }
      this.tl
      .set(ReactDOM.findDOMNode(this.blackSection1Ref.current),{width:'0%',immediateRender:true})
      return;
    }
    if(this.currentSlideNumber === 3){
      if(isMobile){
        this.sliderRef.current.slickGoTo(4);
      } else {
        this.sliderRef.current.slickGoTo(4, true);
      }
      return;
    }
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
  fadeOutWave(){
    document
    .getElementById('svgWave')
    .getElementsByTagName('path')[0]
    .setAttribute('fill', `rgba(0,0,0,0)`);
  }
  manageClick(index) {
    if(index === this.currentSlideNumber){
      return;
    }
    if(this.inProgress) {
      return;
    }
    this.resetAutoPlay();

      if(isMobile && index === 4 ){
        this.sliderRef.current.slickGoTo(4);
        return;
      }
      if(isMobile && index === 5 ){
        this.fromFourSlide = true;
        this.sliderRef.current.slickGoTo(5);
        return;
      }
      if(isMobile) {
        this.tl
        .set('#svgWave',{opacity:1,immediateRender:true})
        this.sliderRef.current.slickGoTo(index);
        this.animateWave(index);
        this.animateImage(null, index);
        this.manageDots();
        return;       
      }


    if(index === 4 ) {
      this.sliderRef.current.slickGoTo(4,true);
      this.tl
      .set('.slick-slide',{backgroundColor:'#000',immediateRender:true})
      .set('#svgWave',{opacity:0,immediateRender:true})
      .set('.isFourInfoBlock',{opacity:0,immediateRender:true})
      .set('.isFour',{opacity:0,immediateRender:true})
      .set(ReactDOM.findDOMNode(this.blackSection2Ref.current),{width:'0%',immediateRender:true})
      .to(ReactDOM.findDOMNode(this.blackSection1Ref.current),.8,{width:'100%',immediateRender:true})
      this.setState({
        animateTextDirection: 'initial'
      });
      this.manageDots();
      return;
    } else if (index === 5) {
      this.sliderRef.current.slickGoTo(5,true);
      this.tl
        .set('.slick-slide',{backgroundColor:'#000',immediateRender:true})
        .set('.isFourInfoBlock',{opacity:0,immediateRender:true})
        .set('#svgWave',{opacity:0,immediateRender:true})
        .set('.isFour',{opacity:0,immediateRender:true})
        .set(ReactDOM.findDOMNode(this.blackSection1Ref.current),{width:'0%',immediateRender:true})
        .to(ReactDOM.findDOMNode(this.blackSection2Ref.current),.8,{width:'100%',immediateRender:true})
        this.setState({
          animateTextDirection: 'initial'
        });
        this.manageDots();
      return;
    } else {
      this.tl
      .set('.slick-slide',{backgroundColor:'#fff',immediateRender:true})
      .set('.isFourInfoBlock',{opacity:1,immediateRender:true})
      .set('#svgWave',{opacity:1,immediateRender:true})
      .set('.isFour',{opacity:1,immediateRender:true})
      .set(ReactDOM.findDOMNode(this.blackSection2Ref.current),{width:'0%',immediateRender:true})
      .set(ReactDOM.findDOMNode(this.blackSection1Ref.current),{width:'0%',immediateRender:true})
      this.setState({
        animateTextDirection: 'sttart'
      });
      
      this.sliderRef.current.slickGoTo(index);
      this.animateWave(index);
      this.animateImage(null, index);
      this.manageDots();
    }
  }
  manageActiveClass(index){
    let arr = Array.from( document.getElementsByClassName('slick-dots-custom')[0].getElementsByTagName('li') );
    arr.forEach(item=>{item.classList = ''});
    document.getElementsByClassName('slick-dots-custom')[0].getElementsByTagName('li')[index].classList = 'custom-slick-active'
  }
  manageDots(){
    if (this.currentSlideNumber >= 4) {
      document.getElementsByClassName('slick-dots-custom')[0].id = 'dotsBlack';
      document.getElementsByTagName('header')[0].id = 'logoWgite';
    } else if (this.currentSlideNumber < 4) {
      document.getElementsByClassName('slick-dots-custom')[0].id = 'null';
      document.getElementsByTagName('header')[0].id = 'logoBlac';
    }
  }
  beforeChange(oldIndex, newIndex) {
    this.currentSlideNumber = newIndex;
    this.manageActiveClass(this.currentSlideNumber)
    this.resetAutoPlay();
    // if(this.isMobile && this.currentSlideNumber === 0) {
    //   return;
    // }
    if(isMobile){
      if(this.currentSlideNumber === 0){
        return  ;
      }
      if(this.currentSlideNumber === 4 || this.currentSlideNumber === 5){
        this.tl
        .set('#svgWave',{opacity:0,immediateRender:true})        
      } else {
        this.tl
        .set('#svgWave',{opacity:1,immediateRender:true})  
      }
      if(this.currentSlideNumber === 1 || this.currentSlideNumber === 2 || this.currentSlideNumber === 3 ){
        const $body = document.getElementsByTagName("body")[0];
        // const $appElem = document.getElementById("app");
        // enablePageScroll($appElem);
        //$body.classList.remove("iosFixModal");
        this.tl
        .to('.mBth',.4,{opacity:1,immediateRender:true})    
      } else {
        const $body = document.getElementsByTagName("body")[0];
        //$body.classList.add("iosFixModal");
        this.tl
        .set('.mBth',{opacity:0,immediateRender:true}); 
        this.manageDots();
        if(this.currentSlideNumber === 0){
          this.setState({
            animateTextDirection: 'fromLeft'
          });
        }
        return;
      }
      this.setState({
        animateTextDirection: 'fromLeft'
      });
    }
    this.manageDots();
  }
  lock(){
    this.inProgress = true;
    setTimeout(() => {
      this.inProgress = false;
    }, 1000);
  }
  afterChange(index) {
    if(this.fromFourSlide){
      this.fromFourSlide = false;
      this.manageDots();
      this.resetAutoPlay();
      return;
    }
    if(!isMobile && this.currentSlideNumber === 4){
      this.tl
      .to(ReactDOM.findDOMNode(this.blackSection1Ref.current),.8,{width:'100%',immediateRender:true})
      .set('.isFourInfoBlock',{opacity:0})
      .set('.isFour',{opacity:0})
      .set('.slick-slide',{backgroundColor:'#000'});
      this.lock();
      this.manageDots();
      return;
    }
    if(!isMobile && this.currentSlideNumber === 5){
      this.tl
        .set('#svgWave',{opacity:0,immediateRender:true})
        .to(ReactDOM.findDOMNode(this.blackSection2Ref.current),.8,{width:'100%',immediateRender:true});
      this.lock();
      return;
    }

    if(this.isMobile && this.currentSlideNumber === 0) {
      return;
    }
    if (this.currentSlideNumber <= 3) {
      this.lock();
    } else {
      this.inProgress = false;
    }
    this.manageDots();
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
        {isMobile ? <MobileBtnBlock text={'Погнали'} /> : null}
        {isMobile ? <StartWaveMobile id="svgWave" /> : <StartWave id="svgWave" />}
        {isMobile ? null : <BlackSection
          header="воспользуйтесь прямо сейчас"
          ref={this.blackSection1Ref}
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
        />}
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
          {isMobile ? (
              <BlackSection
                header="воспользуйтесь прямо сейчас"
                ref={this.blackSection1Ref}
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
          ) : (
            <Section
              title="Передавайте пакет интернета от 1 ГБ до 30 ГБ. Переданный пакет гигабайт действует 7 дней, но можно продлить и до 30 дней."
              header="делись со всеми tele2 друзьями"
              btnText="Погнали!"
              hasBg={false}
              image={isMobile ? GirlsMobile : Girls}
              number={4}
              slickSliderRef={this.sliderRef}
              animateTextDirection={'nothing'}
              currentSlideNumber={this.currentSlideNumber}
              icon={<Onhand2 ref={this.OnhandRef2} className="iconSec" />}>
            </Section>
          ) }
          <BlackSection2
            ref={this.blackSection2Ref}
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
