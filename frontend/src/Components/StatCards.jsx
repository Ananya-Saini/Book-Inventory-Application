import React from 'react';
import { BookOpen, Package, DollarSign, Layers } from 'lucide-react';

export default function StatCards({ books = [], totalCount = 0 }) {
    const totalBooks = books.reduce((acc, book) => acc + (book.stockQuantity || book.quantity || 0), 0);
    const totalValue = books.reduce((acc, book) => acc + ((book.stockQuantity || book.quantity || 0) * (book.price || 0)), 0);
    const uniqueGenres = new Set(books.map(book => book.genre).filter(Boolean)).size;

    const stats = [
        {
            title: 'Total Titles',
            value: totalCount,
            subtitle: 'Catalog size',
            icon: BookOpen,
            color: '#2563eb',
            bgColor: '#eff6ff',
            borderColor: '#dbeafe'
        },
        {
            title: 'Stock Quantity',
            value: totalBooks.toLocaleString(),
            subtitle: 'Units on page',
            icon: Package,
            color: '#0284c7',
            bgColor: '#f0f9ff',
            borderColor: '#e0f2fe'
        },
        {
            title: 'Inventory Value',
            value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            subtitle: 'Page total valuation',
            icon: DollarSign,
            color: '#16a34a',
            bgColor: '#f0fdf4',
            borderColor: '#dcfce7'
        },
        {
            title: 'Active Genres',
            value: uniqueGenres,
            subtitle: 'Distinct categories',
            icon: Layers,
            color: '#7c3aed',
            bgColor: '#faf5ff',
            borderColor: '#f3e8ff'
        }
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            marginBottom: '28px'
        }}>
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={idx}
                        className="glass-panel glow-hover"
                        style={{
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                {stat.title}
                            </p>
                            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px', marginBottom: '2px' }}>
                                {stat.value}
                            </h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                {stat.subtitle}
                            </p>
                        </div>
                        <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '10px',
                            background: stat.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${stat.borderColor}`
                        }}>
                            <Icon size={22} color={stat.color} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}