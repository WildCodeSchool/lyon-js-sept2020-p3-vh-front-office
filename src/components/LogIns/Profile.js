/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import './Profile.scss';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Check, Edit } from 'react-feather';
import { LoginContext } from '../Contexts/LoginContext';
import API from '../../services/API';
import FacebookIcon from '../../files/facebook.png';
import TwitterIcon from '../../files/twitter.png';
import InstagramIcon from '../../files/instagram.png';

export default function Profile() {
  const [fetchedUser, setFetchedUser] = useState([]);
  const { userLogged, setUserLogged } = useContext(LoginContext);
  const history = useHistory();
  const { addToast } = useToasts();
  const [isClicked, setIsClicked] = useState(false);
  const [changeFirstname, setChangeFirstname] = useState('');
  const [changeLastname, setChangeLastname] = useState('');
  const [changePhoneNumber, setChangePhoneNumber] = useState('');
  const [changeEmail, setChangeEmail] = useState('');
  const [fetchEvents, setFetchEvents] = useState([]);

  const useStyles = makeStyles({
    root: {
      justifyContent: 'space-around',
      width: '100%',
      '& span': {
        color: '#3c434c',
      },
    },
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const logout = async () => {
    try {
      await API.get('auth/logout');
      history.push('/login');
      addToast('Vous avez bien été deconnecté', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/login');
      setUserLogged(null);
    } catch (err) {
      addToast("Vous n'avez pas été déconnecté", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (value === 2) {
      logout();
    }
  }, [value]);

  useEffect(() => {
    if (fetchedUser.length !== 0) {
      setChangeFirstname(fetchedUser.firstname);

      setChangeLastname(fetchedUser.lastname);
      setChangePhoneNumber(fetchedUser.phone_number);
      setChangeEmail(fetchedUser.email);
    }
  }, [fetchedUser]);

  useEffect(() => {
    API.get('/me').then((res) => {
      setUserLogged(res.data);
      setFetchedUser(res.data);
    });
  }, []);

  const clickToEdit = () => {
    setIsClicked(true);
  };

  const changeFirstNameInput = (e) => {
    setChangeFirstname(e.target.value);
  };

  const changeLastNameInput = (e) => {
    setChangeLastname(e.target.value);
  };

  const changePhoneNumberInput = (e) => {
    setChangePhoneNumber(e.target.value);
  };

  const changeEmailInput = (e) => {
    setChangeEmail(e.target.value);
  };

  const handleUpdatedInformation = () => {
    API.put(`/users/${fetchedUser.id}`, {
      firstname: changeFirstname,
      lastname: changeLastname,
      phone_number: changePhoneNumber,
      email: changeEmail,
    }).then((res) => {
      setFetchedUser(res.data);
    });
  };

  useEffect(() => {
    API.get(`/order/user/${userLogged.id}`).then((res) => {
      setFetchEvents(res.data);
      console.log(res);
    });
  }, []);

  const clickToSave = () => {
    setIsClicked(false);
    handleUpdatedInformation();
  };

  const buttonStyle = {
    width: '4vw',
    height: '100%',
    fill: '#8c0226',
  };

  return fetchedUser.length !== 0 ? (
    <main className="profile">
      <h1>Bienvenue {userLogged.firstname} !</h1>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Mes informations"
          icon={<PersonIcon style={buttonStyle} />}
        />
        <BottomNavigationAction
          label="Mes événements"
          icon={<VisibilityIcon style={buttonStyle} />}
        />
        <BottomNavigationAction
          label="Me déconnecter"
          icon={<ExitToAppIcon style={buttonStyle} />}
        />
      </BottomNavigation>
      {value === 0 ? (
        <>
          <div className="photo-fields">
            <div>
              {isClicked ? (
                <div>
                  <div className="main-fields">
                    <div>
                      Prénom:
                      <input
                        name="firstname"
                        value={changeFirstname}
                        onChange={changeFirstNameInput}
                      />
                    </div>

                    <div>
                      Nom:
                      <input
                        name="lastname"
                        value={changeLastname}
                        onChange={changeLastNameInput}
                      />
                    </div>

                    <div>
                      Teléphone:
                      <input
                        name="phone_number"
                        value={changePhoneNumber}
                        onChange={changePhoneNumberInput}
                      />
                    </div>

                    <div>
                      Email:
                      <input
                        name="email"
                        value={changeEmail}
                        onChange={changeEmailInput}
                      />
                    </div>

                    {/* {fetchedUser.bio && (
                <p className="bio">
                  Ma présentation <br /> {fetchedUser.bio}
                </p>
              )} */}
                  </div>
                  <div>
                    <button
                      className="button"
                      type="submit"
                      method="put"
                      action="/me"
                      onClick={clickToSave}
                    >
                      Sauvegarder mes données
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="main-fields">
                    <p>Prénom : {changeFirstname}</p>
                    <p>Nom : {changeLastname}</p>
                    <p>Téléphone : {changePhoneNumber}</p>
                    <p>Email : {changeEmail}</p>
                    {/* {fetchedUser.bio && (
                <p className="bio">
                  Ma présentation <br /> {fetchedUser.bio}
                </p>
              )} */}
                    {/* {userLogged.photo_url && (
          <img
            className="profile-image"
            src={userLogged.photo_url}
            alt={userLogged.lastname}
            style={{ width: 'auto' }}
          />
        )} */}
                  </div>
                  <button
                    className="button"
                    type="submit"
                    onClick={clickToEdit}
                  >
                    Modifier mes données
                  </button>
                </div>
              )}
            </div>
          </div>

          {fetchedUser.instagram_url ||
          fetchedUser.twitter_url ||
          fetchedUser.facebook_url
            ? fetchedUser.facebook_url && (
                // eslint-disable-next-line react/jsx-indent
                <section className="social-networks">
                  {fetchedUser.instagram_url && (
                    <a href={fetchedUser.instagram_url} target="blank">
                      <img src={InstagramIcon} alt="Instagram" />
                    </a>
                  )}
                  {fetchedUser.twitter_url && (
                    <a href={fetchedUser.twitter_url} target="blank">
                      <img src={TwitterIcon} alt="Twitter" />
                    </a>
                  )}
                  {fetchedUser.facebook_url && (
                    <a href={fetchedUser.facebook_url} target="blank">
                      <img src={FacebookIcon} alt="Facebook" />
                    </a>
                  )}
                </section>
              )
            : null}
        </>
      ) : (
        <div>
          <div className="event-columns">
            Evénements à venir
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) > Date.parse(new Date())
              )
              .map((futureOrder) => {
                return (
                  <div className="upcoming-events">
                    <p key={futureOrder.order_id}>{futureOrder.title}</p>
                    <p>{futureOrder.date}</p>
                  </div>
                );
              })}
            <div>
              <span className="vertical-line" />
            </div>
            Evénements passés
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) < Date.parse(new Date())
              )
              .map((futureOrder) => {
                return (
                  <div className="upcoming-events">
                    <p key={futureOrder.order_id}>{futureOrder.title}</p>
                    <p>{futureOrder.date}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </main>
  ) : (
    'Chargement ...'
  );
}
