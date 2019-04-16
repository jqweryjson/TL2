import React, { Component } from 'react';
import ReactPageScroller from 'react-page-scroller';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section/';
import BlackSection from './components/BlackSection';

import Couple from './components/img/couple.png';
import Pig from './components/img/pig.png';
import Robot from './components/img/robot.png';
import Girls from './components/img/girls.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    this._pageScroller = null;
  }

  goToPage = eventKey => {
    this._pageScroller.goToPage(eventKey);
  };

  pageOnChange = number => {
    this.setState({ currentPage: number });
  };

  getPagesNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(
        <div key={i} eventKey={i - 1} onSelect={this.goToPage}>
          {i}
        </div>
      );
    }

    return [...pageNumbers];
  };
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
  render() {
    const pagesNumbers = this.getPagesNumbers();
    var settings = {
      dots: true,
      arrows: false,
      infinite: false,
      adaptiveHeight:true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <React.Fragment>
        <Header />
        <Slider className="custom-slick" {...settings} ref={this.sliderRef}>
          <Section
            title="Теперь вы сами решаете, как использовать оставшиеся гигабайты: делитесь ими с друзьями, родственниками и просто знакомыми."
            header="ДЕЛИТЕСЬ ГИГАБАЙТАМИ"
            btnText="Подробнее"
            hasBg={true}
            canvasId="sec1"
            fill="#C3E400"
            image={Couple}
          />
          <Section
            title="Не требует дополнительной платы для использования."
            header="Бесплатно и ЛЕГКО"
            btnText="Погнали!"
            hasBg={false}
            canvasId="sec2"
            fill="#FF59A3"
            image={Pig}
          />
          <Section
            title="Услуга доступна автоматически на открытых тарифах «Мой Tele2»"
            header="Не надо ничего подключать"
            btnText="Погнали!"
            hasBg={false}
            canvasId="sec3"
            fill="#1EE7CA"
            image={Robot}
          />
          <Section
            title="Передавайте пакет интернета от 1 ГБ до 30 ГБ. Переданный пакет гигабайт действует 7 дней, но можно продлить и до 30 дней."
            header="делись со всеми tele2 друзьями"
            btnText="Погнали!"
            hasBg={false}
            canvasId="sec4"
            fill="#FF6633"
            image={Girls}
          />
          {/* <BlackSection /> */}
        </Slider>
        <Footer />
      </React.Fragment>
    );
  }
}
