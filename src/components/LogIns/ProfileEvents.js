import React, { useEffect, useContext, useState } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import API from '../../services/API';

export default function ProfileEvents() {
  const { userLogged } = useContext(LoginContext);
  const [fetchEvents, setFetchEvents] = useState([]);

  useEffect(() => {
    API.get(`/order/user/${userLogged.id}`).then((res) => {
      setFetchEvents(res.data);
      console.log(res);
    });
  }, []);

  return (
    <>
      <div>
        <div className="event-columns">
          <div className="upcoming-events">
            <h3>Événements à venir</h3>
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) > Date.parse(new Date())
              )
              .map((futureOrder) => {
                return (
                  <div className="upcoming-events-cards">
                    <p key={futureOrder.order_id}>{futureOrder.title}</p>
                    <p>{futureOrder.date}</p>
                    {/* <div onClick={selectToRate}>Évaluez cet événement</div>
                    {goToRatings ? <div>hey</div> : ''} */}
                  </div>
                );
              })}
          </div>
          <div>
            <span className="vertical-line" />
          </div>

          <div className="past-events">
            <h3>Événements passés</h3>
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) < Date.parse(new Date())
              )
              .map((futureOrder) => {
                return (
                  <div>
                    <p key={futureOrder.order_id}>{futureOrder.title}</p>
                    <p>{futureOrder.date}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
