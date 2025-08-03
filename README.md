
# Live Link of event managemnet app in netlify server
Check out the live app here:  
https://eb-event-management-app.netlify.app/

# Event Calendar React App

A React app featuring a calendar and event list with form inputs using React Hook Form and Tailwind CSS. It includes date/time inputs with restrictions, custom input components, and clean UI with icons from Lucide React.

---

## Features

- Select dates via a calendar
- View events for selected date with category, venue, title, and description
- Reusable `InputField` component integrated with React Hook Form
- Prevent selecting past dates/times in datetime input
- Add new events with form inputs
- Edit and update existing events
- Delete events dynamically

## Setup Instructions

### Prerequisites

- Node.js (v14 or later recommended)
- pnpm

## Dependencies

This project uses the following main dependencies:

- **react** & **react-dom**: Core React libraries
- **react-hook-form**: For form state management and validation
- **tailwindcss**: Utility-first CSS framework for styling
- **lucide-react**: Icon library for React (Lucide icons)
- **react-calendar**: For calendar UI component
- **typescript** (if using TS): For static typing

### Example `package.json` dependencies snippet:

````json
{
  "dependencies": {
    "@hookform/resolvers": "^5.2.1",
    "@tailwindcss/vite": "^4.1.11",
    "@tanstack/react-table": "^8.21.3",
    "browser-router": "^0.2.0",
    "dayjs": "^1.11.13",
    "lucide-react": "^0.536.0",
    "react": "^19.1.0",
    "react-calendar": "^6.0.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.61.1",
    "react-modal": "^3.16.3",
    "react-router-dom": "^7.7.1",
    "react-toastify": "^11.0.5",
    "tailwindcss": "^4.1.11",
    "zod": "^4.0.14"
  },
}

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Sudipraut1522/Event-management
cd your-repo
````
