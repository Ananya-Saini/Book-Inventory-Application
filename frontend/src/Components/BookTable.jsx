import React from 'react';
import { Eye, Edit3, Trash2, AlertTriangle } from 'lucide-react';

export default function BookTable({ books, onViewBook, onEditBook, onDeleteBook }) {
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
        <div className="glass-panel" style={{ overflowX: 'auto', marginBottom: '28px', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: '#f8fafc' }}>
                        <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)' }}>Book</th>
                        <th style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-muted)' }}>Genre</th>
                        <th style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-muted)' }}>Price</th>
                        <th style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-muted)' }}>Stock</th>
                        <th style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-muted)' }}>Published</th>
                        <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => {
                        const isLowStock = (book.stockQuantity ?? 0) <= 5;
                        const isOutOfStock = (book.stockQuantity ?? 0) === 0;

                        return (
                            <tr
                                key={book.id}
                                style={{
                                    borderBottom: '1px solid #f1f5f9',
                                    transition: 'background 0.15s ease'
                                }}
                                className="table-row-hover"
                            >
                                <td style={{ padding: '14px 20px' }}>
                                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                                        {book.title}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                        <span>by {book.author}</span>
                                        <span>•</span>
                                        <span style={{ fontFamily: 'var(--font-mono)' }}>ISBN: {book.isbn}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                                    <span className={`badge ${getGenreBadgeClass(book.genre)}`}>
                                        {book.genre}
                                    </span>
                                </td>
                                <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontWeight: 700, color: '#2563eb' }}>
                                    ${Number(book.price).toFixed(2)}
                                </td>
                                <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                                    {isOutOfStock ? (
                                        <span className="badge badge-danger">Out of Stock</span>
                                    ) : isLowStock ? (
                                        <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <AlertTriangle size={12} /> Low: {book.stockQuantity}
                                        </span>
                                    ) : (
                                        <span className="badge badge-success">Stock: {book.stockQuantity}</span>
                                    )}
                                </td>
                                <td style={{ padding: '14px 16px', verticalAlign: 'middle', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                                    {new Date(book.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                                <td style={{ padding: '14px 20px', verticalAlign: 'middle', textAlign: 'right' }}>
                                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                                        <button
                                            className="btn btn-secondary btn-icon"
                                            onClick={() => onViewBook(book)}
                                            title="View Details"
                                        >
                                            <Eye size={15} color="#64748b" />
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-icon"
                                            onClick={() => onEditBook(book)}
                                            title="Edit Book"
                                        >
                                            <Edit3 size={15} color="#2563eb" />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-icon"
                                            onClick={() => onDeleteBook(book)}
                                            title="Delete Book"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}