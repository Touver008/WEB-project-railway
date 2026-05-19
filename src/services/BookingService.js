export const BookingService = {
  getBookings: () => {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  },

  saveBooking: (bookingData) => {
    try {
      const existingBookings = BookingService.getBookings();
      const newBooking = {
        id: Date.now(), 
        createdAt: new Date().toISOString(),
        ...bookingData
      };
      
      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      return { success: true, booking: newBooking };
    } catch (error) {
      console.error("Помилка при збереженні бронювання:", error);
      return { success: false, error: "Не вдалося зберегти бронювання" };
    }
  }
};