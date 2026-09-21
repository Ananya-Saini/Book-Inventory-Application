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
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '28px'
        }}>
            {books.map((book) => {
                const isLowStock = book.stockQuantity <= 10;
                const isOutOfStock = book.stockQuantity === 0;

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

                            {/* Title & Author */}
                            <h3 style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: 'var(--text-main)',
                                lineHeight: 1.3,
                                marginBottom: '6px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {book.title}
                            </h3>

                            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '14px' }}>
                                by {book.author}
                            </p>

                            {/* ISBN & Published Date */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                                fontSize: '0.78rem',
                                color: 'var(--text-dim)',
                                background: 'rgba(15, 23, 42, 0.4)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Hash size={14} color="#6366f1" />
                                    <span style={{ fontFamily: 'var(--font-mono)' }}>{book.isbn}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Calendar size={14} color="#06b6d4" />
                                    <span>{new Date(book.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer: Price & Actions */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '12px',
                            borderTop: '1px solid var(--border-subtle)'
                        }}>
                            <div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block' }}>Price</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
                                    ${Number(book.price).toFixed(2)}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                    className="btn btn-secondary btn-icon"
                                    onClick={() => onViewBook(book)}
                                    title="View Details"
                                >
                                    <Eye size={16} color="#94a3b8" />
                                </button>
                                <button
                                    className="btn btn-secondary btn-icon"
                                    onClick={() => onEditBook(book)}
                                    title="Edit Book"
                                >
                                    <Edit3 size={16} color="#818cf8" />
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
    )
}