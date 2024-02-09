import React, { useEffect } from 'react';
import { markerdata } from "../Data/markerData";

const KakaoMap = () => {
  useEffect(() => {
    // API 키를 사용하여 카카오 지도 API를 초기화
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b808e3df6d2c1f8fc3352b318fd6902e&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map');
        const options = {
          center: new window.kakao.maps.LatLng(35.544573, 129.258482),
          level: 3, 
        };
        const map = new window.kakao.maps.Map(container, options);

        markerdata.forEach((el) => {
            new window.kakao.maps.Marker({
              map: map,
              position: new window.kakao.maps.LatLng(el.lat, el.lng),
              title: el.title,
              imageSize: '5px',
            });
          });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="kakao-map" style={{ width: '400px', height: '200px', margin: '0 auto' }} />;
};

export default KakaoMap;