import React, { useMemo } from 'react';

const SeatMap = ({ selectedSeats, setSelectedSeats }) => {
  
  const seats = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      isBooked: Math.random() < 0.25 
    }));
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return; 

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  return (
    <div className="seat-map-container">
      <h3 style={{ color: 'var(--text)' }}>Оберіть місця:</h3>
      <div className="seat-grid">
        {seats.map(seat => {
          let seatClass = 'seat free'; 
          if (seat.isBooked) seatClass = 'seat booked'; 
          if (selectedSeats.includes(seat.id)) seatClass = 'seat selected'; 

          return (
            <button
              key={seat.id}
              className={seatClass}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.isBooked}
            >
              {seat.id}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;