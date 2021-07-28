import React, { useState } from 'react';

const getRandInt = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdotes, selected, points, setSelected, setPoints }) => {
  const getNextAnecdote = () => {
    let randInt = getRandInt(0, anecdotes.length - 1);
    while (randInt === selected) {
      randInt = getRandInt(0, anecdotes.length - 1);
    }
    setSelected(randInt);
  };

  const addVote = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  return (
    <div className="anecdote">
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={getNextAnecdote} text="next anecdote" />
    </div>
  );
};

const HighestVotedAnecdote = ({ anecdotes, points }) => {

  const indexOfHighestVoted = points.indexOf(Math.max(...points));
  const highestVoted = anecdotes[indexOfHighestVoted];

  return (
    <div className="highest-voted-anecdote">
      <h1>Anecdote with most votes</h1>
      <p>{highestVoted}</p>
      <p>has {points[indexOfHighestVoted]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
  ];

  const [selected, setSelected] = useState(getRandInt(0, anecdotes.length - 1));
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  return (
    <div className="app">
      <Anecdote
        anecdotes={anecdotes}
        selected={selected}
        points={points}
        setPoints={setPoints}
        setSelected={setSelected}
      />
      <HighestVotedAnecdote anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
