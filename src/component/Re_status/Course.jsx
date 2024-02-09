import React from 'react';
import * as B from '../Re_status/Course.style'; // 이 부분은 필요에 따라 경로를 수정하세요

const Course = ({ course }) => {
  const hasCourse = !!course;

  return (
    <B.Body>
        <div className={`course ${hasCourse ? 'has-course' : ''}`}>
        {hasCourse && (
            <>
            <p>{course.name}</p>
            <p>{`${course.startTime} - ${course.endTime}`}</p>
            </>
        )}
        </div>
    </B.Body>
  );
};

export default Course;