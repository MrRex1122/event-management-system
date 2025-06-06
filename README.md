# this is the cut Test & Run guide from the doc i'm just placing it here for ref 

Test & Run Guide
Complete Setup and Usage Guide
1. Prerequisites
Before getting started, make sure you have the following installed on your system:
Node.js (version 16 or higher is recommended)


npm (comes bundled with Node.js)


2. Installing Dependencies
Open your terminal, navigate to the root directory of the project, and run:
npm install

This will install all the required packages listed in the package.json file.
3. Starting the Backend Server
Still in the root directory, run the following command to start the backend server:
node server.js

Once started, the backend will be running at http://localhost:5000.
4. Starting the Frontend (React Application)
Open a new terminal window or tab, and run:
npm start

This will launch the React frontend at http://localhost:3000.
Make sure the backend is running as well so that the application can fully function.
User Guide
Registration and Login
Open http://localhost:3000 in your browser.


If you don’t already have an account, click on the “Register” button to create one.


Log in using your email address and password.


Main Application Sections
Dashboard – shows an overview of your events, tickets sold, and revenue


Events – browse all events, search by name or description, and view event details


Create Event – add new events including title, description, image, ticket count, and price


Analytics – view metrics like sales, event popularity, and trends


Account – manage your account information and log out

Working with Events
To view event details, click the “View details” button on any event card. You can see all related information and purchase tickets from this page.
To buy tickets, select the desired quantity on the event page and click the “Buy Ticket(s)” button.
To create a new event, go to the “Create Event” section, fill out the required fields, and submit the form.
Navigation
Use the sidebar to navigate between:
Overview (Dashboard)


Events


Analytics


Customers (if this feature is included)


Settings (if included)


Account


Sign out


Notes
All application data is stored locally in an events.db file, which uses SQLite. If you want to reset the data, simply delete the events.db file and restart the backend server. Keep in mind this will erase all existing data.
Both the backend and frontend servers must be running at the same time for the app to work correctly.
