import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllBooks, selectCategories } from '../store/booksSlice';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const books = useSelector(selectAllBooks);
  const categories = useSelector(selectCategories);

  const popularBooks = books.filter((book) => book.isPopular);

  return (
    <section className="page page-home">
      <div className="page-header">
        <h1 className="page-title">Welcome to the Online Library</h1>
        <p className="page-subtitle">
          Browse curated titles across multiple genres, keep track of what
          you've read, and add books as your collection grows.
        </p>
      </div>

      <div className="home-grid">
        <section className="home-panel">
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-help">
            Jump directly into a shelf that matches your current mood.
          </p>

          <div className="category-pills">
            <Link to="/books" className="pill pill-solid">
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/books/${encodeURIComponent(category)}`}
                className="pill"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section className="home-panel">
          <h2 className="section-title">Popular Right Now</h2>
          {popularBooks.length === 0 ? (
            <p className="muted-text">
              No popular books are marked yet. Try adding a few titles on the
              web by using add book on page.
            </p>
          ) : (
            <div className="book-card-grid">
              {popularBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}