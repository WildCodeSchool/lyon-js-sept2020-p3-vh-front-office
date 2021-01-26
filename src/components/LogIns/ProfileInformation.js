import React, { useEffect, useContext, useState } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import API from '../../services/API';

export default function ProfileInformation() {
  const { userLogged, setUserLogged } = useContext(LoginContext);

  const [isClicked, setIsClicked] = useState(false);
  const [changeFirstname, setChangeFirstname] = useState('');
  const [changeLastname, setChangeLastname] = useState('');
  const [changePhoneNumber, setChangePhoneNumber] = useState('');
  const [changeEmail, setChangeEmail] = useState('');

  useEffect(() => {
    if (userLogged.length !== 0) {
      setChangeFirstname(userLogged.firstname);

      setChangeLastname(userLogged.lastname);
      setChangePhoneNumber(userLogged.phone_number);
      setChangeEmail(userLogged.email);
    }
  }, [userLogged]);

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
    API.put(`/users/${userLogged.id}`, {
      firstname: changeFirstname,
      lastname: changeLastname,
      phone_number: changePhoneNumber,
      email: changeEmail,
    }).then((res) => {
      setUserLogged(res.data);
    });
  };

  const clickToEdit = () => {
    setIsClicked(true);
  };

  const clickToSave = () => {
    setIsClicked(false);
    handleUpdatedInformation();
  };

  return (
    <div>
      {' '}
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
              <button className="button" type="submit" onClick={clickToEdit}>
                Modifier mes données
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
