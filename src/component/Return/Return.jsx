import React, { useState } from 'react';

const CameraApp = () => {
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPhoto(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const openCamera = () => {
    document.getElementById('photoFile').click();
  };

  return (
    <div>
      <p>핸드폰에서 확인해야 함!!</p>
      <img src={photo} alt="Selected" style={{ width: '100px', height: '100px', display: photo ? 'inline' : 'none' }} />
      <input type="file" name="photoFile" id="photoFile" accept="image/*" capture="camera" onChange={handleFileChange} style={{ display: 'none' }} />
      <br />
      <input type="button" value="카메라" onClick={openCamera} />
      <br />
      <div id="result"></div>
    </div>
  );
};

export default CameraApp;