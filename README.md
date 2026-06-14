# GB Energy Mix Frontend

React and TypeScript frontend for a Great Britain energy mix dashboard.

The application visualizes daily electricity generation mix data and displays the optimal electric vehicle charging window based on the highest share of clean energy.

## Features

* Displays Great Britain energy mix data for three days:

  * today
  * tomorrow
  * the day after tomorrow
* Shows energy source percentages using pie charts
* Displays the daily share of clean energy
* Allows the user to enter EV charging duration from 1 to 6 full hours
* Fetches the optimal EV charging window from the backend
* Displays the start time, end time and average clean energy percentage for the best charging window
* Uses responsive layout with Bootstrap

## Tech Stack

* React
* TypeScript
* Vite
* Axios
* Recharts
* Bootstrap

## Backend API

This frontend consumes data from the Spring Boot backend:

```text
http://localhost:8080/api/v1
```

Backend repository:

```text
https://github.com/szymonswierz/gb-energy-mix-backend
```

## API Endpoints Used

### Daily energy mix

```http
GET /api/v1/energy-mix-daily
```

Used to display three daily energy mix pie charts and clean energy percentages.

### Optimal charging window

```http
GET /api/v1/optimal-charging-window/{hours}
```

Used to calculate the best EV charging window for the selected charging duration.

Example response:

```json
{
  "from": "2026-06-14T10:30Z",
  "to": "2026-06-14T13:30Z",
  "averageCleanEnergyPercentage": 68.9833333333333
}
```

Times are returned in UTC.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/szymonswierz/gb-energy-mix-frontend.git
cd gb-energy-mix-frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

The backend should be running locally at:

```text
http://localhost:8080
```

## Building the Project

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src
├── api
│   └── neso.ts
├── components
│   ├── EnergyMixPieChart.tsx
│   └── OptimalChargingWindow.tsx
├── App.tsx
└── main.tsx
```

## Main Views

The application contains:

* daily energy mix dashboard
* three pie charts for energy source percentages
* clean energy percentage summary for each day
* EV charging duration input
* optimal charging window result section

## Status

Frontend implementation is complete and connected to the local Spring Boot backend.
