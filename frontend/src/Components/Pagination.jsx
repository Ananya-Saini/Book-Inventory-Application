import React from 'react';
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
    };

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
                            border: p === pageNumber ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            background: p === pageNumber ? '#2563eb' : '#ffffff',
                            color: p === pageNumber ? '#ffffff' : '#475569',
                            fontWeight: p === pageNumber ? 700 : 500,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            transition: 'all 0.15s ease'
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