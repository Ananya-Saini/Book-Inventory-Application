import React, { useCallback, useEffect, useState } from 'react';

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
    setToast({ message, type });
  };

  const loadBooks = useCallback(async => {
    setIsLoading(true);
    setError(null);
    try {
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

  const handleQueryChange = (newParams) => {
    setQueryParams(prev => ({ ...prev, ...newParams }));
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
      if (bookToEdit) {
        await updateBook(bookToEdit.id, FormData);
        showToast(`Successfully updated "${FormData.title}"`, 'success');
      }
      else {
        await createBook(FormData);
        showToast(`Successfully added "${FormData.title}"`, 'success');
      }
      setIsBookModalOpen(false);
      setBookToEdit(null);
      loadBooks();
    }
    catch (er) {
      showToast(err.message, 'error');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteBook = async () => {
    if (!BookToDelete) return;
    try {
      await deleteBook(bookToDelete.id);
      showToast(`Successfully deleted "${bookToDelete.title}"`, 'success');
      setBookToDelete(null);
      loadBooks();
    }
    catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <NavBar
        OnOpenAddModal={handleOpenAddModal}
        isConnected={isConnected}
        totalCount={totalCount}
      />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <StatCards books={books} totalCount={totalCount} />

        <FilterBar
          queryParams={queryParams}
          onQueryChange={handleQueryChange}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          availableGenres={availableGenres}
        />

        {isLoading ? (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: 'var(--accent-primary)' }} />
            <p style={{ fontWeight: 600 }}>Loading inventory records...</p>
          </div>
        ) : error ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
            <AlertCircle size={40} color="#f87171" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f87171', marginBottom: '6px' }}>
              Connection Error
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', maxWidth: '480px', margin: '0 auto 16px' }}>
              {error}
            </p>
            <button className="btn btn-primary" onClick={loadBooks}>
              <RefreshCw size={16} /> Retry Connection
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <BookOpen size={48} color="#64748b" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              No Books Found
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '18px' }}>
              Try adjusting your search criteria or add a new book to the inventory.
            </p>
            <button className="btn btn-secondary" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <BookGrid
                books={books}
                onViewBook={(book) => getSelectedBookDetails(book)}
                onEditBook={handleOpenEditModal}
                onDeleteBook={(book) => setBookToDelete(book)}
              />
            ) : (
              <BookTable
                books={books}
                onViewBook={(book) => getSelectedBookDetails(book)}
                onEditBook={handleOpenEditModal}
                onDeleteBook={(book) => setBookToDelete(book)}
              />
            )}
            <Pagination
              pageNumber={queryParams.pageNumber}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={queryParams.pageSize}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              onPageChange={(page) => handleQueryChange({ pageNumber: page })}
            />
          </>
        )}
      </main>

      <BookModel
        isOpen={isBookModalOpen}
        onClose={() => { setIsBookModalOpen(false); setBookToEdit(null); }}
        onSubmit={handleBookFormSubmit}
        bookToEdit={bookToEdit}
        isSubmitting={isSubmitting}
      />

      <BookDetailModel
        book={selectedBookDetail}
        onClose={() => setSelectedBookDetail(null)}
      />

      {bookToDelete && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '24px', maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '10px', borderRadius: '12px' }}>
                <Trash2 size={24} color="#f87171" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Confirm Deletion</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>This action cannot be undone.</p>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '20px' }}>
              Are you sure you want to remove <strong>"{bookToDelete.title}"</strong> (ISBN: {bookToDelete.isbn}) from the inventory?
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setBookToDelete(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDeleteBook}>
                Delete Book
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastComponent toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}