import React from 'react';
import TrainList from '../components/TrainList';

const Home = () => {
  return (
    <main className="home-main">
      <div className="title-section">
        <h1 className="vintage-title">Розклад потягів</h1>
      </div>
      <TrainList />
    </main>
  );
};

export default Home;