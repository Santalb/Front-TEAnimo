import React , { useState } from 'react';
import Dashboard from './components/Dashboard';
import Forms from './components/Forms';


function App() {
  const [scoreData, setScoreData] = useState(Array(10).fill(0));
  return (
    <div className="p-6">
      <Forms setScoreData={setScoreData} />
      <Dashboard scoreData={scoreData} />
    </div>
  );
}

export default App;