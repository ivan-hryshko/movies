# 🎬 Movies API

This is a simple movies API built with Node.js, TypeScript, Sequelize, and SQLite.
It allows you to manage a list of movies and their associated actors.

## ✅ Features

- User creation
- JWT authentication (via `JWT_SECRET`)
- Create movies with associated actors
  - if the actor doesn't exist, the app will create the actor
- Possibility create movies from txt file
- Get a movie by `id` with associated actors
- Delete movie
- Get list of movies by title or actor
  - Sorting and pagination
- Dockerized for easy deployment

## Notes
- The logic is organized using a modular structure: actors, users, movies, and sessions,
  each with their own controllers, services, and repositories to keep the codebase maintainable and scalable.
- I attempted to set up Sequelize migrations.
  However, I have more experience using TypeORM, and I encountered some challenges with Sequelize's migration system.
- From my research, I understood that Sequelize expects all models to be located in a central models folder to correctly manage migrations.
  Therefore, I temporarily moved all model files into the models directory to comply with this requirement.
  Normally, I prefer to keep model files inside their respective modules for better modularization.

---

## 🚀 Quick Start

You can run the app with a single command:

```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 -e JWT_SECRET=your_jwt_secret giver0/movies
```

You can run app from the project folder

```bash
npm install
npm run serve
```

For run tests

```bash
npm run test
```
