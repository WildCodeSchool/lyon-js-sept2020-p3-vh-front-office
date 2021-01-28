import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import './WineModal.scss';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    lineHeight: 1.5,
    outline: 0,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: ' #3c434c',
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 'auto',
    width: '50%',
    marginBottom: '10px',
    marginTop: '10px',
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
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeIcon: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  title: {
    marginRight: '10px',
  },
}));

export default function WineModal(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { show, onHide } = props;
  const { winedata } = props;
  const {
    producteur,
    name,
    vigneron,
    cepage,
    sommelier,
    arome,
    specificities,
    price,
    image,
    website,
  } = winedata;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={show}
        onClose={onHide}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={classes.paper}>
            <div className={classes.modalHeader}>
              <h1 id="transition-modal-title" className={classes.title}>
                {producteur} - {t('WinesModals.title')} {name}
              </h1>
              <CloseIcon className={classes.closeIcon} onClick={onHide} />
            </div>

            <div className={classes.modalBody}>
              <p id="transition-modal-description">
                {t('WinesModals.p1')} : {vigneron} <br />
                {t('WinesModals.p2')} : {cepage} <br />
                {sommelier && `Sommelier : ${sommelier} `}
                <br />
                {t('WinesModals.p4')} : {cepage} <br />
                {t('WinesModals.p5')} : {arome} <br />
                {specificities && (
                  <>
                    {t('WinesModals.p6')} : {specificities}
                    <br />
                  </>
                )}
                {t('WinesModals.p6')} : {price} € <br />
              </p>
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}
                alt={producteur}
              />
            </div>
            <Button
              variant="contained"
              className={classes.button}
              target="_blank"
              onClick={onHide}
              href={website}
            >
              {t('WinesModals.button')}
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
