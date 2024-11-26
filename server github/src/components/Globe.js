import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

const FunSkyMap = () => {
  const globeRef = useRef(); // Reference for the globe container

  useEffect(() => {
    Globe()(globeRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // Globe texture
      .pointsData([
        { lat: 20, lng: 10, size: 0.5, color: 'white', name: 'Star 1' },
        { lat: -40, lng: -70, size: 0.6, color: 'yellow', name: 'Star 2' },
        // Add more points as necessary
      ])
      .pointColor('color') // Customize point color (use property from data)
      .pointAltitude('size') // Customize point size (use property from data)
      .pointRadius(0.5); // Size of points, you can adjust this

  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: '200px', // Adjust size to fit in navbar
        height: '200px', // Adjust height to fit in navbar
      }}
    />
  );
};

export default FunSkyMap;

