import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './mainPage/mainPage';
import Detail from './detailPage/detailPage';

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
