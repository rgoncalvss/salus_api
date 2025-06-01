# Salus API

A comprehensive API for health management.

## Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- Docker and Docker Compose

## Installation & Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

- Create a `.env` file in the project root
- **Important**: Copy the `.env.example` file and rename it to `.env`
- Fill in your environment variables following the exact structure from `.env.example`
- Do not modify the variable names or structure to avoid configuration errors

3. **Start the application with Docker**

```bash
docker compose up -d
```

This will set up the entire project including the database and all required services.

## Development

```bash
# Start in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## API Documentation

The API documentation will be available at `https://salus-api-9h6s.onrender.com/docs/`. (Note that it could take some time to load because off the free Render instance)
