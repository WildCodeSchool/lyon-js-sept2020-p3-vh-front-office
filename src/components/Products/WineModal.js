import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from 'react-bootstrap';
import './WineModal.scss';

function WineModal(props) {
  const useStyles = makeStyles(() => ({
    button: {
      width: '50%',
      marginBottom: '10px',
      backgroundColor: '#8C0226',
      color: 'white',
      textTransform: 'none',
      outline: 'none',
      border: 'none',
      '&$button:hover': {
        backgroundColor: '#8C0226',
        color: 'white',
      },
      '&$button:focus': {
        outline: 'none',
      },
    },
  }));

  const {
    winery,
    vintage,
    winemaker,
    grapeVariety,
    wineWaiter,
    aromas,
    specificities,
    price,
    image,
    producerUrl,
    onHide,
    // eslint-disable-next-line react/destructuring-assignment
  } = props.winedata[0];

  return (
    <div>
      <Modal
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="county-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {winery} - Cuvée {vintage}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Vigneron : {winemaker} <br />
            Cépages(s) : {grapeVariety} <br />
            {wineWaiter && `Sommelier : ${wineWaiter} `}
            <br />
            Cépages(s) : {grapeVariety} <br />
            Arôme(s) : {aromas} <br />
            {specificities && (
              <>
                Spécificités : {specificities}
                <br />
              </>
            )}
            Prix indicatif : {price} € <br />
          </div>
          <img src={image} alt={winery} />
        </Modal.Body>
        <Button
          variant="contained"
          className={useStyles().button}
          target="_blank"
          onClick={onHide}
          href={producerUrl}
        >
          Me rendre sur le site du producteur
        </Button>
      </Modal>
    </div>
  );
}

export default WineModal;
