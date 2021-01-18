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
      localStorage.removeItem('user');
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
    API.get('/me').then((res) => {
      setUserLogged(res.data);
      setFetchedUser(res.data);
    });
  }, []);

  const buttonStyle = {
    width: '4vw',
    height: '100%',
    fill: '#8c0226',
  };

  return fetchedUser.length !== 0 ? (
    <main className="profile">
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
          <h1>Bienvenue {userLogged.firstname} !</h1>
          <div className="photo-fields">
            {fetchedUser.photo_url && (
              <img
                className="profile-image"
                src={fetchedUser.photo_url}
                alt={fetchedUser.lastname}
              />
            )}
            <div className="main-fields">
              {fetchedUser.firstname && <p>Prénom : {fetchedUser.firstname}</p>}
              {fetchedUser.lastname && <p>Nom : {fetchedUser.lastname}</p>}
              {fetchedUser.phone_number && (
                <p>Mon numéro de téléphone : {fetchedUser.phone_number}</p>
              )}
              {fetchedUser.email && (
                <p>Mon adresse mail : {fetchedUser.email}</p>
              )}
              {fetchedUser.bio && (
                <p className="bio">
                  Ma présentation <br /> {fetchedUser.bio}
                </p>
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
        <h1>Mes événements</h1>
      )}
    </main>
  ) : (
    'Chargement ...'
  );
}
