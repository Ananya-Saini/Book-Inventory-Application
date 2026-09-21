import React from 'react';
import { X, BookOpen, User, Tag, Hash, DollarSign, Package, Calendar, Clock } from 'lucide-react';

export default function BookDetailModel({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: '28px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={22} color="#ffffff" />
            </div>
            <div>
              <span className="badge badge-tech" style={{ marginBottom: '4px' }}>Book Details</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {book.title}
              </h2>
            </div>
          </div>
          <button 
            className="btn btn-secondary btn-icon" 
            onClick={onClose}
            style={{ borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              <User size={14} color="#818cf8" />
              <span>AUTHOR</span>
            </div>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.98rem' }}>{book.author}</p>
          </div>

          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              <Tag size={14} color="#38bdf8" />
              <span>GENRE</span>
            </div>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.98rem' }}>{book.genre}</p>
          </div>

          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              <Hash size={14} color="#6366f1" />
              <span>ISBN</span>
            </div>
            <p style={{ fontWeight: 700, color: '#818cf8', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{book.isbn}</p>
          </div>

          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              <DollarSign size={14} color="#10b981" />
              <span>PRICE</span>
            </div>
            <p style={{ fontWeight: 800, color: '#38bdf8', fontSize: '1.2rem' }}>${Number(book.price).toFixed(2)}</p>
          </div>

          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              <Package size={14} color="#f59e0b" />
              <span>STOCK QUANTITY</span>
            </div>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.98rem' }}>
              {book.stockQuantity} units
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              <Calendar size={14} color="#ec4899" />
              <span>PUBLISHED DATE</span>
            </div>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              {new Date(book.publishedDate).toLocaleDateString(undefined, { dateStyle: 'full' })}
            </p>
          </div>

        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.78rem',
          color: 'var(--text-dim)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} />
            <span>Added to inventory: {book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}</span>
          </div>

          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
