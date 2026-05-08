import React, { useState } from 'react';
import { trains } from '../data/trains';
import TrainCard from './TrainCard';

const TrainList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrains = trains.filter((train) => {
    const term = searchTerm.toLowerCase();
    return (
      train.number.toLowerCase().includes(term) ||
      train.departureCity.toLowerCase().includes(term) ||
      train.arrivalCity.toLowerCase().includes(term)
    );
  });

  return (
    <div className="train-list-container">
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Пошук за маршрутом або номером потяга..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredTrains.length > 0 ? (
        filteredTrains.map((train) => (
          <TrainCard key={train.id} train={train} />
        ))
      ) : (
        <p className="no-results">
          За вашим запитом потягів не знайдено.
        </p>
      )}

    </div>
  );
};

export default TrainList;