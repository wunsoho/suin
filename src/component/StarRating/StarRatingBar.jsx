import React from 'react';
import * as B from './StarRatingBr.style';

const StarRatingBar = ({ rating }) => {
  const starPercentage = (rating / 60) * 100;

  return (
    <B.bar>
      <B.inner style={{ width: `${starPercentage}%` }}></B.inner>
    </B.bar>
  );
};

export default StarRatingBar;