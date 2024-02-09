import React from 'react';
import TimeTable from './TimeTable';
import dummyData from '../Re_status/data';

const Status = () => {
  return (
    <div>
      <TimeTable courses={dummyData} />
    </div>
  );
};

export default Status;