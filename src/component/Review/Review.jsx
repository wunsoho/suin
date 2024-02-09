import React, { useState, useEffect } from 'react';
import * as B from './Review.style';
import NavigationBar from "../Navi/NavigationBar";
import StarRatingBar from '../StarRating/StarRatingBar';
import Image1 from '../Image/ReviewImage/Review1.png';
import Image1_1 from '../Image/ReviewImage/Review1_1.png';
import Image1_2 from '../Image/ReviewImage/Review1_2.png';
import Image1_3 from '../Image/ReviewImage/Review1_3.png';
import Image1_4 from '../Image/ReviewImage/Review1_4.png';
function Review () {
    const AVR_RATE = 86;
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const [showImages, setShowImages] = useState(true);

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
        setRatesResArr(calcStarRates)
    }, [])
    const reviews = [
        { id: 1, standard : '5점', rating : 52 },
        { id: 2, standard : '4점', rating : 43 },
        { id: 3, standard : '3점', rating : 12 },
        { id: 4, standard : '2점', rating : 12 },
        { id: 5, standard : '1점', rating : 3 },
    ]
    return(
        <div className = "ReviewBody">
            <B.Title>리뷰 86개</B.Title>
            <B.StarWrapper>
            <div className="flex-container">
                <B.StarContainer>
                    <B.StarTitle>평균 4.3</B.StarTitle>
                    <B.Star>
                        {STAR_IDX_ARR.map((item, idx) => {
                            return <span className='star_icon' key={`${item}_${idx}`}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 14 13' fill='#cacaca'>
                                    <clipPath id={`${item}StarClip`}>
                                        <rect width={`${ratesResArr[idx]}`} height='20' />
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
                    </B.Star>
                </B.StarContainer>
                <B.ScoreContainer>
                    {reviews.map((review) => (
                        <div key = {review.id} className = "review-item">
                            <div className = "standard">{`${review.standard}`}</div>
                            <div className ="bar">
                                <StarRatingBar rating = {review.rating}/>
                            </div>
                            <div className = "rating">{`${review.rating}`}</div>
                        </div>
                    )) 
                    }
                </B.ScoreContainer>
                </div>
            </B.StarWrapper>
            <B.checkBox>
                <input type='checkbox' onChange={() => setShowImages(!showImages)} />
                <div>포토리뷰</div>
                <select className='sorting'>
                    <option>추천순</option>
                    <option>최신순</option>
                </select>
            </B.checkBox>
            <B.ReviewContainer>
                <B.Review1>
                  <B.ImageContainer>
                    <img src = {Image1} alt={"리뷰1"} />
                      <B.ReviewInfo>
                        <div>닉네임</div>
                        <B.ReviewDate>2023.10.10</B.ReviewDate>
                      </B.ReviewInfo>
                      <B.StarRateWrap2>
                        <div className = "score">4.2</div>
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
                      </B.StarRateWrap2>
                  </B.ImageContainer>
                  <B.ReviewDetail>잘썼습니다 공연하기 좋습니다</B.ReviewDetail>
                  <img className = "img1" src = {Image1_1} alt={"리뷰1-1"} />
                  <img className = "img2" src = {Image1_2} alt={"리뷰1-2"} />
                  <img className = "img3" src = {Image1_3} alt={"리뷰1-3"} />
                  <img className = "img4" src = {Image1_4} alt={"리뷰1-4"} />
                </B.Review1>
                {showImages && (
                <B.Review2>
                  <B.ImageContainer>
                    <img src = {Image1} alt={"리뷰1"} />
                      <B.ReviewInfo>
                        <div>닉네임</div>
                        <B.ReviewDate>2023.10.10</B.ReviewDate>
                      </B.ReviewInfo>
                      <B.StarRateWrap2>
                        <div className = "score">4.2</div>
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
                      </B.StarRateWrap2>
                  </B.ImageContainer>
                  <B.ReviewDetai2>잘썼습니다 공연하기 좋습니다<br/>잘썼습니다 공연하기 좋습니다<br/>잘썼습니다 공연하기 좋습니다</B.ReviewDetai2>
                </B.Review2>
                )}
                {showImages && (
                <B.Review2>
                  <B.ImageContainer>
                    <img src = {Image1} alt={"리뷰1"} />
                      <B.ReviewInfo>
                        <div>닉네임</div>
                        <B.ReviewDate>2023.10.10</B.ReviewDate>
                      </B.ReviewInfo>
                      <B.StarRateWrap2>
                        <div className = "score">4.2</div>
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
                      </B.StarRateWrap2>
                  </B.ImageContainer>
                  <B.ReviewDetai2>잘썼습니다 공연하기 좋습니다</B.ReviewDetai2>
                </B.Review2>
                )}
            </B.ReviewContainer>
            <NavigationBar/>
        </div>
        
    );

}
export default Review;