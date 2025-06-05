import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // after autorisation direct to main page
  if (localStorage.getItem('authToken')) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/'); // main page redirect
      } else {
        alert('Authentication error');
      }
    } catch (error) {
      alert('Server is unavailable');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
}

export default AuthPage;