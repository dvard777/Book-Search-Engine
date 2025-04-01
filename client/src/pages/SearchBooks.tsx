// client/src/pages/SearchBooks.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { saveBookId } from '../utils/localStorage';

const SearchBooks: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState<any[]>([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const { items } = await response.json();
      const books = items.map((item: any) => {
        const info = item.volumeInfo;
        return {
          bookId: item.id,
          title: info.title,
          authors: info.authors || ['Unknown Author'],
          description: info.description || 'No description available.',
          image: info.imageLinks?.thumbnail || '',
          link: info.infoLink
        };
      });
      setSearchedBooks(books);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveBook = async (bookId: string) => {
    const bookToSave = searchedBooks.find(book => book.bookId === bookId);
    if (!bookToSave) return;
    try {
      const { data } = await saveBook({
        variables: { input: { ...bookToSave } }
      });
      saveBookId(bookId);
      console.log('Book saved:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Books</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchedBooks.map(book => (
          <div key={book.bookId}>
            <h2>{book.title}</h2>
            <p>{book.authors.join(', ')}</p>
            <p>{book.description}</p>
            {book.image && <img src={book.image} alt={book.title} />}
            <a href={book.link} target="_blank" rel="noopener noreferrer">More Info</a>
            <button onClick={() => handleSaveBook(book.bookId)}>Save Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
