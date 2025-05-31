import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';




function RegistrationPage({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // добавьте это
  const [organization, setOrganization] = useState(''); // и это
  const navigate = useNavigate();




  // Если пользователь уже авторизован — редирект на главную
  if (localStorage.getItem('authToken')) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, organization })
      });
      if (response.ok) {
        alert('Registration successful!');
        if (onRegisterSuccess) onRegisterSuccess();
        navigate('/'); // <-- редирект на главную
      } else {
        const data = await response.json();
        alert(data.error || 'Registration error');
      }
    } catch (error) {
      alert('Server unavailable');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">
          Register
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
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Organization"
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default RegistrationPage;