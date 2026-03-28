# DevPortfolio CMS

A full-stack developer portfolio and content management system built with **React** and **Django REST Framework**.

This project is designed as a real portfolio application where visitors can view projects, skills, and contact information, while the portfolio owner can manage content through a protected admin dashboard.

---

## Features

### Public Website
- Home page with profile image, bio, and resume link
- Projects page
- Project detail page
- Skills page
- Contact form
- Responsive modern UI

### Admin Dashboard
- JWT authentication
- Protected dashboard routes
- Manage profile information
- Upload profile image and resume
- Create, update, and delete projects
- Upload project images
- Create, update, and delete skills
- View contact messages

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Django
- Django REST Framework
- Simple JWT
- SQLite (development)
- PostgreSQL (planned for production)

---

## Project Structure

```bash
port/
│
├── backend/
│   ├── accounts/
│   ├── blog/
│   ├── contact/
│   ├── portfolio/
│   ├── projects/
│   ├── skills/
│   ├── config/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md