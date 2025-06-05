import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data));
  }, []);

  if (!analytics) return <Typography>Loading analytics...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h5">${analytics.totalRevenue} AUD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Tickets Sold</Typography>
            <Typography variant="h5">{analytics.ticketsSold}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Average Check</Typography>
            <Typography variant="h5">${analytics.averageCheck} AUD</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Top 5 Events</Typography>
            {analytics.topEvents.map(ev => (
              <Typography key={ev.id}>{ev.title}: {ev.sold} sold</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Events by Month</Typography>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={analytics.eventsByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2956e0" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Sales by Date</Typography>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={analytics.salesByDate}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sold" stroke="#2956e0" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Active Users (last 30 days)</Typography>
            <Typography variant="h5">{analytics.activeUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Events Fill Rate</Typography>
            {analytics.eventsFill.map(ev => (
              <Typography key={ev.id}>
                {ev.title}: {ev.percent}%
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Tickets Left per Event</Typography>
            {analytics.eventsLeft.map(ev => (
              <Typography key={ev.id}>
                {ev.title}: {ev.left} left
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnalyticsPage;