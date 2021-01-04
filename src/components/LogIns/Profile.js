import React, { useEffect, useContext } from 'react';
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
    } catch (err) {
      addToast("Vous n'avez pas été déconnecté", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    API.get('/me').then((res) => setUserLogged(res.data));
  }, []);

  useEffect(() => {
    if (value === 2) {
      logout();
    }
  }, [value]);

  const buttonStyle = {
    width: '4vw',
    height: '100%',
    fill: '#8c0226',
  };

  return userLogged.length !== 0 ? (
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
          {userLogged.photo_url && (
            <img src={userLogged.photo_url} alt={userLogged.lastname} />
          )}
          {userLogged.firstname && <p>Prénom : {userLogged.firstname}</p>}
          {userLogged.lastname && <p>Nom : {userLogged.lastname}</p>}
          {userLogged.phone_number && (
            <p>Mon numéro de téléphone : {userLogged.phone_number}</p>
          )}
          {userLogged.email && <p>Mon adresse mail : {userLogged.email}</p>}
          {userLogged.bio && (
            <p className="bio">
              Ma présentation <br /> {userLogged.bio}
            </p>
          )}
          <section className="social-networks">
            {userLogged.instagram_url && (
              <a href={userLogged.instagram_url} target="blank">
                <img src={InstagramIcon} alt="Instagram" />
              </a>
            )}
            {userLogged.twitter_url && (
              <a href={userLogged.twitter_url} target="blank">
                <img src={TwitterIcon} alt="Twitter" />
              </a>
            )}
            {userLogged.facebook_url && (
              <a href={userLogged.facebook_url} target="blank">
                <img src={FacebookIcon} alt="Facebook" />
              </a>
            )}
          </section>
        </>
      ) : (
        <h1>Mes événements</h1>
      )}
    </main>
  ) : (
    'Chargement ...'
  );
}
