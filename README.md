# Event Management System

A full-stack event management system built with **React** (frontend) and **Node.js/Express** (backend), using **SQLite** for data storage.

---

## Features

- User registration and login
- Dashboard overview of your events, tickets sold, and revenue
- Browse, search, and view event details
- Create new events (title, description, image, ticket count, price)
- Analytics: sales, event popularity, and trends
- Account management
- Purchase tickets for events

---

## Setup & Run Guide

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- npm (comes bundled with Node.js)

### 2. Installing Dependencies

Open your terminal, navigate to the root directory of the project, and run:

```sh
npm install
```

This will install all required packages listed in [`package.json`](package.json).

### 3. Starting the Backend Server

In the root directory, run:

```sh
node server.js
```

The backend will be running at [http://localhost:5000](http://localhost:5000).

### 4. Starting the Frontend (React Application)

Open a new terminal window/tab and run:

```sh
npm start
```

This will launch the React frontend at [http://localhost:3000](http://localhost:3000).

**Make sure the backend is running as well for full functionality.**

---

## User Guide

### Registration and Login

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- If you don’t have an account, click “Register” to create one.
- Log in using your email and password.

### Main Application Sections

- **Dashboard** – Overview of your events, tickets sold, and revenue
- **Events** – Browse/search all events and view details
- **Create Event** – Add new events (title, description, image, ticket count, price)
- **Analytics** – View sales metrics, event popularity, and trends
- **Account** – Manage your account info and log out

### Working with Events

- To view event details, click “View details” on any event card.
- To buy tickets, select the quantity and click “Buy Ticket(s)” on the event page.
- To create a new event, go to “Create Event”, fill out the form, and submit.

### Navigation

Use the sidebar to navigate between:

- Overview (Dashboard)
- Events
- Analytics
- Customers (if enabled)
- Settings (if enabled)
- Account
- Sign out

---

## Notes

- All application data is stored locally in an `events.db` file (SQLite).
- To reset data, delete `events.db` and restart the backend server (this erases all data).
- Both backend and frontend servers must be running at the same time for the app to work.