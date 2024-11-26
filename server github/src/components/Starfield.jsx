import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer to the DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      if (!mountRef.current) return; // Avoid animation after unmount
      requestAnimationFrame(animate);
      stars.rotation.y += 0.001; // Rotate starfield
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      // Remove renderer from DOM
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);

      // Dispose of resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      // Remove event listeners
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default StarField;

