import React, {useCallback, useEffect, useState} from 'react';

export default function App() {
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    author: '',
    genre: '',
    sortBy: ''
  });

  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [bookToEdit, setBookToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedBookDetails, setSelectedBookDetails] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({message, type});
  };

  const loadBooks = useCallback( async => {
    setIsLoading(true);
    setError(null);
    try{
      const data = fetchBooks(queryParams);
      setBooks(data.items || []);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 1);
      setHasNext(Boolean(data.hasNext));
      setHasPrev(Boolean(hasPrev));
      setIsConnected(true);
    }
    catch (err) {
      console.error('Error loading books:', err);
      setError(err.message || 'Failed to connect to backend server.');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    loadBooks()
  }, [loadBooks]);

  const availableGenres = Array.from(new Set([
    'Technology', 'Sci-Fi', 'Fiction', 'Business', 'Self-Help', 'History',
    ...books.map(b => b.genre).filter(Boolean)
  ])).sort();

  const handleQueryChange = (newParams) =>{
    setQueryParams(prev => ({...prev, ...newParams}));
  };

  const handleResetFilters = () => {
    setQueryParams({
      pageNumber: 1,
      pageSize: 10,
      searchTerm: '',
      genre: '',
      author: '',
      sortBy: ''
    });
  };

  const handleOpenAddModal = () => {
    setBookToEdit(null);
    setIsBookModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setBookToEdit(book);
    setIsBookModalOpen(true);
  };

  const handleBookFormSubmit = async (FormData) => {
    setIsSubmitting(true);
    try {
      if(bookToEdit){
        await updateBook(bookToEdit.id, FormData);
        showToast(`Successfully updated "${FormData.title}"`, 'success');
      }
      else{
        await createBook(FormData);
        showToast(`Successfully added "${FormData.title}"`, 'success');
      }
      setIsBookModalOpen(false);
      setBookToEdit(null);
      loadBooks();
    }
    catch(er){
      showToast(err.message, 'error');
    }
    finally{
      setIsSubmitting(false);
    }
  };
}