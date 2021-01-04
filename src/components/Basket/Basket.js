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
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    JSON.parse(localStorage.getItem('events')).forEach((event) =>
      API.get(`events/${event.id}`).then((res) => {
        setBasket((oldArray) => [...oldArray, res.data]);
      })
    );
  }, []);

  console.log(basket);

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

  const deleteEvent = (id) => {
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket/${id}`);
  };

  const deleteBasket = () => {
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket`);
  };

  const sendOrder = () => {
    axios.post(
      `https://new-app-form.herokuapp.com/order?apiKey=${window.apiKey}`,
      basket
    );
    axios.put(`https://ouestcovid-back.herokuapp.com/api/events/`, basket);
    axios.delete(`https://ouestcovid-back.herokuapp.com/api/basket`);
    // setIsLoading(true);
    setTimeout(() => {
      props.history.push('/store');
    }, 5000);
  };

  const setQuantity = (quantity, id) => {
    console.log(quantity);
    console.log(id);
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
          Retour à la boutique
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
                <TableCell align="center">Supprimer le produit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((event) => (
                <TableRow key={event.id}>
                  <TableCell component="th" scope="row" align="center">
                    {event.title}
                  </TableCell>
                  <TableCell align="center">{event.date}</TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-number"
                      type="number"
                      value={event.quantity}
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
                    {parseInt(event.quantity, 10) * parseInt(event.price, 10)}€
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
            disabled={basket.length === 0}
          >
            Envoyer ma commande
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
