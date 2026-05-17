import React from 'react';

const WagonSelector = ({ selectedWagon, setSelectedWagon }) => {
  const wagons = [
    { id: 1, number: '01', type: 'Купе', price: 650 },
    { id: 2, number: '02', type: 'Люкс', price: 1200 },
    { id: 3, number: '03', type: 'Плацкарт', price: 350 },
    { id: 4, number: '04', type: 'Плацкарт', price: 350 },
  ];

  return (
    <div className="train-container booking-form">
      <h3 className="step-heading">Крок 1: Оберіть вагон</h3>
      
      <div className="wagons-grid">
        {wagons.map((wagon) => {
          const isSelected = selectedWagon?.id === wagon.id;
          
          return (
            <button
              key={wagon.id}
              onClick={() => setSelectedWagon(wagon)}
              className={`counter wagon-btn ${isSelected ? 'selected' : ''}`}
            >
              <strong>Вагон {wagon.number}</strong>
              <div className="wagon-btn-details">
                {wagon.type} • {wagon.price} грн
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WagonSelector;