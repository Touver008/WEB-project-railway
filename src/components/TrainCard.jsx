import React from 'react';
import { Link } from 'react-router-dom';

const TrainCard = ({ train }) => {
  const calculateDuration = (departure, arrival) => {
  const depDate = new Date(departure);
  const arrDate = new Date(arrival);
  const diffMs = arrDate - depDate;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} год ${minutes} хв`;
  };
  return (
    <div className="train-container">
      <div className="train-info">
        <h3 className="train-number">Потяг {train.number}</h3>
        <p className="train-route">
          <strong>Маршрут:</strong> {train.departureCity} — {train.arrivalCity}
        </p>
        <p>
          <strong>Відправлення:</strong> {new Date(train.departureTime).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            })}
        </p>
        <p>
          <strong>Прибуття:</strong> {new Date(train.arrivalTime).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            })}
        </p>
        <p>
          <strong>Час у дорозі:</strong> {calculateDuration(train.departureTime, train.arrivalTime)}
        </p>
      </div>

      <div>
        <Link to={`/booking/${train.id}`}>
        <button className="counter">Вибрати місця</button>
        </Link>
      </div>

    </div>
  );
};

export default TrainCard;