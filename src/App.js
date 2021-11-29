import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages & components
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';

function App() {

  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {/* only show sidebar when user is logged in */}
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact path="/"
                element={!user ? <Navigate to="/login" /> : <Dashboard />} />
              <Route path="/create"
                element={!user ? <Navigate to="/login" /> : <Create />} />
              <Route path="/projects/:id"
                element={!user ? <Navigate to="/login" /> : <Project />} />
              <Route path="/login"
                element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
