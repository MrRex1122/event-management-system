import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('http://localhost:5000/api/me', {
        headers: { Authorization: token }
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser({}));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">
          Account Management
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Name:</strong> {user.name || '—'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Organization:</strong> {user.organization || '—'}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Paper>
    </Box>
  );
}

export default AccountPage;