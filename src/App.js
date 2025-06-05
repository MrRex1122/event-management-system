import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import AuthPage from './AuthPage';
import EventCreationPage from './EventCreationPage';
import RegistrationPage from './RegistrationPage';
import ProtectedRoute from './ProtectedRoute';
import AccountPage from './AccountPage';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Drawer, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EventsPage from './EventsPage';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EventDetailsPage from './EventDetailsPage';
import AnalyticsPage from './AnalyticsPage';

const drawerWidth = 240;

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: '', role: '', initials: '' });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('http://localhost:5000/api/me', {
        headers: { Authorization: token }
      })
        .then(res => res.json())
        .then(data => {
          setUser({
            name: data.name || data.email || 'User',
            role: data.organization || 'User',
            initials: (data.name || data.email || 'U').split(' ').map(w => w[0]).join('').toUpperCase()
          });
        })
        .catch(() => setUser({ name: 'User', role: '', initials: 'U' }));
    }
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#2956e0',
          color: '#fff',
          borderRight: 0
        },
      }}
    >
      <Box sx={{ p: 2, fontWeight: 'bold', fontSize: 20 }}>
        EventMaster
      </Box>
      <List>
        <ListItem
          component={Link}
          to="/"
          selected={location.pathname === '/'}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: '#fff',
            '&.Mui-selected': {
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            },
            '&:hover': {
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}><HomeIcon /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem
          component={Link}
          to="/events"
          selected={location.pathname === '/events'}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: '#fff',
            '&.Mui-selected': {
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            },
            '&:hover': {
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}><EventIcon /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem
          component={Link}
          to="/analytics"
          selected={location.pathname === '/analytics'}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: '#fff',
            '&.Mui-selected': {
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            },
            '&:hover': {
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem
          component={Link}
          to="/customers"
          selected={location.pathname === '/customers'}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: '#fff',
            '&.Mui-selected': {
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            },
            '&:hover': {
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem
          component={Link}
          to="/settings"
          selected={location.pathname === '/settings'}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            color: '#fff',
            '&.Mui-selected': {
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            },
            '&:hover': {
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              '& .MuiListItemIcon-root': { color: '#fff' }
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, borderTop: '1px solid #3a6be0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ bgcolor: '#3a6be0', mr: 1 }}>{user.initials}</Avatar>
          <Box>
            <Typography variant="body2" sx={{ color: '#fff' }}>{user.name}</Typography>
            <Typography variant="caption" sx={{ color: '#b3c6ff' }}>{user.role}</Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{
            mb: 1,
            color: '#fff',
            borderColor: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderColor: '#fff',
              color: '#fff',
            },
            '&:active': {
              backgroundColor: 'rgba(255,255,255,0.16)',
              borderColor: '#fff',
              color: '#fff',
            },
            '&:focus': {
              borderColor: '#fff',
              color: '#fff',
            }
          }}
          onClick={() => navigate('/account')}
        >
          Account
        </Button>
        <Button
          startIcon={<LogoutIcon />}
          sx={{
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#fff',
            },
            '&:active': {
              backgroundColor: 'rgba(255,255,255,0.16)',
              color: '#fff',
            },
            '&:focus': {
              color: '#fff',
            }
          }}
          onClick={() => {
            localStorage.removeItem('authToken');
            navigate('/login');
          }}
        >
          Sign out
        </Button>
      </Box>
    </Drawer>
  );
}

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box sx={{ flexGrow: 1 }}>
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
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <EventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <ProtectedRoute>
                    <EventDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;