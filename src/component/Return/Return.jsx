import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Back from '../Image/ReserveImage/back.png';
import Img1 from '../Image/ReturnImage/Img1.png';
import Camera1 from '../Image/ReturnImage/Camera1.png';
import * as B from './Return.style';
import NavigationBar from "../Navi/NavigationBar";
import Camera from 'react-camera';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Return() {
  const navigate = useNavigate();
  const cameraRef = useRef();
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [checkList, setCheckList] = useState({
    checkList1: false,
    checkList2: false,
    checkList3: false,
    checkList4: false,
  });
  const handleGoBack = () => {
    navigate('/');
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photoBlob = await cameraRef.current.capture();
        const photo = URL.createObjectURL(photoBlob);
        setCapturedPhotos((prevPhotos) => [...prevPhotos, photo]);
      } catch (error) {
        console.error('사진 촬영 에러:', error);
      }
    }
  };

  const handleCheckListToggle = (listName) => {
    setCheckList((prevCheckList) => ({
      ...prevCheckList,
      [listName]: !prevCheckList[listName],
    }));
  };
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    margin: 20, // 간격 조절
  };


  useEffect(() => {
    console.log('Captured Photos:', capturedPhotos);
  }, [capturedPhotos]);

  return (
    <div className="ReturnBody">
      <B.Back>
        <button onClick={handleGoBack} className="Backbutton">
          <img src={Back} alt="뒤로가기" />
        </button>
        <div className="title">반납하기</div>
      </B.Back>
      <B.ReturnContainer>
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
            {capturedPhotos.map((photo, index) => (
              <div key={index} style={{ maxWidth: '10vw' }}>
                <img className ="capture"
                  key={index}
                  src={photo}
                  alt={`촬영한 사진 ${index + 1}`}
                  style={{
                    width: '20vw',
                    height: 'auto',
                    border: '1px solid #ccc',
                    marginBottom: '10px',
                  }}
                />
              </div>
            ))}
          </Slider>
          {capturedPhotos.length < 5 && (
            <Camera
              ref={cameraRef}
              style={{
                width: '10vw',
                height: '10vh',
                border: '1px solid #ccc',
              }}
            />
          )}
          <button onClick={handleTakePhoto} className="cabutton">
            <img className="caImg" src={Camera1} alt="카메라" />
            <div className="caTitle">반납 사진 촬영</div>
          </button>
        </B.container2>
      </B.ReturnContainer>
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
}

export default Return;