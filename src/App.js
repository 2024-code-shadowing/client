import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartScreen from './StartScreen';
import TitleScreen from './TitleScreen';
import FullPageBackground from './Background';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<FullPageBackground page_type="start" />} />
          <Route path="/title" element={<FullPageBackground page_type="title" />} />
      </Routes>
    </Router>
  );
}

export default App;
