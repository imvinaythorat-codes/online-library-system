import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { selectBookById } from '../store/booksSlice';

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = useSelector((state) => selectBookById(state, bookId));

  if (!book) {
    return (
      <section className="page">
        <h1 className="page-title">Book Not Found</h1>
        <p className="muted-text">
          The book you are looking for is not available in the current list.
        </p>
        <Link to="/books" className="btn btn-primary">
          Back to Browse
        </Link>
      </section>
    );
  }

  const year = book.publishedDate
    ? new Date(book.publishedDate).getFullYear()
    : null;

  return (
    <section className="page page-details">
      {book.coverUrl && (
        <div className="details-hero">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="details-hero-img"
          />
          <div className="details-hero-overlay" />
        </div>
      )}

      <header className="page-header details-header">
        <h1 className="page-title">{book.title}</h1>
        <p className="page-subtitle">
          by <strong>{book.author}</strong>
          {year && <span className="details-year"> • {year}</span>}
        </p>
      </header>

      <div className="details-layout">
        <div className="details-main">
          <p className="details-meta">
            <span className="badge badge-soft">{book.category}</span>
            <span className="badge badge-rating">
              Rating: {book.rating.toFixed(1)} ★
            </span>
          </p>

          <p className="details-description">{book.description}</p>
        </div>
      </div>

      <div className="details-actions">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
        >
          Back
        </button>
        <Link to="/books" className="btn btn-ghost">
          Go to Browse
        </Link>
      </div>
    </section>
  );
}