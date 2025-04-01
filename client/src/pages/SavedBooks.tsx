// client/src/pages/SavedBooks.tsx
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({ variables: { bookId } });
      removeBookId(bookId);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading saved books.</p>;

  return (
    <div>
      <h1>Saved Books</h1>
      {userData.savedBooks?.length ? (
        userData.savedBooks.map((book: any) => (
          <div key={book.bookId}>
            <h2>{book.title}</h2>
            <button onClick={() => handleDeleteBook(book.bookId)}>Remove Book</button>
          </div>
        ))
      ) : (
        <p>No saved books found.</p>
      )}
    </div>
  );
};

export default SavedBooks;
