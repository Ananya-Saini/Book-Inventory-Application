import React from 'react';
import { Eye, Edit3, Trash2, Calendar, Hash, AlertTriangle } from 'lucide-react';

export default function BookGrid({ books, onViewBook, onEditBook, onDeleteBook }) {
  const getGenreBadgeClass = (genre) => {
    switch (genre?.toLowerCase()) {
      case 'technology': return 'badge-tech';
      case 'sci-fi': return 'badge-scifi';
      case 'fiction': return 'badge-fiction';
      case 'business': return 'badge-business';
      default: return 'badge-generic';
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '28px'
    }}>
      {books.map((book) => {
        const isLowStock = (book.stockQuantity ?? 0) <= 5;
        const isOutOfStock = (book.stockQuantity ?? 0) === 0;
        return (
          <div
            key={book.id}
            className="glass-panel glow-hover"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Header: Genre Badge & Stock Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className={`badge ${getGenreBadgeClass(book.genre)}`}>
                  {book.genre}
                </span>

                {isOutOfStock ? (
                  <span className="badge badge-danger">Out of Stock</span>
                ) : isLowStock ? (
                  <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={12} /> Low: {book.stockQuantity}
                  </span>
                ) : (
                  <span className="badge badge-success">Stock: {book.stockQuantity}</span>
                )}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                lineHeight: 1.35,
                marginBottom: '6px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {book.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '14px' }}>
                by {book.author}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#64748b',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Hash size={13} color="#64748b" />
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{book.isbn}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} color="#64748b" />
                  <span>{new Date(book.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, display: 'block', letterSpacing: '0.04em' }}>Price</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>
                  ${Number(book.price).toFixed(2)}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-secondary btn-icon"
                  onClick={() => onViewBook(book)}
                  title="View Details"
                >
                  <Eye size={16} color="#64748b" />
                </button>
                <button
                  className="btn btn-secondary btn-icon"
                  onClick={() => onEditBook(book)}
                  title="Edit Book"
                >
                  <Edit3 size={16} color="#2563eb" />
                </button>
                <button
                  className="btn btn-danger btn-icon"
                  onClick={() => onDeleteBook(book)}
                  title="Delete Book"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}