import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import AuthPage from './AuthPage';
import EventCreationPage from './EventCreationPage';
import RegistrationPage from './RegistrationPage';
import ProtectedRoute from './ProtectedRoute';
import AccountPage from './AccountPage';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ background: '#1976d2' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Event Management System
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/create-event">
                Create Event
              </Button>
              <Button color="inherit" component={Link} to="/account">
                Account
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
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