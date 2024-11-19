## GyanShristi - A platform for learning and teaching (CMS for schools and colleges)

GyanShristi is a platform for learning and teaching. It is a CMS for schools and colleges. Basically, it has five roles: Admin, Editor, Author, Registered Viewer and Unregistered Viewer. Admin can manage everything, Editor can manage posts, author and viewer, Author can write posts, Registered Viewer can view posts and Unregistered Viewer can view posts but can't comment. It is built using Next.js and Express.js. It uses MongoDB as database. It uses JWT for authentication. 

## Features
Admin:
- Manage posts
- Manage users
- Manage roles
- Manage categories
- Manage comments

Editor:
- Manage posts
- Manage users (except admin)
- Manage roles (except admin)
- Manage categories
- Manage comments

Author:
- Write posts
- Manage comments on own posts

Registered Viewer:
- View posts
- Comment on posts

Unregistered Viewer:
- View posts

## Installation
- Clone the repository

For frontend Next.js: 
```bash
cd frontend
npm install
npm run dev
```
Create a .env file in frontend folder and add the following:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/
```

For backend Express.js:
```bash
cd backend
npm install
npm run dev
```
Create a .env file in backend folder and add the following:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gyanshristi
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:3000/
```

## Technologies
- Next.js
- Express.js
- MongoDB
- JWT

## Why GyanShristi?
- It is a platform for learning and teaching.
- It is a CMS for schools and colleges.
- It has five roles: Admin, Editor, Author, Registered Viewer and Unregistered Viewer.
- It is built using Next.js and Express.js.
- It uses MongoDB as database.
- It uses JWT for authentication.

## Ending Note
GyanShristi is a platform for learning and teaching. It is a CMS for schools and colleges. It has five roles: Admin, Editor, Author, Registered Viewer and Unregistered Viewer. It is built using Next.js and Express.js. It uses MongoDB as database. It uses JWT for authentication.


