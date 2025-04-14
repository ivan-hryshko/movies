# 🎬 Movies API

This is a simple movies API built with Node.js, TypeScript, Sequelize, and SQLite.
It allows you to manage a list of movies and their associated actors.

## ✅ Features

- User creation
- JWT authentication (via `JWT_SECRET`)
- Create movies with associated actors
  - if the actor doesn't exist, the app will create the actor
- Get a movie by `id` with associated actors
- Delete movie
- Get list of movies by title or actor
  - Sorting and pagination
  - `search` query partially implemented
- Dockerized for easy deployment

---

## 🚀 Quick Start

You can run the app with a single command:

```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 -e JWT_SECRET=your_jwt_secret giver0/movies
