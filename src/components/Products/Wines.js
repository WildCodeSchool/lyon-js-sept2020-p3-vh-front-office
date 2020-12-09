import { Carousel } from "3d-react-carousal";
import './Wines.scss'

const slides = [
  <img
    src="https://medias.nicolas.com/media/sys_master/images/h41/h90/9020507750430.png"
    alt="1"
  />,
  <img
    src="https://medias.nicolas.com/media/sys_master/images/h41/h90/9020507750430.png"
    alt="2"
  />,
  <img
    src="https://medias.nicolas.com/media/sys_master/hff/hd4/9224492711966.png"
    alt="3"
  />,
  <img
    src="https://medias.nicolas.com/media/sys_master/images/hd8/hfc/9080062509086.png"
    alt="4"
  />,
  <img
    src="https://medias.nicolas.com/media/sys_master/images/hf4/hff/9214340857886.png"
    alt="5"
  />,
];

const Wines = () => {
  return (
    <main className="wines">
      <h1>Les vins dégustés</h1>
      <Carousel slides={slides} autoplay={false} />
    </main>
  );
};

export default Wines;
