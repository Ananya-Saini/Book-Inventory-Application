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
              background: '#2563eb',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
            }}>
              <BookOpen size={20} color="#ffffff" />
            </div>
            <div>
              <span className="badge badge-tech" style={{ marginBottom: '4px' }}>Book Details</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
          
          <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              <User size={14} color="#64748b" />
              <span>AUTHOR</span>
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{book.author}</p>
          </div>

          <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Tag size={14} color="#64748b" />
              <span>GENRE</span>
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{book.genre}</p>
          </div>

          <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Hash size={14} color="#64748b" />
              <span>ISBN</span>
            </div>
            <p style={{ fontWeight: 600, color: '#0f172a', fontFamily: 'var(--font-mono)', fontSize: '0.92rem' }}>{book.isbn}</p>
          </div>

          <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              <DollarSign size={14} color="#16a34a" />
              <span>PRICE</span>
            </div>
            <p style={{ fontWeight: 800, color: '#2563eb', fontSize: '1.2rem' }}>${Number(book.price).toFixed(2)}</p>
          </div>

          <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Package size={14} color="#d97706" />
              <span>STOCK QUANTITY</span>
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              {book.stockQuantity} units
            </p>
          </div>

          <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Calendar size={14} color="#64748b" />
              <span>PUBLISHED DATE</span>
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>
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
          color: 'var(--text-muted)'
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
