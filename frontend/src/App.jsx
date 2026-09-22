import React, { useCallback, useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, BookOpen, Trash2 } from 'lucide-react';

import Navbar from './Components/Navbar';
import StatCards from './Components/StatCards';
import FilterBar from './Components/FilterBar';
import BookGrid from './Components/BookGrid';
import BookTable from './Components/BookTable';
import Pagination from './Components/Pagination';
import BookModel from './Components/BookModel';
import BookDetailModel from './Components/BookDetailModel';
import Toast from './Components/Toast';

import { fetchBooks, createBook, updateBook, deleteBook } from './api/booksApi';

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

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedBookDetails, setSelectedBookDetails] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(queryParams);
      setBooks(data.items || []);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 1);
      setHasNext(Boolean(data.hasNext));
      setHasPrev(Boolean(data.hasPrevious));
      setIsConnected(true);
    } catch (err) {
      console.error('Error loading books:', err);
      setError(err.message || 'Failed to connect to backend server.');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    loadBooks();
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

  const handleBookFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (bookToEdit) {
        await updateBook(bookToEdit.id, formData);
        showToast(`Successfully updated "${formData.title}"`, 'success');
      } else {
        await createBook(formData);
        showToast(`Successfully added "${formData.title}"`, 'success');
      }
      setIsBookModalOpen(false);
      setBookToEdit(null);
      loadBooks();
    } catch (err) {
      showToast(err.message || 'An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteBook = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook(bookToDelete.id);
      showToast(`Successfully deleted "${bookToDelete.title}"`, 'success');
      setBookToDelete(null);
      loadBooks();
    } catch (err) {
      showToast(err.message || 'Failed to delete book', 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <Navbar
        onOpenAddModal={handleOpenAddModal}
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
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderColor: '#fecaca', background: '#fef2f2' }}>
            <AlertCircle size={40} color="#dc2626" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#991b1b', marginBottom: '6px' }}>
              Connection Error
            </h3>
            <p style={{ color: '#b91c1c', marginBottom: '16px', maxWidth: '480px', margin: '0 auto 16px' }}>
              {error}
            </p>
            <button className="btn btn-primary" onClick={loadBooks}>
              <RefreshCw size={16} /> Retry Connection
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <BookOpen size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
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
                onViewBook={(book) => setSelectedBookDetails(book)}
                onEditBook={handleOpenEditModal}
                onDeleteBook={(book) => setBookToDelete(book)}
              />
            ) : (
              <BookTable
                books={books}
                onViewBook={(book) => setSelectedBookDetails(book)}
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
              hasPrevious={hasPrev}
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
        book={selectedBookDetails}
        onClose={() => setSelectedBookDetails(null)}
      />

      {bookToDelete && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '24px', maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#fee2e2', padding: '10px', borderRadius: '10px', border: '1px solid #fecaca' }}>
                <Trash2 size={24} color="#dc2626" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Confirm Deletion</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>This action cannot be undone.</p>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '20px' }}>
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

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}