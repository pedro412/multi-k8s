import React, { useState, useEffect } from 'react';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = () => {
    window
      .fetch('/api/values/current', {
        method: 'GET',
      })
      .then((resp) => resp.json())
      .then((resp) => setValues(resp))
      .catch((err) => console.log(err));
  };

  const fetchIndexes = () => {
    window
      .fetch('/api/values/all', {
        method: 'GET',
      })
      .then((resp) => resp.json())
      .then((resp) => setSeenIndexes(resp))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window
      .fetch('/api/values', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setIndex('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Fib Calc Version Kubernetes</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="index">Enter your index</label>
        <input
          type="number"
          name="index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes i have seen</h3>
      {seenIndexes.map((number) => number.number).join(', ')}

      <h3>Calculated values</h3>
      {Object.keys(values).map((value) => (
        <div key={value}>
          For index {value} i calculated {values[value]}
        </div>
      ))}
    </div>
  );
};

export default Fib;
