
import HomePage from './components/home/HomePage';
import SearchPage from './components/search/SearchPage';
import Restaurant from './components/restaurant/Restaurant';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main >
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quick-search" element={<SearchPage />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
