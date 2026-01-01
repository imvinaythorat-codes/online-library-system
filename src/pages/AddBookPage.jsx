import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook, selectCategories } from '../store/booksSlice';
// Form page for adding a new book to the Redux list.
const FALLBACK_CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Sci-Fi',
  'Fantasy',
  'Self-Help',
  'Biography',
];

export default function AddBookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingCategories = useSelector(selectCategories);

  // Use existing categories if there are any; otherwise fall back to a static list.
  const categories =
    existingCategories.length > 0 ? existingCategories : FALLBACK_CATEGORIES;

  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    category: categories[0] || 'Fiction',
    description: '',
    rating: '4.0',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.title.trim()) newErrors.title = 'Title is required.';
    if (!formValues.author.trim()) newErrors.author = 'Author is required.';
    if (!formValues.description.trim())
      newErrors.description = 'Description is required.';

    const ratingNumber = Number(formValues.rating);
    if (!formValues.rating) {
      newErrors.rating = 'Rating is required.';
    } else if (Number.isNaN(ratingNumber)) {
      newErrors.rating = 'Rating must be a number.';
    } else if (ratingNumber < 1 || ratingNumber > 5) {
      newErrors.rating = 'Rating should be between 1.0 and 5.0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!validate()) return;

    const action = dispatch(addBook(formValues));

    // After successfully adding, redirect user to Browse page
    // and pass the new book id so we can highlight it visually.
    const newBookId = action.payload.id;

    navigate('/books', {
      state: { newBookId },
    });
  };

  return (
    <section className="page page-add">
      <header className="page-header">
        <h1 className="page-title">Add a New Book</h1>
        <p className="page-subtitle">
          Fill out all fields to add a title to the shared library catalogue.
        </p>
      </header>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={
              'form-input' + (errors.title ? ' form-input-error' : '')
            }
            value={formValues.title}
            onChange={handleChange}
            placeholder="e.g. The Art of Focused Learning"
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="author">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className={
              'form-input' + (errors.author ? ' form-input-error' : '')
            }
            value={formValues.author}
            onChange={handleChange}
            placeholder="Author name"
          />
          {errors.author && <p className="form-error">{errors.author}</p>}
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="form-input"
            value={formValues.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className={
              'form-input form-textarea' +
              (errors.description ? ' form-input-error' : '')
            }
            value={formValues.description}
            onChange={handleChange}
            placeholder="Write a short description of the book…"
            rows={4}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="rating">
            Rating (1.0 – 5.0)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            className={
              'form-input form-input--small' +
              (errors.rating ? ' form-input-error' : '')
            }
            value={formValues.rating}
            onChange={handleChange}
          />
          {errors.rating && <p className="form-error">{errors.rating}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </div>
      </form>
    </section>
  );
}