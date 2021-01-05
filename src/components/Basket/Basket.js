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
import API from '../../services/API';
import { BasketContext } from '../Contexts/BasketContext';

export default function Basket(props) {
  const { basket, setBasket } = useContext(BasketContext);
  const [basketDetails, setBasketDetails] = useState([]);

  useEffect(() => {
    basket.forEach((event) =>
      API.get(`events/${event.id}`).then((res) => {
        setBasketDetails((oldArray) => [...oldArray, res.data]);
      })
    );
  }, []);

  const useStyles = makeStyles(() => ({
    button: {
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
  }));

  const changeQuantity = (e, event) => {
    const basketToUpdate = [...basket];
    const indexOfEventToUpdate = basketToUpdate.findIndex(
      (item) => item.id === event.id
    );
    basketToUpdate[indexOfEventToUpdate].quantity = parseInt(
      e.target.value,
      10
    );
    setBasket(basketToUpdate);
  };

  const findQuantity = (event) => {
    const valueToUpdate = basket.find((item) => item.id === event.id).quantity;
    return valueToUpdate;
  };

  const deleteEvent = () => {
    ///
  };

  const deleteBasket = () => {
    localStorage.removeItem('events');
  };

  const sendOrder = () => {
    ///
  };

  // const setQuantity = () => {

  // };

  return (
    <>
      <div className="basket">
        <h1>Votre panier</h1>{' '}
        <Button
          className={`button-empty-basket ${useStyles().button}`}
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
              {basketDetails.map((event) => (
                <TableRow key={event.id}>
                  <TableCell component="th" scope="row" align="center">
                    {event.title}
                  </TableCell>
                  <TableCell align="center">
                    {moment(event.date).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-number"
                      type="number"
                      value={findQuantity(event)}
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        changeQuantity(e, event);
                        // setIsLoading(true);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {parseInt(event.price, 10)}€
                  </TableCell>
                  <TableCell align="center">
                    {event.price *
                      basket.find((item) => item.id === event.id).quantity}€
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        deleteEvent(event.id);
                        // setIsLoading(true);
                      }}
                      variant="contained"
                      style={{
                        backgroundColor: '#6d071a',
                        color: 'white',
                        textTransform: 'none',
                        outline: 'none',
                      }}
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
        <div className="basket-button">
          <Button
            className={useStyles().button}
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
            className={`button-empty-basket ${useStyles().button}`}
            onClick={() => {
              deleteBasket();
              // setIsLoading(true);
            }}
            variant="contained"
            type="button"
          >
            Vider mon panier
          </Button>
        </div>
      </div>
    </>
  );
}
