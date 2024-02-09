import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as B from './Return.style';
import Back from '../Image/ReserveImage/back.png';
import Img1 from '../Image/ReturnImage/Img1.png';
import NavigationBar from "../Navi/NavigationBar";
import Slider from 'react-slick';

const Return = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [checkList, setCheckList] = useState({
    checkList1: false,
    checkList2: false,
    checkList3: false,
    checkList4: false,
  });

  const handleGoBack = () => {
    navigate('/');
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      const newPhotos = Array.from(selectedFiles).slice(0, 5).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
        });
      });

      Promise.all(newPhotos).then((results) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...results]);
      });
    }
  };

  const openCamera = () => {
    document.getElementById('photoFile').click();
  };

  const handleCheckListToggle = (listName) => {
    setCheckList((prevCheckList) => ({
      ...prevCheckList,
      [listName]: !prevCheckList[listName],
    }));
  };

  return (
    <div className="ReturnBody">
      <B.Back>
        <button onClick={handleGoBack} className="Backbutton">
          <img src={Back} alt="뒤로가기" />
        </button>
        <div className="title">반납하기</div>
      </B.Back>
      <B.container1>
          <B.imageContainer>
            <img src={Img1} alt="반납 대표 사진" />
            <div className="Imgtitle">반납 사진 등록하기</div>
          </B.imageContainer>
          <div className="Info">
            <div className="InfoTitle">열린 열람실</div>
            <div>이용일 2023-12-24<br />이용시간 9:00~13:00</div>
          </div>
        </B.container1>
      <B.container2>
        <Slider {...sliderSettings}>
          {photos.map((photo, index) => (
            <div key={index}>
              <img
                src={photo}
                alt={`Selected ${index}`}
                style={{
                  width: '20vw',
                  height: '15vh',
                  border: '0.2vw solid #ccc',
                  marginBottom: '0.5vh',
                }}
              />
            </div>
          ))}
        </Slider>
        <input
          type="file"
          name="photoFile"
          id="photoFile"
          accept="image/*"
          capture="camera"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />
        <br />
        <button className="cab" value="반납 사진 촬영" onClick={openCamera} />
      </B.container2>
      <br />
      <div id="result"></div>
      <B.CheckContainer>
        <div className="title">
          <div className="Info1">잠깐, 반납하기 전 확인하셨나요?</div>
          <div className="Info2">체크리스트를 작성하여 반납 전 다시 한 번 체크해보아요.</div>
        </div>
        <div className="check1">
          <input type="checkbox" checked={checkList.checkList1} onChange={() => handleCheckListToggle('checkList1')} />
          <div>소등은 하였나요?</div>
        </div>
        <div className="check2">
          <input type="checkbox" checked={checkList.checkList2} onChange={() => handleCheckListToggle('checkList2')} />
          <div>에어컨/히터는 종료하였나요?</div>
        </div>
        <div className="check3">
          <input type="checkbox" checked={checkList.checkList3} onChange={() => handleCheckListToggle('checkList3')} />
          <div>에어컨/히터는 종료하였나요?</div>
        </div>
        <div className="check4">
          <input type="checkbox" checked={checkList.checkList4} onChange={() => handleCheckListToggle('checkList4')} />
          <div>에어컨/히터는 종료하였나요?</div>
        </div>
      </B.CheckContainer>
      <NavigationBar />
    </div>
  );
};

export default Return;