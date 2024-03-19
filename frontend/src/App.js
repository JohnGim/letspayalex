import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Styles/global.css'; // Import global styles
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
