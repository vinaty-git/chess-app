// import logo from './logo.svg';
// import './App.css';
import PlayerList from './components/PlayerListC';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carouselImages = [
  `${process.env.PUBLIC_URL}/carousel/carousel0.png`,
  `${process.env.PUBLIC_URL}/carousel/carousel1.jpg`,
  `${process.env.PUBLIC_URL}/carousel/carousel2.jpg`,
  `${process.env.PUBLIC_URL}/carousel/carousel3.jpg`,
];

function App() {
  return (
    <div className="App">

      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>

      <div className="carousel-header">
        <Carousel
          useKeyboardArrows={true}
          autoPlay={true}
          interval={15000}
          showThumbs={false}
          showStatus={false}
        >
          {carouselImages.map((URL, index) => (
            <div className="slide">
              <img alt="sample_file" src={URL} key={index} />
            </div>
          ))}
        </Carousel>
      </div>

      <PlayerList />
      
    </div>
  );
}

export default App;
