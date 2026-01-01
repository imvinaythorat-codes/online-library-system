# Online Library System – Internshala Assignment

This project is a small online library system built with React and Vite.
It was created as part of the React Assignment 2 to practise routing, Redux, and UI design.

## Tech stack

- React (Vite)
- React Router DOM
- Redux Toolkit + React Redux
- CSS (custom styling, no UI framework)

## Features

- **Home page**
  - Welcome text that explains the app.
  - List of book categories as clickable pills.
  - Section of popular books shown as cards with cover image, rating, and "View Details" link.

- **Browse books**
  - Shows the complete book list coming from Redux state.
  - Dynamic routing by category: `/books/:category`.
  - Search bar that filters books by title or author.
  - Each book is displayed as a card with cover, rating and "View Details" button.

- **Book details**
  - Dynamic route `/book/:bookId`.
  - Large hero-style book cover at the top of the page.
  - Shows title, author, category, rating, description, and published year (if available).
  - Back button to go to the previous page and a link to return to the Browse page.

- **Add book**
  - Form for adding a new book into the list that is stored in Redux.
  - Validation for required fields and rating range (1.0 – 5.0).
  - After a successful submit, the user is redirected to the Browse page and the new book appears at the top.

- **404 page**
  - Handles all invalid routes.
  - Displays the invalid URL on the screen.
  - Does not render the shared header component.
  - Contains a button to return to the Home page.

- **Styling and UX**
  - Dark library theme with a consistent colour palette.
  - Smooth hover states on cards and buttons.
  - Responsive layout that works on large and small screens.
  - Book cover images for all initial books.

## Pages and routes

- `/` – Home page
- `/books` – Browse books (all categories)
- `/books/:category` – Browse books filtered by category
- `/book/:bookId` – Book details page
- `/add-book` – Add book form
- `*` – 404 "Page Not Found" page

## State management

The application uses Redux Toolkit:

- `src/store/booksSlice.js` contains the list of books and the `addBook` reducer.
- The store is created in `src/store/store.js`.
- `Provider` is configured in `src/main.jsx`.

Selectors:

- `selectAllBooks` – returns the full list.
- `selectBookById` – returns a single book by id.
- `selectCategories` – returns the unique set of categories.

## How to run locally

1. Install dependencies:

   ```bash
   npm install
2. npm run dev
3. The terminal will show a local URL (for example http://localhost:5173).
   Open that URL in the browser.

## Netlify Live Link
https://online-library-sy.netlify.app/


## Folder Structure
src/
  components/
    Header.jsx
    BookCard.jsx
  pages/
    HomePage.jsx
    BrowseBooksPage.jsx
    BookDetailsPage.jsx
    AddBookPage.jsx
    NotFoundPage.jsx
  store/
    booksSlice.js
    store.js
  styles.css
  App.jsx
  main.jsx

public/
  books/
    (book cover images)