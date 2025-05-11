import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Forms from './components/Forms';
import Report from './components/Report';

function App() {
  const [scoreData, setScoreData] = useState(Array(10).fill(0));
  const [isFinished, setIsFinished] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-6">
              {!isFinished ? (
                <Forms setScoreData={setScoreData} onFinish={() => setIsFinished(true)} />
              ) : (
                <Dashboard scoreData={scoreData} />
              )}
            </div>
          }
        />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
