import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book, isHighlighted = false }) {
  return (
    <article
      className={
        'book-card' + (isHighlighted ? ' book-card--highlighted' : '')
      }
    >
      {book.coverUrl && (
        <div className="book-cover-wrap">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="book-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="book-card-top">
        <p className="book-category">{book.category}</p>
        <span className="book-rating">{book.rating.toFixed(1)} ★</span>
      </div>

      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>

      <p className="book-description">
        {book.description.length > 140
          ? book.description.slice(0, 140) + '…'
          : book.description}
      </p>

      <div className="book-card-footer">
        <Link to={`/book/${book.id}`} className="btn btn-secondary">
          View Details
        </Link>
      </div>
    </article>
  );
}