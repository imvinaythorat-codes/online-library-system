import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BrowseBooksPage from './pages/BrowseBooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import NotFoundPage from './pages/NotFoundPage';

// Main layout wrapper for routes that should show the header.
function AppLayout() {
  return (
    <div className="app-frame">
      <Header />
      <main className="app-main">
        {/* Each page component uses the .page class for a subtle entrance animation */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BrowseBooksPage />} />
          {/* Dynamic category route: /books/:category */}
          <Route path="/books/:category" element={<BrowseBooksPage />} />
          {/* Details page for a single book */}
          <Route path="/book/:bookId" element={<BookDetailsPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* All standard pages share the header */}
      <Route path="/*" element={<AppLayout />} />
      {/* 404 page intentionally does NOT use the header to satisfy the assignment */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}