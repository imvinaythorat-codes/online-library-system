import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialBooks = [
  {
    id: '1',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    publishedDate: '1937-01-01',
    category: 'Self-Help',
    description:
      'Self help book focusing on personal development and success principles.',
    rating: 4.6,
    isPopular: true,
    coverUrl: '/books/think-and-grow-rich.webp',
  },
  {
    id: '2',
    title: 'Zero to One',
    author: 'Peter Thiel',
    publishedDate: '2014-09-16',
    category: 'Self-Help',
    description:
      'Self help book focusing on startups, innovation, and building successful businesses.',
    rating: 4.4,
    isPopular: true,
    coverUrl: '/books/zero-to-one.webp',
  },
  {
    id: '3',
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    publishedDate: '1997-01-01',
    category: 'Self-Help',
    description: 'A book about financial education and investing.',
    rating: 4.3,
    isPopular: true,
    coverUrl: '/books/rich-dad-poor-dad.webp',
  },
  {
    id: '4',
    title: 'Bhagavad Gita',
    author: 'Sage Vyasa',
    publishedDate: '1637-01-01',
    category: 'Self-Help',
    description:
      'A spiritual and philosophical text that discusses duty, righteousness, and the nature of existence.',
    rating: 4.9,
    isPopular: false,
    coverUrl: '/books/bhagavad-gita.webp',
  },
  {
    id: '5',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    publishedDate: '2020-01-01',
    category: 'Self-Help',
    description: 'A book about how people think about money and investing.',
    rating: 4.7,
    isPopular: true,
    coverUrl: '/books/psychology-of-money.webp',
  },
  {
    id: '6',
    title: 'Ikigai',
    author: 'Héctor García',
    publishedDate: '2016-01-01',
    category: 'Self-Help',
    description: 'A book about finding purpose and meaning in life.',
    rating: 4.2,
    isPopular: false,
    coverUrl: '/books/ikigai.webp',
  },
  {
    id: '7',
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    publishedDate: '2020-09-08',
    category: 'Self-Help',
    description: 'A book about using monk principles to live a calmer life.',
    rating: 4.3,
    isPopular: false,
    coverUrl: '/books/think-like-a-monk.webp',
  },
  {
    id: '8',
    title: 'The C++ Programming Language',
    author: 'Bjarne Stroustrup',
    publishedDate: '2013-05-19',
    category: 'Programming',
    description: 'A comprehensive guide to the C++ programming language.',
    rating: 4.5,
    isPopular: true,
    coverUrl: '/books/cpp-programming-language.webp',
  },
  {
    id: '9',
    title: 'Ferry Tales',
    author: 'James Krüss',
    publishedDate: '1964-01-01',
    category: "Children's Literature",
    description: 'A collection of stories about ferry journeys.',
    rating: 4.0,
    isPopular: false,
    coverUrl: '/books/ferry-tales.webp',
  },
  {
    id: '10',
    title: 'American Gods',
    author: 'Neil Gaiman',
    publishedDate: '2001-01-01',
    category: 'Fantasy',
    description:
      'A novel that mixes American culture, mythology, and ancient and modern gods.',
    rating: 4.4,
    isPopular: false,
    coverUrl: '/books/american-gods.webp',
  },
];

// Slice manages the array of books and exposes an action to add a new one.
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    list: initialBooks,
  },
  reducers: {
    addBook: {
      reducer(state, action) {
        state.list.unshift(action.payload);
      },
      prepare(values) {
        const { title, author, category, description, rating } = values;

        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            author: author.trim(),
            category,
            description: description.trim(),
            rating: Number(rating),
            isPopular: false,
            coverUrl: '', // user-added books; cards handle empty cover
          },
        };
      },
    },
  },
});

export const { addBook } = booksSlice.actions;

export const selectAllBooks = (state) => state.books.list;

export const selectBookById = (state, bookId) =>
  state.books.list.find((book) => String(book.id) === String(bookId));

export const selectCategories = (state) => {
  const set = new Set(state.books.list.map((b) => b.category));
  return Array.from(set).sort();
};

export default booksSlice.reducer;