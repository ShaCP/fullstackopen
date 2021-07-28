import React, { useState } from 'react';

const Button = ({ text, handleClick }) => (
  <button type="button" onClick={handleClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr className="feedback">
    <td className="feedback-type">{text}</td>
    <td className="feedback-count">{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = parseFloat((good - bad) / total).toFixed(2);
  const posPctg = `${parseFloat((good / total) * 100).toFixed(2)}%`;

  return (
    <table className="statistics">
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={posPctg} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const shouldRenderStats = !!(good || neutral || bad);

  return (
    <div className="app">
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      {shouldRenderStats ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
