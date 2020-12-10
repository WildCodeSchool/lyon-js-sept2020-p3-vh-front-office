import React, { useState, useCallback } from "react";
import { Carousel } from "3d-react-carousal";
import WineModal from "./WineModal";
import "./Wines.scss";

const winesList = [
  {
    id: 1,
    image:
      "https://medias.nicolas.com/media/sys_master/images/h41/h90/9020507750430.png",
    vintage: "Vintage 2014",
    grape_variety: "Syrah",
    winemaker: "Pierre",
    wine_waiter: "John",
    winery: "Château Patache d’Aux",
    aromas: "Fruits rouges",
    specificities: "",
    price: "10",
    producer_url: "http://www.google.fr",
  },
  {
    id: 2,
    image:
      "https://medias.nicolas.com/media/sys_master/hff/hd4/9224492711966.png",
    vintage: "Vintage 2015",
    grape_variety: "Pinot",
    winemaker: "Thomas",
    wine_waiter: "Brieuc",
    winery: "Château Machin",
    aromas: "Orange",
    specificities: "Blablabla",
    price: "8",
    producer_url: "http://www.google.fr",
  },
  {
    id: 3,
    image:
      "https://medias.nicolas.com/media/sys_master/images/h07/h92/9169233117214.png",
    vintage: "Vintage 2016",
    grape_variety: "Muscat",
    winemaker: "Matthieu",
    wine_waiter: "Aymeric",
    winery: "Château Truc",
    aromas: "Cuir",
    price: "15",
    producer_url: "http://www.google.fr",
  }
];

const Wines = () => {
  const [wineClicked, setWineClicked] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleClick = useCallback ((wineId) => {
    setModalShow(true);
    setWineClicked(wineId);
  }, []);
  


  return (
    <>
      {wineClicked && (
        <WineModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          winedata={winesList.filter((wine) => wine.id === wineClicked)}
        />
      )}
      <main className="wines">
        <h1>Les vins dégustés</h1>
        < CarrouselWrapper winesList={winesList} handleClick={handleClick}/>
      </main>
    </>
  );
};

const CarrouselWrapper = React.memo(({handleClick, winesList}) => {
  return (
    <Carousel
          slides={winesList.map((wine) => (
            <>
            <img src={wine.image} alt={wine.image} onClick={(event) => handleClick(wine.id)}/>
            <p>{wine.winery}</p>
            </>
          ))}
          autoplay={false}
        />
  )
})

export default Wines;
