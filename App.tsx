import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Sessions } from './pages/Sessions';
import { News } from './pages/News';
import { Calendar } from './pages/Calendar';
import { Firms } from './pages/Firms';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Sessions />} />
          <Route path="/news" element={<News />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/firms" element={<Firms />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;