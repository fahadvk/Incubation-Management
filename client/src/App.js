
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login'
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Adminauth from './components/adminRoutes';
import Application from './Pages/Applications'
import Slots from './Pages/Slots';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <div className="App">

      {/* <Toaster position='top-center' reverseOrder={false}> */}
      <Router>
        {loading && (<div class="text-center spinner-parent">
          <div class="spinner-border" role="status">

          </div>
        </div>)}
        <Routes>

          <Route exact path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />

          <Route path="/signup" element={<PublicRoutes> <SignupPage /> </PublicRoutes>} />

          <Route path="/login" element={<PublicRoutes><LoginPage /></PublicRoutes>} />
          <Route path='/slot' element={<Adminauth><Slots /> </Adminauth>} />
          <Route exact path='/applications' element={<Adminauth><Application /></Adminauth>}></Route>

        </Routes>
      </Router>
      {/* </Toaster> */}
    </div>
  );
}

export default App;
