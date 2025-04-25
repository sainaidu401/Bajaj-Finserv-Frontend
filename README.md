# Doctor Listing Application

A React application that displays a list of doctors with filtering and sorting capabilities.

## Features

- Autocomplete search for doctor names
- Filter by consultation type (Video Consult/In Clinic)
- Filter by multiple specialties
- Sort by fees (ascending) and experience (descending)
- Responsive design
- URL query parameter support for filters

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies Used

- React with TypeScript
- Material-UI for components
- React Router for URL handling
- Axios for API calls

## Project Structure

- `src/components/` - React components
  - `SearchBar.tsx` - Autocomplete search component
  - `FilterPanel.tsx` - Filter and sort options
  - `DoctorList.tsx` - Doctor card list display
- `src/types/` - TypeScript interfaces
  - `Doctor.ts` - Type definitions
- `src/App.tsx` - Main application component
