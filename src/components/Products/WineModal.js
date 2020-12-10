import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button } from "react-bootstrap";
import "./WineModal.scss";

function WineModal(props) {
  const useStyles = makeStyles(() => ({
    button: {
      width: "50%",
      marginBottom: "10px",
      backgroundColor: "#8C0226",
      color: "white",
      textTransform: "none",
      outline: "none",
      border: "none",
      "&$button:hover": {
        backgroundColor: "#8C0226",
        color: "white",
      },
      "&$button:focus": {
        outline: "none",
      },
    },
  }));

  const wine = props.winedata[0];

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="county-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {wine.winery} - Cuvée {wine.vintage}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Vigneron : {wine.winemaker} <br />
            Cépages(s) : {wine.grape_variety} <br />
            {wine.wine_waiter && `Sommelier : ${wine.wine_waiter} `}
            <br />
            Cépages(s) : {wine.grape_variety} <br />
            Arôme(s) : {wine.aromas} <br />
            {wine.specificities && (
              <>
                Spécificités : {wine.specificities}
                <br />
              </>
            )}
            Prix indicatif : {wine.price} € <br />
          </div>
          <img src={wine.image} alt={wine.winery} />
        </Modal.Body>
        <Button
          variant="contained"
          className={useStyles().button}
          target="_blank"
          onClick={props.onHide}
          href={wine.producer_url}
        >
          Me rendre sur le site du producteur
        </Button>
      </Modal>
    </div>
  );
}

export default WineModal;
