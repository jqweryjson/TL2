import React, { Component, PureComponent } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section/';
import BlackSection from './components/BlackSection';
import BlackSection2 from './components/BlackSection2';

import Couple from './components/img/couple.png';
import Pig from './components/img/pig.png';
import Robot from './components/img/robot.png';
import Girls from './components/img/girls.png';


import { ReactComponent as Ball } from './components/img/ball.svg';
import { ReactComponent as Connect } from './components/img/connect.svg';
import { ReactComponent as Onhand } from './components/img/onhand.svg';


export default class App extends Component {
  state = {
    isBlackScreen: false,
    playStartAnimText: true,
    currentSlideNumber: null
  }

  sliderRef = React.createRef();
  componentDidMount() {
    window.addEventListener('wheel', event => this.mouseWheelHandler(event));
  }
  mouseWheelHandler(event){
    //event.preventDefault();
    const delta = event.deltaY;
    if (delta > 0) {

      this.sliderRef.current.slickNext();
    } else {
      this.sliderRef.current.slickPrev();
    }
  }
  beforeChange(oldIndex, newIndex){
    this.setState({
      playStartAnimText:false
    });
  }  
  afterChange(index){

    if(index >= 4) {
      this.setState({
        isBlackScreen:true,
      });
      document.getElementsByClassName('slick-dots')[0].id = 'dotsBlack';

    } else if (index < 4){
      this.setState({
        isBlackScreen:false,
        playStartAnimText:true,
        currentSlideNumber:index
      });
      document.getElementsByClassName('slick-dots')[0].id = null;
    }
  }
  render() {
    var settings = {
      dots: true,
      arrows: false,
      easing:'ease-in-out',
      infinite: false,
      adaptiveHeight:true,
      //initialSlide:5,
      speed: 300,
      slidesToShow: 1,
      //className:'LOH',
      slidesToScroll: 1
    };
    return (
      <React.Fragment>
        <Header isBlackScreen={this.state.isBlackScreen}/>
        <Slider 
          className="custom-slick" {...settings}
          afterChange={this.afterChange.bind(this)}
          beforeChange={this.beforeChange.bind(this)}
          ref={this.sliderRef}>
          <Section
            title="Теперь вы сами решаете, как использовать оставшиеся гигабайты: делитесь ими с друзьями, родственниками и просто знакомыми."
            header="ДЕЛИТЕСЬ ГИГАБАЙТАМИ"
            playStartAnimText={this.state.playStartAnimText}
            btnText="Подробнее"
            hasBg={true}
            canvasId="sec1"
            fill="#C3E400"
            image={Couple}
            number={0}
            currentSlideNumber={this.state.currentSlideNumber}
          />
          <Section
            title="Не требует дополнительной платы для использования."
            header="Бесплатно и ЛЕГКО"
            playStartAnimText={this.state.playStartAnimText}
            btnText="Погнали!"
            hasBg={false}
            canvasId="sec2"
            fill="#FF59A3"
            image={Pig}
            number={1}
            currentSlideNumber={this.state.currentSlideNumber}
            icon={<Ball  className="iconSec"/>}
          />
          <Section
            title="Услуга доступна автоматически на открытых тарифах «Мой Tele2»"
            header="Не надо ничего подключать"
            playStartAnimText={this.state.playStartAnimText}
            btnText="Погнали!"
            hasBg={false}
            canvasId="sec3"
            fill="#1EE7CA"
            image={Robot}
            number={2}
            currentSlideNumber={this.state.currentSlideNumber}
            icon={<Connect  className="iconSec"/>}
          />
          <Section
            title="Передавайте пакет интернета от 1 ГБ до 30 ГБ. Переданный пакет гигабайт действует 7 дней, но можно продлить и до 30 дней."
            header="делись со всеми tele2 друзьями"
            btnText="Погнали!"
            playStartAnimText={this.state.playStartAnimText}
            hasBg={false}
            canvasId="sec4"
            fill="#FF6633"
            image={Girls}
            number={3}
            currentSlideNumber={this.state.currentSlideNumber}
            icon={<Onhand className="iconSec" />}
          />
          <BlackSection 
            header="воспользуйтесь прямо сейчас"
            upperText="быстрая команда:"
            textMark="*155*номер абонента#"
            text="Например: *155*9264799231#"
            btn={[
              {
                text:'В приложении Мой Tele2',
                id:'1'
              },
              {
                text:'В личном кабинете',
                id:'2'
              }
            ]}
          />
          <BlackSection2 
            body={[
              {
                id:'1',
                headerText:'подключайся к теле2',
                text:'На любой тариф линейки “Мой Tele2”',
                buttons:[
                  {
                    text:'Выбрать тариф',
                    id:'1',
                  }
                ]
              },{
                id:'2',
                headerText:'стань абонентом',
                text:'Подключись к Tele2 с новым номером или перенеси свой. Это займет не более 5 минут.',
                buttons:[
                  {
                    text:'Выбрать новый номер',
                    id:'1',
                  },
                  {
                    text:'Перейти со своим',
                    id:'2',
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
