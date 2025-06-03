import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/events`)
      .then(res => res.json())
      .then(events => {
        const found = events.find(e => String(e.id) === String(id));
        setEvent(found);
        setTotal(found ? found.price : 0);
      });
  }, [id]);

  

  useEffect(() => {
    if (event) setTotal((event.price || 0) * quantity);
  }, [quantity, event]);

  if (!event) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Event not found</Typography>;

  const handleBuy = async () => {
    const response = await fetch(`http://localhost:5000/api/events/${event.id}/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    });
    if (response.ok) {
        alert(`You bought ${quantity} ticket(s) for $${total} AUD!`);
        navigate('/events');
    } else {
        const data = await response.json();
        alert(data.error || 'Purchase failed');
    }
    };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          {event.title}
        </Typography>
        {event.imageUrl && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img src={event.imageUrl} alt={event.title} style={{ maxWidth: 300, borderRadius: 8 }} />
          </Box>
        )}
        <Typography sx={{ mb: 1 }}><strong>Date:</strong> {event.date}</Typography>
        <Typography sx={{ mb: 1 }}><strong>Description:</strong> {event.description}</Typography>
        <Typography sx={{ mb: 1 }}><strong>Tickets available:</strong> {event.tickets}</Typography>
        <Typography sx={{ mb: 2 }}><strong>Price:</strong> ${event.price} AUD</Typography>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Math.min(event.tickets, Number(e.target.value))))}
          inputProps={{ min: 1, max: event.tickets }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Typography sx={{ mb: 2 }}>
          <strong>Total:</strong> ${total} AUD
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={event.tickets === 0}
          onClick={handleBuy}
        >
          Buy Ticket{quantity > 1 ? 's' : ''}
        </Button>
      </Paper>
    </Box>
  );
}

export default EventDetailsPage;