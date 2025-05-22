# Workout Backend

This is a backend application for managing workout routines, workout splits, and user authentication. It is built using Node.js, Express, MongoDB, and Zod for schema validation (not all schemas are validated yet). The application uses MinIO for blob storage to handle media files such as progress photos and exercise demonstrations.

## Live Application
Visit the live application at: [v2.workoutmadeeasy.com](https://v2.workoutmadeeasy.com)

Frontend Repository: [Workout Frontend](https://github.com/RiadMefti/workout-frontend)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/RiadMefti/workout-backend.git
   cd workout-backend
   ```

2. Install dependencies:
   ```sh
   bun install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```sh
PORT=8080
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
MINIO_ACCESS_KEY=your_minio_access_key
MINIO_SECRET_KEY=your_minio_secret_key
MINIO_API_URL=your_minio_api_url
```

## Running the Application

To start the application in development mode, run:

```sh
bun run dev
```

The server will start on the port specified in the `.env` file (default is 8080).

## API Endpoints

### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user

### Health
- `GET /health` - Check if the server is running

### Workout Split
- `GET /workout` - Get all workout splits for the user
- `POST /workout` - Create a new workout split
- `PUT /workout/:id` - Edit a specific workout split
- `DELETE /workout/:id` - Delete a specific workout split
- `GET /workout/next-workout-index` - Get the next workout index for the user
- `POST /workout/next-workout-index/:index` - Increment the next workout index for the user
- `GET /workout/active-split` - Get the active workout split for the user
- `POST /workout/active-split/:splitId` - Set a specific workout split as active

### Workout Manager
- `GET /workout-manager` - Get all workout records for the user
- `GET /workout-manager/:id` - Get a specific workout record for the user
- `POST /workout-manager/active-workout` - Create a new workout record for the user
- View other users' workout history by adding them via email to your connections list.
- New Endpoints:
  - `POST /workout-manager/connections` — Add a user to your connections by email (body: `{ email: string }`)
  - `GET /workout-manager/connections` — Get your list of connections
  - `GET /workout-manager/connections/:email/workouts` — Get all workouts for a connection (by email, only if added)

### Media Storage (MinIO)
- `POST /storage/upload` - Upload media files
- `GET /storage/file/:id` - Retrieve media files
- `DELETE /storage/file/:id` - Delete media files

## Project Structure

```
workout-backend/
├── .env
├── .gitignore
├── bun.lockb
├── controllers/
│   ├── auth.controller.ts
│   ├── health.controller.ts
│   ├── workout-manager.controller.ts
│   └── workout-split.controller.ts
├── index.ts
├── middlewares/
│   ├── authorization.middleware.ts
│   └── error.middleware.ts
├── package.json
├── README.md
├── routes/
│   ├── auth.route.ts
│   ├── health.route.ts
│   ├── routes.ts
│   ├── workout-manager.route.ts
│   └── workout-split.route.ts
├── schemas/
│   ├── user.schema.ts
│   ├── workout-record.schema.ts
│   └── workout-split.schema.ts
├── services/
│   ├── auth.service.ts
│   ├── health.service.ts
│   ├── workout-manager.service.ts
│   └── workout-split.service.ts
├── tsconfig.json
├── types/
│   ├── user.types.ts
│   ├── workout.types.ts
│   └── response.types.ts
├── utils/
│   ├── logger.ts
│   └── helpers.ts
└── zod/
    ├── workout-manager.zod.ts
    └── workout-split.zod.ts
```

## Features

- User authentication and authorization
- Workout split management
- Workout tracking and progress monitoring
- Media file storage using MinIO for:
  - Progress photos
  - Exercise demonstration videos
  - Workout-related attachments
- Secure file upload and retrieval
- JWT-based authentication
- TypeScript support
- Zod schema validation