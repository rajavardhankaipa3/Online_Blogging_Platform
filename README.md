# Online Blogging Platform

A full-stack web application that allows users to register, log in, create blog posts, explore published blogs, and manage their own content.

The project is built using **React** for the frontend and **Spring Boot** for the backend, with JWT-based authentication and MySQL for data storage.

## Features

### Implemented Features

- **User Registration:** Create an account using a name, email, and password.
- **User Login:** Authenticate users using their registered credentials.
- **JWT Authentication:** Secure protected API requests using JSON Web Tokens.
- **Dashboard:** Access blogging features after logging in.
- **Create Blogs:** Publish blog posts with a title and content.
- **View All Blogs:** Browse blogs published on the platform.
- **My Blogs:** View blogs created by the currently logged-in user.
- **Edit Blogs:** Update your own blog posts.
- **Delete Blogs:** Delete your own blog posts.
- **Ownership Protection:** Prevent users from editing or deleting another user's blog.

*Note: The editing and deletion workflows have been added to the project; verify them locally before considering them fully tested.*

### Planned Features

- Search blogs by title or author.
- Blog categories and filtering.
- Individual blog details page.
- Like and comment functionality.
- User profile management.
- Responsive UI improvements.
- Online deployment.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, HTML, CSS |
| Frontend tooling | Vite, npm |
| Backend | Java, Spring Boot |
| API communication | REST API, Axios |
| Database | MySQL |
| Authentication | JWT |
| Password security | BCrypt |
| Backend build tool | Maven |

## Project Structure

```text
OnlineBloggingPlatform/
│
├── blogging-frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── blogging-backend/
│   └── blogging-backend/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       │   └── com/blog/
│       │       │       └── blogging_backend/
│       │       └── resources/
│       ├── pom.xml
│       ├── mvnw
│       └── mvnw.cmd
│
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Java Development Kit (JDK), compatible with the backend `pom.xml`.
- Node.js and npm.
- MySQL Server.
- Git.

## Database Setup

1. Start your MySQL server.
2. Create a database:

```sql
CREATE DATABASE blogging_platform;
```

3. Configure the database connection in the backend's `application.properties`.

Use environment variables for credentials rather than committing passwords:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/blogging_platform}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8081

app.jwt.secret=${JWT_SECRET}
app.jwt.expiration=86400000
```

Set `DB_PASSWORD` and `JWT_SECRET` in your local environment before starting the backend. Use a strong JWT secret of at least 32 characters.

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd OnlineBloggingPlatform
```

Replace the repository URL with your actual GitHub repository URL.

### 2. Run the Backend

Open a terminal:

```powershell
cd blogging-backend\blogging-backend
```

Configure your database environment variables, then run:

```powershell
.\mvnw.cmd spring-boot:run
```

The Spring Boot backend runs at:

`http://localhost:8081`

### 3. Run the Frontend

Open another terminal:

```powershell
cd blogging-frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

Open the frontend URL in your browser to use the application.

## API Endpoints

Base URL: `http://localhost:8081/api`

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Log in |

### Blogs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/blogs` | Retrieve all blogs | Public |
| GET | `/blogs/{id}` | Retrieve a blog by ID | Public |
| POST | `/blogs` | Create a blog | Authenticated |
| GET | `/blogs/mine` | Retrieve your blogs | Authenticated |
| PUT | `/blogs/{id}` | Update your own blog | Authenticated |
| DELETE | `/blogs/{id}` | Delete your own blog | Authenticated |

Protected endpoints require an authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Security

The application includes:

- JWT-based authentication.
- BCrypt password hashing.
- Protected endpoints for authenticated operations.
- Ownership checks for blog updates and deletion.
- CORS configuration for the local React frontend.

For production, configure secure environment variables, HTTPS, appropriate CORS origins, and production database settings.

## Current Project Status

The application is under active development.

The core authentication and blogging workflows have been implemented. Additional features, testing, UI improvements, and deployment are planned.

## Future Improvements

1. Add blog search and category filtering.
2. Create a dedicated blog details page.
3. Implement likes and comments.
4. Add user profile functionality.
5. Improve responsive design.
6. Deploy the application.

## Author

**Kaipa Venkata Raja Vardhan Reddy**

Computer Science and Engineering Student

GitHub: Add your GitHub profile URL here.

---

*This project is developed as a full-stack web development project to practice frontend development, REST API design, backend development, database integration, and authentication.*
