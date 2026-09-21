import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function Pagination({
    pageNumber = 1,
    totalPages = 1,
    totalCount = 0,
    pageSize = 10,
    hasNext = false,
    hasPrevious = false,
    onPageChange
}) {
    if (totalCount === 0) return null;

    const startItem = (pageNumber - 1) * pageSize + 1;
    const endItem = Math.min(pageNumber * pageSize, totalCount);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, pageNumber - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    return (
        <div className="glass-panel" style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
        }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing <strong style={{ color: 'var(--text-main)' }}>{startItem}</strong> to <strong style={{ color: 'var(--text-main)' }}>{endItem}</strong> of <strong style={{ color: 'var(--text-main)' }}>{totalCount}</strong> books
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Previous Button */}
                <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                    disabled={!hasPrevious}
                    onClick={() => onPageChange(pageNumber - 1)}
                >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                </button>

                {getPageNumbers().map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            border: p === pageNumber ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                            background: p === pageNumber ? 'var(--accent-primary)' : 'rgba(15, 23, 42, 0.6)',
                            color: p === pageNumber ? '#ffffff' : 'var(--text-muted)',
                            fontWeight: p === pageNumber ? 700 : 500,
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        {p}
                    </button>
                ))}

                <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                    disabled={!hasNext}
                    onClick={() => onPageChange(pageNumber + 1)}
                >
                    <span>Next</span>
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}