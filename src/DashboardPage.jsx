import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';

function DashboardPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setMyEvents(data))
      .catch(err => console.error('Failed to load my events:', err));
  }, []);


  return (
    <Box sx={{ p: 3, background: '#f4f6fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Events
              </Typography>
              <Typography variant="h5">{myEvents.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Добавьте другие карточки статистики по аналогии */}
      </Grid>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        My Events
      </Typography>
      <Paper sx={{ p: 2 }}>
        {myEvents.length === 0 ? (
          <Typography>You have not created any events yet.</Typography>
        ) : (
          <Grid container spacing={2}>
          {myEvents.map(event => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card>
                {event.imageUrl && (
                  <Box
                    component="img"
                    src={event.imageUrl}
                    alt={event.title}
                    sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography color="text.secondary">{event.date}</Typography>
                  <Typography sx={{ mt: 1 }}>{event.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default DashboardPage;