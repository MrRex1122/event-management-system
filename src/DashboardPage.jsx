import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Paper, Button, LinearProgress, Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [myEvents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setMyEvents(data))
      .catch(err => console.error('Failed to load my events:', err));
  }, []);

  // Сортировка по дате и выбор 3 ближайших
  const upcomingEvents = [...myEvents]
    .filter(event => event.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <Box sx={{ p: 3, background: '#f4f6fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Статистика (заглушка) */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography color="text.secondary">Total Events</Typography>
            <Typography variant="h5">{myEvents.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography color="text.secondary">Ticket Sales</Typography>
            <Typography variant="h5">
              {myEvents.reduce((sum, e) => sum + (e.tickets || 0), 0)}
            </Typography>
          </Paper>
        </Grid>
        {/* Добавьте еще карточки статистики по желанию */}
      </Grid>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Upcoming Events</Typography>
        <Button variant="contained" onClick={() => navigate('/create-event')}>
          + Create Event
        </Button>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {upcomingEvents.map(event => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {event.imageUrl && (
                <Box
                  component="img"
                  src={event.imageUrl}
                  alt={event.title}
                  sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{event.title}</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {event.location || 'Event Location'}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  {event.date} {/* Можно добавить форматирование даты */}
                </Typography>
                <Typography sx={{ my: 1 }}>{event.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={event.tickets ? Math.min((event.tickets / 1000) * 100, 100) : 0}
                    sx={{ flex: 1, mr: 1, height: 8, borderRadius: 5 }}
                  />
                  <Typography sx={{ minWidth: 60 }} color="text.secondary">
                    {event.tickets || 0} / 1000
                  </Typography>
                </Box>
                <Button size="small" variant="outlined" fullWidth>
                  View details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity (пример) */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Activity
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            New ticket sale for Summer Music Festival
          </Typography>
          <Typography variant="caption" color="text.secondary">
            5 minutes ago
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            You updated Tech Conference 2023 details
          </Typography>
          <Typography variant="caption" color="text.secondary">
            2 hours ago
          </Typography>
        </Box>
        {/* Добавьте еще активности по желанию */}
      </Paper>
    </Box>
  );
}

export default DashboardPage;