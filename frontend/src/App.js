import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Welcome from './pages/Welcome'
import Query1 from './pages/Query1'
import Query2 from './pages/Query2'
import Query3 from './pages/Query3'
import Query4 from './pages/Query4'
import Query5 from './pages/Query5'
import Result from './pages/Results'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
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
              path='/query3'
              element={<Query3 />}
            />
            <Route
              path='/query4'
              element={<Query4 />}
            />
            <Route
              path='/query5'
              element={<Query5 />}
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
