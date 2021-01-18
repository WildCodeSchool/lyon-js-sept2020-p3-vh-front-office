import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './Basket.scss';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../../services/API';
import { BasketContext } from '../Contexts/BasketContext';
import { LoginContext } from '../Contexts/LoginContext';

export default function Basket(props) {
  const { basket, setBasket } = useContext(BasketContext);
  const [basketDetails, setBasketDetails] = useState([]);
  const { userLogged } = useContext(LoginContext);

  useEffect(() => {
    basket.forEach((event) =>
      API.get(`events/${event.id}`).then((res) => {
        setBasketDetails((oldArray) => [...oldArray, res.data]);
      })
    );
  }, []);

  const useStyles = makeStyles(() => ({
    button: {
      marginBottom: '30px',
      backgroundColor: '#6d071a',
      color: 'white',
      textTransform: 'none',
      '&$button:hover': {
        backgroundColor: '#6d071a',
      },
      '&$button:focus': {
        outline: 'none',
      },
    },
    input: {
      width: '15%',
    },
  }));

  const classes = useStyles();

  const findQuantity = (event) => {
    if (basket.length !== 0) {
      const valueToUpdate = basket.find((item) => item.id === event.id)
        .quantity;
      return valueToUpdate;
    }
    return null;
  };

  const changeQuantity = (e, id) => {
    const basketToUpdate = [...basket];
    const indexOfEventToUpdate = basketToUpdate.findIndex(
      (item) => item.id === id
    );
    basketToUpdate[indexOfEventToUpdate].quantity = parseInt(
      e.target.value,
      10
    );
    setBasket(basketToUpdate);
  };

  const deleteEvent = (id) => {
    const basketToUpdate = [...basket];
    const filteredBasket = basketToUpdate.filter((item) => item.id !== id);
    setBasket(filteredBasket);
    const basketDetailsToUpdate = [...basketDetails];
    const filteredBasketDetails = basketDetailsToUpdate.filter(
      (item) => item.id !== id
    );
    setBasketDetails(filteredBasketDetails);
  };

  const deleteBasket = () => {
    localStorage.removeItem('events');
    setBasket([]);
    setBasketDetails([]);
  };

  const history = useHistory();
  const { addToast } = useToasts();

  const sendOrder = () => {
    if (userLogged) {
      history.push('/disclaimer');
    } else {
      history.push('/login');
      addToast('Merci de vous connecter pour passer commande.', {
        appearance: 'info',
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <div className="basket">
        <h1>Votre panier</h1>{' '}
        <Button
          className={`button ${classes.button}`}
          onClick={() => props.history.push('/events')}
          variant="contained"
          type="button"
        >
          Retour aux événéments
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Evénement</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Places réservées</TableCell>
                <TableCell align="center">Prix unitaire</TableCell>
                <TableCell align="center">Prix total</TableCell>
                <TableCell align="center">Supprimer l'événément</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basketDetails &&
                basketDetails.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell component="th" scope="row" align="center">
                      {event.title}
                    </TableCell>
                    <TableCell align="center">
                      {moment(event.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        className={classes.input}
                        id="standard-number"
                        type="number"
                        value={
                          basket.find((item) => item.id === event.id) &&
                          findQuantity(event)
                        }
                        InputProps={{
                          inputProps: { min: 1, max: event.availabilities },
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          changeQuantity(e, event.id);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {parseInt(event.price, 10)}€
                    </TableCell>
                    <TableCell align="center">
                      {basket.find((item) => item.id === event.id) &&
                        event.price *
                          basket.find((item) => item.id === event.id).quantity}
                      €
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        className={classes.button}
                        onClick={() => {
                          deleteEvent(event.id);
                        }}
                        variant="contained"
                        type="button"
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="basket-button-container">
          <Button
            className={classes.button}
            style={{ outline: 'none' }}
            onClick={() => {
              sendOrder();
            }}
            variant="contained"
            type="button"
            disabled={basketDetails.length === 0}
          >
            Réserver
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              deleteBasket();
            }}
            variant="contained"
            type="button"
            disabled={basketDetails.length === 0}
          >
            Vider mon panier
          </Button>
        </div>
      </div>
    </>
  );
}
