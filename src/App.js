import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import AuthPage from './AuthPage';
import EventCreationPage from './EventCreationPage';
import RegistrationPage from './RegistrationPage';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Dashboard</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link> |{' '}
          <Link to="/create-event">Create Event</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <EventCreationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;