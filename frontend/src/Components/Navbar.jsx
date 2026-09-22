import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

export default function Navbar({ onOpenAddModal, OnOpenAddModal, isConnected, totalCount }) {
    const handleAddClick = onOpenAddModal || OnOpenAddModal;

    return (
        <header className="glass-nav sticky top-0 z-50 mb-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 24px',
                height: '68px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
            }}>
                {/* Brand Logo & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        background: '#2563eb',
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <BookOpen size={20} color="#ffffff" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h1 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            letterSpacing: '-0.025em',
                            color: '#0f172a',
                            margin: 0,
                            lineHeight: 1
                        }}>
                            Books A2Z
                        </h1>
                        <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: '#f1f5f9',
                            color: '#475569',
                            border: '1px solid #e2e8f0'
                        }}>
                            v1.0
                        </span>
                    </div>
                </div>

                {/* Right Actions & Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Live Status Pill */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        background: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.8rem',
                        color: '#64748b'
                    }}>
                        <span style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: isConnected ? '#16a34a' : '#dc2626',
                            boxShadow: isConnected ? '0 0 0 3px rgba(22, 163, 74, 0.18)' : '0 0 0 3px rgba(220, 38, 38, 0.18)'
                        }} />
                        <span style={{ fontWeight: 500, color: isConnected ? '#15803d' : '#b91c1c' }}>
                            {isConnected ? 'Live Sync' : 'Connecting...'}
                        </span>
                        {totalCount !== undefined && (
                            <span style={{
                                marginLeft: '4px',
                                paddingLeft: '8px',
                                borderLeft: '1px solid #e2e8f0',
                                color: '#334155',
                                fontWeight: 600
                            }}>
                                {totalCount} Books
                            </span>
                        )}
                    </div>

                    {/* Add Book CTA */}
                    <button
                        className="btn btn-primary"
                        onClick={handleAddClick}
                        style={{ height: '38px', padding: '0 16px', fontSize: '0.86rem' }}
                    >
                        <Plus size={16} />
                        <span>Add Book</span>
                    </button>
                </div>
            </div>
        </header>
    );
}