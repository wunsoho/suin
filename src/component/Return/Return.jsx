import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as B from './Return.style';
import Back from '../Image/ReserveImage/back.png';
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
            setPhotos(results);
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
            <Slider {...sliderSettings}>
            {photos.map((photo, index) => (
                <div key={index}>
                <img
                  src={photo}
                  alt={`Selected ${index}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    border: '1px solid #ccc',
                    marginBottom: '10px',
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
            <input type="button" value="카메라" onClick={openCamera} />
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
        <NavigationBar/>
        </div>
    );
};

export default Return;