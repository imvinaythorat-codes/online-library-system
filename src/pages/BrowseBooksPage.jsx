import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { selectAllBooks, selectCategories } from '../store/booksSlice';
import BookCard from '../components/BookCard';

// Main listing page where students can show filtering and searching logic.
export default function BrowseBooksPage() {
  const allBooks = useSelector(selectAllBooks);
  const categories = useSelector(selectCategories);

  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');

  const activeCategory = category || 'All';

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      navigate('/books');
    } else {
      navigate(`/books/${encodeURIComponent(cat)}`);
    }
  };

  // If a book was just added, its id is carried in navigation state.
  const newlyAddedBookId = location.state?.newBookId || null;

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchesCategory =
        activeCategory === 'All' || book.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase();
      return (
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
      );
    });
  }, [allBooks, activeCategory, searchTerm]);

  return (
    <section className="page page-browse">
      <header className="page-header">
        <h1 className="page-title">Browse Books</h1>
        <p className="page-subtitle">
          Filter by category, search by title or author, and open details for
          anything that catches your eye.
        </p>
      </header>

      <div className="toolbar">
        <div className="toolbar-left">
          <span className="toolbar-label">Categories</span>
          <div className="category-pills">
            <button
              type="button"
              onClick={() => handleCategoryClick('All')}
              className={
                'pill' + (activeCategory === 'All' ? ' pill-solid' : '')
              }
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={
                  'pill' + (activeCategory === cat ? ' pill-solid' : '')
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="toolbar-right">
          <label className="search-label" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            type="text"
            className="search-input"
            placeholder="Search by title or author…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="muted-text">
          No books match that combination yet. Try clearing the search box or
          switching categories.
        </p>
      ) : (
        <div className="book-card-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isHighlighted={book.id === newlyAddedBookId}
            />
          ))}
        </div>
      )}
    </section>
  );
}