import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import './Basket.scss';
import moment from 'moment';
import API from '../../services/API';

const bookedEvents = [
  {
    id: 1,
    quantity: 1,
  },
  {
    id: 2,
    quantity: 1,
  },
];

localStorage.setItem('events', JSON.stringify(bookedEvents));

export default function Basket(props) {
  const [basketDetails, setBasketDetails] = useState([]);

  useEffect(() => {
    JSON.parse(localStorage.getItem('events')).forEach((event) =>
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

  const deleteEvent = () => {
    ///
  };

  const deleteBasket = () => {
    localStorage.removeItem('events');
  };

  const sendOrder = () => {
    axios.post(
      `https://new-app-form.herokuapp.com/order?apiKey=${window.apiKey}`,
      basketDetails
    );
    axios.put(
      `https://ouestcovid-back.herokuapp.com/api/events/`,
      basketDetails
    );
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket`);
    // setIsLoading(true);
    setTimeout(() => {
      props.history.push('/store');
    }, 5000);
  };

  const setQuantity = (quantity, id) => {
    JSON.parse(localStorage.events).find(
      (thing) => thing.id === id
    ).quantity = quantity;

    console.log(quantity, id);
    console.log(JSON.parse(localStorage.events));
  };

  return (
    <>
      <div className="basket">
        <h1>Votre panier</h1>{' '}
        <Button
          className={`button-empty-basket ${useStyles().button}`}
          onClick={() => props.history.push('/store')}
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
                      value={
                        JSON.parse(localStorage.events).find(
                          (thing) => thing.id === 1
                        ).quantity
                      }
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setQuantity(parseInt(e.target.value, 10), event.id);
                        // setIsLoading(true);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {parseInt(event.price, 10)}€
                  </TableCell>
                  <TableCell align="center">
                    {JSON.parse(localStorage.events).find(
                      (thing) => thing.id === 1
                    ).quantity * event.price}
                    €
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
