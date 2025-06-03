import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Events
      </Typography>
      <TextField
        label="Search events"
        variant="outlined"
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filteredEvents.map(event => (
          <Grid item xs={12} md={4} key={event.id}>
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
                <Typography color="text.secondary">
                  Tickets: {event.tickets} | Price: {event.price ? `$${event.price} AUD` : 'Free'}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EventsPage;