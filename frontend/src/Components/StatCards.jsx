import react from 'react';
import { BookOpen, Package, DollarSign, Layers } from 'lucide-react';

export default function StatCards({ books = [], totalCount = 0 }) {
    const totalBooks = books.reduce((acc, book) => acc + (book.quantity || 0), 0);
    const totalValue = books.reduce((acc, book) => acc + ((book.quantity || 0) * (book.price || 0)), 0);
    const uniqueGenres = new Set(books.map(book => book.genre)).size;

    const stats = [
        {
            title: 'Total Titles',
            value: totalCount,
            subtitle: 'Catalog size',
            icon: BookOpen,
            color: '#6366f1',
            bgGlow: 'rgba(99, 102, 241, 0.15)'
        },
        {
            title: 'Stock Quantity',
            value: totalStock.toLocaleString(),
            subtitle: 'Units in warehouse',
            icon: Package,
            color: '#06b6d4',
            bgGlow: 'rgba(6, 182, 212, 0.15)'
        },
        {
            title: 'Inventory Value',
            value: `$${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            subtitle: 'Page total valuation',
            icon: DollarSign,
            color: '#10b981',
            bgGlow: 'rgba(16, 185, 129, 0.15)'
        },
        {
            title: 'Active Genres',
            value: uniqueGenres,
            subtitle: 'Distinct categories',
            icon: Layers,
            color: '#ec4899',
            bgGlow: 'rgba(236, 72, 153, 0.15)'
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
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                            borderRadius: '12px',
                            background: stat.bgGlow,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${stat.color}33`
                        }}>
                            <Icon size={22} color={stat.color} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}