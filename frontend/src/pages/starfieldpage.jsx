import React from 'react';
import Starfield from '../components/Starfield';
import './Home.css';

const StarfieldPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'white', position: 'absolute', zIndex: 1, top: '20px', width: '100%' }}>
        Drag to Explore the Stars
      </h1>
      <Starfield />
    </div>
  );
};

export default StarfieldPage;
