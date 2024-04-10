import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Welcome from './pages/Welcome'
import Query1 from './pages/Query1'
import Query2 from './pages/Query2'
import Result from './pages/Results'

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
            <Route
              path='/query1'
              element={<Query1 />}
            />
            <Route
              path='/query2'
              element={<Query2 />}
            />
            <Route
              path='/result'
              element={<Result />}
            />  
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
