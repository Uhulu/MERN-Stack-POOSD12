import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import starData from '../data/star_data.json';

const StarField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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

    // Add named stars from imported data
    const addNamedStars = () => {
      const labeledStars = starData.flatMap(constellation =>
        constellation.stars.map(star => ({
          position: star.position,
          name: star.name,
          magnitude: star.magnitude
        }))
      );

      labeledStars.forEach((star) => {
        const starSize = Math.max(0.5, 5 - star.magnitude);

        const starMesh = new THREE.Mesh(
          new THREE.SphereGeometry(starSize, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffd700 })
        );
        starMesh.position.set(...star.position);

        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        const context = canvas.getContext('2d');

        context.font = '200px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(star.name, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        const labelMaterial = new THREE.SpriteMaterial({ map: texture });
        const label = new THREE.Sprite(labelMaterial);
        label.position.set(...star.position);
        label.position.y -= 5;
        label.scale.set(20, 2.5, 1);

        scene.add(starMesh);
        scene.add(label);
      });
    };

    if (starData.length > 0) {
      addNamedStars();
    }

    camera.position.set(0, 0, 5);

    // Handle camera movement with WASD keys (moving along world axes)
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const moveSpeed = 0.1; // Speed of movement

    const onKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW': direction.z = -1; break; // Move forward
        case 'KeyS': direction.z = 1; break;  // Move backward
        case 'KeyA': direction.x = -1; break; // Move left
        case 'KeyD': direction.x = 1; break;  // Move right
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'KeyS': direction.z = 0; break;
        case 'KeyA':
        case 'KeyD': direction.x = 0; break;
      }
    };

    // Handle camera rotation with Arrow keys (local rotation)
    const rotateSpeed = 0.02;
    const rotation = new THREE.Euler(0, 0, 0, 'YXZ'); // For controlling the camera's rotation

    const onArrowKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp': rotation.x -= rotateSpeed; break; // Rotate up
        case 'ArrowDown': rotation.x += rotateSpeed; break; // Rotate down
        case 'ArrowLeft': rotation.y -= rotateSpeed; break; // Rotate left
        case 'ArrowRight': rotation.y += rotateSpeed; break; // Rotate right
      }
    };

    const onArrowKeyUp = (event) => {
      // No specific action on key release for the arrows, since it's not continuous rotation
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onArrowKeyDown);
    document.addEventListener('keyup', onArrowKeyUp);

    // Animation loop
    const animate = () => {
      if (!mountRef.current) return;
      requestAnimationFrame(animate);

      // Update camera position based on WASD input (movement along world axes)
      velocity.x = direction.x * moveSpeed;
      velocity.z = direction.z * moveSpeed;
      camera.position.add(velocity); // Apply velocity to camera position

      // Update camera rotation based on arrow key input (local rotation)
      camera.rotation.set(rotation.x, rotation.y, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onArrowKeyDown);
      document.removeEventListener('keyup', onArrowKeyUp);
    };
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default StarField;
