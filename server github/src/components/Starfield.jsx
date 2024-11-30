import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const StarField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls for dragging and zooming
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 50;

    // Generate random stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      starVertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
      starVertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
      starVertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const randomStars = new THREE.Points(starGeometry, starMaterial);
    scene.add(randomStars);

    // Add specific stars with labels
    const labeledStars = [
      { position: [50, 50, 50], name: "Sirius" },
      { position: [-30, -20, 60], name: "Betelgeuse" },
      { position: [80, -50, -40], name: "Rigel" },
    ];

    labeledStars.forEach((star) => {
      // Create star geometry for specific stars
      const starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffd700 }) // Golden color for labeled stars
      );
      starMesh.position.set(...star.position);

      // Create label using canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1024; // Increase width for better text clarity
      canvas.height = 256; // Increase height for better text clarity
      const context = canvas.getContext('2d');

      context.font = '200px Arial'; // Larger font size
      context.fillStyle = 'white';
      context.textAlign = 'center'; // Center the text
      context.textBaseline = 'middle';
      context.fillText(star.name, canvas.width / 2, canvas.height / 2); // Centered text

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter; // Smooth scaling
      texture.magFilter = THREE.LinearFilter; // Smooth scaling
      texture.needsUpdate = true;



      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(...star.position);
      label.position.y -= 5; // Offset label below the star
      label.scale.set(20, 2.5, 1); // Adjust label size

      // Add the star and label to the scene
      scene.add(starMesh);
      scene.add(label);
    });

    // Set camera position
    camera.position.z = 5;

    // Track user interaction
    let isUserInteracting = false;

    // Event listeners to detect when the user starts/stops interacting
    controls.addEventListener('start', () => {
      isUserInteracting = true;
    });

    controls.addEventListener('end', () => {
      isUserInteracting = false;
    });

    // Animation loop
    const animate = () => {
      if (!mountRef.current) return;
      requestAnimationFrame(animate);

      // Rotate random stars only if the user isn't interacting
      if (!isUserInteracting) {
        randomStars.rotation.y += 0.001; // Subtle rotation
      }

      controls.update(); // Keep OrbitControls smooth
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      controls.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default StarField;
