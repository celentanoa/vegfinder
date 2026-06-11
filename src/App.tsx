import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Navbar from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </div>
      </Router>
    </RecipeProvider>
  );
};

export default App;