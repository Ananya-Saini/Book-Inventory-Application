import React, {useState} from 'react';

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
}