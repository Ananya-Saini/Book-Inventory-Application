import React from 'react';
import { Search, Filter, User, ArrowUpDown, RotateCcw, LayoutGrid, List } from 'lucide-react';

export default function FilterBar({
    queryParams,
    onQueryChange,
    onResetFilters,
    viewMode,
    onViewModeChange,
    availableGenres = []
}) {
    return (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px',
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative' }}>
                    <Search
                        size={16}
                        color="var(--text-dim)"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}
                    />
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '44px' }}
                        placeholder="Search by Title or ISBN..."
                        value={queryParams.searchTerm || ''}
                        onChange={(e) => onQueryChange({ searchTerm: e.target.value, pageNumber: 1 })}
                    />
                </div>

                <div style={{ position: 'relative' }}>
                    <Filter
                        size={16}
                        color="var(--text-dim)"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}
                    />
                    <select
                        className="form-select"
                        style={{ paddingLeft: '44px' }}
                        value={queryParams.genre || ''}
                        onChange={(e) => onQueryChange({ genre: e.target.value, pageNumber: 1 })}
                    >
                        <option value="">All Genres</option>
                        {availableGenres.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div style={{ position: 'relative' }}>
                    <User
                        size={16}
                        color="var(--text-dim)"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}
                    />
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '44px' }}
                        placeholder="Filter by Author..."
                        value={queryParams.author || ''}
                        onChange={(e) => onQueryChange({ author: e.target.value, pageNumber: 1 })}
                    />
                </div>

                <div style={{ position: 'relative' }}>
                    <ArrowUpDown
                        size={16}
                        color="var(--text-dim)"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}
                    />
                    <select
                        className="form-select"
                        style={{ paddingLeft: '44px' }}
                        value={queryParams.sortBy || ''}
                        onChange={(e) => onQueryChange({ sortBy: e.target.value })}
                    >
                        <option value="">Sort by Default (ID)</option>
                        <option value="title_asc">Title (A - Z)</option>
                        <option value="title_desc">Title (Z - A)</option>
                        <option value="author_asc">Author (A - Z)</option>
                        <option value="author_desc">Author (Z - A)</option>
                        <option value="price_asc">Price (Low → High)</option>
                        <option value="price_desc">Price (High → Low)</option>
                        <option value="date_desc">Published (Newest)</option>
                        <option value="date_asc">Published (Oldest)</option>
                    </select>
                </div>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <button
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={onResetFilters}
                >
                    <RotateCcw size={14} />
                    <span>Reset Filters</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        <span>Show:</span>
                        <select
                            className="form-select"
                            style={{ width: '75px', padding: '4px 24px 4px 8px', fontSize: '0.82rem' }}
                            value={queryParams.pageSize || 10}
                            onChange={(e) => onQueryChange({ pageSize: Number(e.target.value), pageNumber: 1 })}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <div style={{
                        display: 'flex',
                        background: '#f1f5f9',
                        padding: '3px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <button
                            onClick={() => onViewModeChange('grid')}
                            style={{
                                background: viewMode === 'grid' ? '#ffffff' : 'transparent',
                                color: viewMode === 'grid' ? '#2563eb' : '#64748b',
                                border: 'none',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                fontWeight: viewMode === 'grid' ? 600 : 400
                            }}
                            title="Grid View"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => onViewModeChange('table')}
                            style={{
                                background: viewMode === 'table' ? '#ffffff' : 'transparent',
                                color: viewMode === 'table' ? '#2563eb' : '#64748b',
                                border: 'none',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                fontWeight: viewMode === 'table' ? 600 : 400
                            }}
                            title="Table View"
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}