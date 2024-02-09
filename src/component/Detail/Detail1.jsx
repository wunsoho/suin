import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import * as B from './Detail1.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fac_detail1 from '../Image/DetailImage/fac_detail1.png';
import NextArrow_img from '../Image/DetailImage/NextArrow.png';
import PrevArrow_img from '../Image/DetailImage/PrevArrow.png';
import Map from '../Detail/Map';

function Detail1() {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const [facilityData, setFacilityData] = useState(null);
  const [reservationStatus] = useState(false);

  const settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const settings2 = {
    infinite: false,
    speed: 500, 
    slidesToShow: 1 ,
    slidesToScroll: 1,
    centerMode : true,
};
  const fac_detailData = [
    { id: 1, poster_path: fac_detail1 },
    { id: 2, poster_path: fac_detail1 },
    { id: 3, poster_path: fac_detail1 },
    { id: 4, poster_path: fac_detail1 },
    { id: 5, poster_path: fac_detail1 },
  ];
  const AVR_RATE = 82;
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (AVR_RATE * 70) / 100;
        let idx = 0;
        while (starVerScore > 14) {
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };
    useEffect(() => {
        setRatesResArr(calcStarRates())
    }, [])
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
  
        if (scrollPosition >= pageHeight) {
          console.log('스크롤이 페이지 끝에 도달했습니다!');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const onClickButton1 = () => {
      if (reservationStatus) {
        console.log('예약 반납 중');
      } else {
        navigate(`/status`);
      }
    };

    const onClickButton2 = () => {
      if (reservationStatus) {
        console.log('예약 연장 중');
      } else {
        navigate(`/facility/${id}/reserve1`, {
          state: {
            buildingName: facilityData.buildingName,
            name: facilityData.name,
            location: facilityData.location,
            id: id,
          },
        });
      }
    };
    const onClickReviewButton = () => {
      navigate(`/review`);
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dW5zb2hvQG1haWwudWxzYW4uYWMua3IiLCJlbWFpbCI6Ind1bnNvaG9AbWFpbC51bHNhbi5hYy5rciIsImlhdCI6MTcwNzQ2ODQ3NiwiZXhwIjoxNzA3NDc1Njc2fQ.b9C91GdiPssz_GMsElcynDbk6HTEtJNDzLZTT4muvig';
          const response = await fetch(`http://13.125.247.248:8080/api/v1/facility/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setFacilityData(data.result);
          } else {
            console.error('Failed to fetch facility data');
          }
        } catch (error) {
          console.error('Error fetching facility data:', error);
        }
      };
  
      fetchData();
    }, [id]);
  return (
    <B.Body>
      <B.ImageSlider>
        <Slider {...settings1}>
          {fac_detailData.map((item) => (
            <div key={item.id}>
              <div className="slide-container">
                <img className = "img" src={item.poster_path} alt={`facility${item.id}`} />
              </div>
            </div>
          ))}
        </Slider>
      </B.ImageSlider>
      <B.All>
        <B.TextContainer>
          <B.TitleText>{facilityData && facilityData.buildingName}</B.TitleText>
          <B.Number>{facilityData && facilityData.name}</B.Number>
          <B.Time>이용가능시간 {facilityData && facilityData.time}</B.Time>
        </B.TextContainer>
        <B.ReviewWrap>
          <B.StarRateWrap>
              {STAR_IDX_ARR.map((item, idx) => {
                  return <span className='star_icon' key={`${item}_${idx}`}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='7' height='10' viewBox='0 0 14 13' fill='#cacaca'>
                          <clipPath id={`${item}StarClip`}>
                              <rect width={`${ratesResArr[idx]}`} height='10' />
                          </clipPath>
                          <path
                              id={`${item}Star`}
                              d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                              transform='translate(-2 -2)'
                          />
                          <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#FFBE55'
                          />
                      </svg>
                  </span>
              })
              }
              <B.StarText>4.1</B.StarText>
          </B.StarRateWrap>
          <B.ReviewButton>
            <button className = "button1" onClick = {onClickReviewButton}>{'리뷰 86개 전체보기 >'}</button>
          </B.ReviewButton>
        </B.ReviewWrap>
      </B.All>
      <B.ReviewSilder>
        <Slider {...settings2}>
          {facilityData && facilityData.reviews && facilityData.reviews.map((item) => (
            <div key={item.id}>
              <B.ReviewContainer>
                <div className="review-slide">
                  <B.ImageContainer>
                    <img className = "img12" src={item.imageURL} alt={`facility${item.id}`} />
                    <B.ReviewInfo>
                      <div>{item.nickname}</div>
                      <B.ReviewDate>{item.date}</B.ReviewDate>
                    </B.ReviewInfo>
                    <B.StarRateWrap2>
                      {STAR_IDX_ARR.map((item, idx) => {
                          const score = facilityData.reviews && facilityData.reviews.length > 0
                              ? facilityData.reviews.reduce((sum, review) => sum + review.score, 0) / facilityData.reviews.length
                              : 0;
                          const starWidth = (score * 70) / 100;
                          return (
                              <span className='star_icon' key={`${item}_${idx}`}>
                                  <svg xmlns='http://www.w3.org/2000/svg' width='7' height='10' viewBox='0 0 14 13' fill='#cacaca'>
                                      <clipPath id={`${item}StarClip`}>
                                          <rect width={`${starWidth}`} height='10' />
                                      </clipPath>
                                      <path
                                          id={`${item}Star`}
                                          d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                                          transform='translate(-2 -2)'
                                      />
                                      <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#FFBE55'
                                      />
                                  </svg>
                              </span>
                          );
                      })}
                      </B.StarRateWrap2>
                  </B.ImageContainer>
                  <B.ReviewDetail>{item.body}</B.ReviewDetail>
                </div>
              </B.ReviewContainer>
            </div>
          ))}
        </Slider>
      </B.ReviewSilder>
      <B.MapInfo>
        <B.DetailTitle>세부 위치</B.DetailTitle>
        <B.DetailContent>{facilityData && facilityData.location}</B.DetailContent>
        <B.Map><Map/></B.Map>
      </B.MapInfo>
      <B.LocationData>
        {[
          { title: '주요 목적', content: facilityData && facilityData.purpose },
          { title: '이용 가능 물품', content: facilityData && facilityData.item },
          { title: '이용 주의사항', content: facilityData && facilityData.caution },
        ].map((item, index) => (
          <DetailDataItem key={index} title={item.title} content={item.content} />
        ))}
      </B.LocationData>
      <B.ButtonContainer>
      <B.Button1 key={1} onClick={() => onClickButton1()}>
          {reservationStatus ? '반납하기' : '예약현황'}
        </B.Button1>
        <B.Button2 key={2} onClick={() => onClickButton2()}>
          {reservationStatus ? '연장하기' : '예약하기'}
        </B.Button2>
      </B.ButtonContainer>
    </B.Body>
  );
}

function DetailDataItem({ title, content }) {
  return (
    <B.DataContainer>
      <B.DetailTitle>{title}</B.DetailTitle>
      <B.DetailContent>{content}</B.DetailContent>
    </B.DataContainer>
  );
}

const NextArrow = ({ onClick }) => {
    return (
      <B.ArrowContainer onClick={onClick} right>
        <img src={NextArrow_img} alt="Next" />
      </B.ArrowContainer>
    );
  };
  
  const PrevArrow = ({ onClick }) => {
    return (
      <B.ArrowContainer onClick={onClick} left>
        <img src={PrevArrow_img} alt="Prev" />
      </B.ArrowContainer>
    );
  };


export default Detail1;