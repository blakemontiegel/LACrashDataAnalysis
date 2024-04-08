import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Welcome from './pages/Welcome'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/welcome"
              element={<Welcome />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
