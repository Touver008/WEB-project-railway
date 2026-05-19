import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BookingService } from '../services/BookingService';

const BookingForm = ({ trainId, selectedSeats }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "ПІБ є обов'язковим";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "ПІБ має містити мінімум 3 символи";
    }

    const phoneRegex = /^(?:\+38)?(0\d{9})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон є обов'язковим";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Введіть коректний номер (напр. +380501234567)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Введіть коректний email адресу";
    }

    if (selectedSeats.length === 0) {
      toast.error('Будь ласка, оберіть хоча б одне місце на схемі!');
      return false; 
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; 
    }

    const result = BookingService.saveBooking({
      trainId,
      seats: selectedSeats,
      user: formData
    });

    if (result.success) {
      toast.success('Квитки успішно заброньовано!');
      setFormData({ name: '', phone: '', email: '' });
      setTimeout(() => navigate('/'), 2000); 
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form className="train-container booking-form" onSubmit={handleSubmit}>
      <h3 className="step-heading">Оформлення квитка</h3>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="ПІБ"
          className={`search-input ${errors.name ? 'input-error' : ''}`}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          placeholder="Телефон (+380...)"
          className={`search-input ${errors.phone ? 'input-error' : ''}`}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className="form-group last">
        <input
          type="email"
          placeholder="Email"
          className={`search-input ${errors.email ? 'input-error' : ''}`}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <button type="submit" className="counter" style={{ width: '100%' }}>
        Підтвердити бронювання
      </button>
    </form>
  );
};

export default BookingForm;