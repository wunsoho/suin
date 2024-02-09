import React, { useState, useRef } from 'react';
import './Camera.css';

const CameraModal = () => {
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const closeCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const capturedImage = canvas.toDataURL('image/png');
    console.log('Captured Image:', capturedImage);
  };

  return (
    <div>
      <button onClick={openCamera}>Open Camera</button>
      {isCameraOpen && (
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={captureImage}>Capture</button>
          <button onClick={closeCamera}>Close Camera</button>
        </div>
      )}
    </div>
  );
};

export default CameraModal;