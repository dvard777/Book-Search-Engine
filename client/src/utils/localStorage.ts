// client/src/utils/localStorage.ts
export const saveBookId = (bookId: string) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')!)
    : [];
  if (!savedBookIds.includes(bookId)) {
    savedBookIds.push(bookId);
    localStorage.setItem('saved_books', JSON.stringify(savedBookIds));
  }
};

export const getSavedBookIds = (): string[] =>
  localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')!)
    : [];

export const removeBookId = (bookId: string) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')!)
    : [];
  const updatedBookIds = savedBookIds.filter((id: string) => id !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedBookIds));
};
