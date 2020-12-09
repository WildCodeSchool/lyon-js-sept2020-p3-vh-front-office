import { Carousel } from "3d-react-carousal";
import "./Wines.scss";

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

const winesList = [
  {
    image:
      "https://medias.nicolas.com/media/sys_master/images/h41/h90/9020507750430.png",
    vintage: "Nostrud dolore Lorem magna magna labore.",
    grape_variety: "Nostrud dolore Lorem magna magna labore.",
    winemaker: "Nostrud dolore Lorem magna magna labore.",
    wine_waiter: "Nostrud dolore Lorem magna magna labore.",
    winery: "Nostrud dolore Lorem magna magna labore.",
    aromas: "Nostrud dolore Lorem magna magna labore.",
    specificities: "Nostrud dolore Lorem magna magna labore.",
    price: "10",
  },
  {
    image:
      "https://medias.nicolas.com/media/sys_master/images/h41/h90/9020507750430.png",
    vintage: "Nostrud dolore Lorem magna magna labore.",
    grape_variety: "Nostrud dolore Lorem magna magna labore.",
    winemaker: "Nostrud dolore Lorem magna magna labore.",
    wine_waiter: "Nostrud dolore Lorem magna magna labore.",
    winery: "Nostrud dolore Lorem magna magna labore.",
    aromas: "Nostrud dolore Lorem magna magna labore.",
    specificities: "Nostrud dolore Lorem magna magna labore.",
    price: "15",
  },
];

console.log(slides);
console.log(winesList.map((wine) => <img src={wine.image} />));

const Wines = () => {
  return (
    <main className="wines">
      <h1>Les vins dégustés</h1>
      <Carousel
        slides={winesList.map((wine) => (
          <img src={wine.image} alt={wine.image} />
        ))}
        autoplay={false}
      />
    </main>
  );
};

export default Wines;
