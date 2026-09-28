# Model Portfolio Demo

A learning project for building a model portfolio website with a React frontend and a Python API. I used this project to practise frontend development, API integration, content management, and cloud-related tools.

## What the project includes

- A React and TypeScript website with home, about, and portfolio pages
- A photo gallery with a lightbox for viewing images
- An admin interface for editing portfolio content
- A FastAPI backend with endpoints for content and image uploads
- Backend code that uses Azure Blob Storage for content and media
- A GitHub Actions workflow configured to deploy the frontend to Azure Static Web Apps

## Technologies

- Frontend: React, TypeScript, Vite, React Router, CSS
- Backend: Python, FastAPI
- Cloud and delivery: Azure Blob Storage, Azure Static Web Apps, GitHub Actions

## Run the frontend locally

1. Clone or download this repository.
2. In the project folder, run `npm install`.
3. Run `npm run dev`.
4. Open the local address shown in the terminal.

## Backend setup

The backend code is in the `backend` folder. It requires configuration for Azure Blob Storage, an admin password, and a JWT secret. Do not put those values in the repository.

## Project status

This is a practice and portfolio project. The frontend refers to a separately hosted API, so running the frontend alone will not provide the full admin and upload functionality.
