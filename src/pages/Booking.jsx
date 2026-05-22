import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const { trainId } = useParams();
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Логіка обробки кліку по місцю 
  const handleSeatClick = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleWagonChange = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]); 
  };

  return (
    <main className="min-h-screen py-8 booking-main">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link to="/" className="back-link">
          До розкладу
        </Link>
        
        <div className="title-section">
          <h1 className="vintage-title">Бронювання: {trainId}</h1>
        </div>
      </div>

      <div className="booking-layout" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* КРОК 1: ВИБІР ВАГОНА */}
        <div className="booking-section">
          <span className="section-label">Крок 1: Оберіть вагон</span>
          <WagonSelector 
            selectedWagon={selectedWagon} 
            setSelectedWagon={handleWagonChange} 
          />
        </div>

        {selectedWagon && (
          <>
            {/* КРОК 2: ВИБІР МІСЦЬ (у новій рамці) */}
            <div className="booking-section fade-in">
              <span className="section-label">Крок 2: Оберіть місця ({selectedWagon.type})</span>
              <SeatMap 
                trainId={trainId} 
                wagonId={selectedWagon.id} 
                selectedSeats={selectedSeats}
                onSeatClick={handleSeatClick}
              />
            </div>
            
            {/* КРОК 3: ОФОРМЛЕННЯ */}
            <div className="booking-section fade-in">
              <span className="section-label">Крок 3: Оформлення квитка</span>
              <BookingForm 
                trainId={trainId} 
                wagonNumber={selectedWagon.number} 
                selectedSeats={selectedSeats} 
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Booking;