# Pathfinder

**Pathfinder** is a React Single-Page Application developed as the **SoftUni React Course - September 2025 – Final Exam Project**.
The application functions as a hybrid between a blog and a curated catalog of interesting places in Bulgaria.

Registered users can create profiles and add places across various categories and difficulty levels. Each place includes an image, location, and description. Other authenticated users can follow or rate posts, while guests can browse the public catalog.

The application is built with React and Tailwind CSS. No external UI template libraries or prebuilt themes are used; all UI components are styled manually according to the project’s design.

---

## Project Structure

```
root/
 ├── client/        # React + Vite SPA Front-end
 └── server/        # Node.js Back-end (server.js)
```

### Server

No installation steps are required. Start the backend by navigating to the `server` folder and running:

```
node server.js
```


### Client

Navigate to the `client` folder and install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

This installs React, ReactDOM, Vite, Tailwind, and all other required dependencies.

---

## Base Features

-   Public catalog of user-added places
-   Authentication: register, login, logout
-   Add, view, edit, and delete places
-   Image, description, difficulty, and location fields
-   Guest users can browse the catalog; authenticated users can interact with content

---

## Development Notes

-   UI components styled manually with Tailwind CSS
-   Clean modular project structure
-   Server is the SoftUni Practice Server




