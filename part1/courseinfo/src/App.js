import React from 'react';

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts: [part1, part2, part3] }) => (
  <>
    <Part part={part1.name} exercises={part1.exercises} />
    <Part part={part2.name} exercises={part2.exercises} />
    <Part part={part3.name} exercises={part3.exercises} />
  </>
);

const Total = ({ parts: [part1, part2, part3] }) => (
  <p>
    Number of exercises {part1.exercises + part2.exercises + part3.exercises}
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
