import React from 'react';

const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Total = ({ parts }) => {
  const sum = parts.reduce((total, { exercises }) => (total += exercises), 0);
  return (
    <p>
      <b>Total exercises {sum}</b>
    </p>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;