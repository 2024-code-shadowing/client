import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRenderer from './Background';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageRenderer page_type="start" />} />
        <Route path="/title" element={<PageRenderer page_type="title" />} />
        <Route path="/typing/:id" element={<PageRenderer page_type="typing" />} />
      </Routes>
    </Router>
  );
}

export default App;
