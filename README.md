# Book Shelf Project

Book Shelf Project is a web application for searching books, writing and managing reviews, and handling user profiles.  
It features user authentication, integration with Google Books API, and a responsive dashboard for review management.

## ✨ Features
- User authentication (login/register) via Supabase
- CRUD for book reviews
- Profile management
- Integration with Google Books API for book search
- Search and pagination of books using query parameters
- Responsive app for reading and managing reviews

## 🛠️ Tech Stack
- Next.js
- Supabase
- React
- Tailwind CSS

## Installation
1. Clone the project:
   ```
   git clone https://github.com/sali1502/book-shelf-project.git
   ```
2. Navigate to the project folder:
   ```
   cd book-shelf-project
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create your own Supabase project. Configure the `profiles` and `reviews` tables, authentication, and the required Row Level Security policies.
5. Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```
   The Google Books API key is optional, but Supabase configuration is required for authentication, profiles, and reviews.
6. Start the development server:
   ```
   npm run dev
   ```

Never commit `.env.local` or expose API keys in the repository. The file is ignored by Git through `.gitignore`.

## 📸 Screenshots

### Landing page - desktop
![Landing Desktop](./screenshots/landing-desktop.png)

### Details page - desktop
![Details Desktop](./screenshots/details-desktop.png)

### Dashboard - desktop
![Dashboard Desktop](./screenshots/dashboard-desktop.png)

### Login - mobile
![Login Mobile](./screenshots/login-mobile.png)

### Register - mobile
![Register Mobile](./screenshots/register-mobile.png)

## Author
- Name: Åsa Lindskog
- GitHub: [sali1502](https://github.com/sali1502)

## 🚧 Project Status

The application currently supports Google Books search and pagination on the landing page. Users can browse books and open a details page for each book.

Review CRUD is implemented. At the moment, users enter the Google Books ID manually when creating a review.

Future improvements include:

- Allowing users to select a book from the Google Books search when creating a review.
- Adding a dedicated `books` table and connecting books, reviews, and users through database relationships.
- Expanding profile management into full user CRUD with admin functionality.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
