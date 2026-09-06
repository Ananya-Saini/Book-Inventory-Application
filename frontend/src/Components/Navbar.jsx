import React from 'react';
import { BookOpen, Plus, Server } from 'lucide-react';

export default function Navbar({ OnOpenAddModal, isConnected, totalCount }) {
    return (
        <header className="glass-nav sticky top-0 z-50 px-6 py-4 mb-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                        padding: '10px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <BookOpen size={24} color="#ffffff" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Books A2Z
                            </h1>
                            <span className="badge badge-tech" style={{ fontSize: '0.7rem' }}>
                                Inventory v1.0
                            </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Layered ASP.NET Core & React Inventory Hub
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        borderRadius: '999px',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                    }}>
                        <Server size={14} color={isConnected ? '#10b981' : '#ef4444'} />
                        <span>API: {isConnected ? <span style={{ color: '#34d399', fontWeight: 600 }}>Connected</span> : <span style={{ color: '#f87171', fontWeight: 600 }}>Connecting...</span>}</span>
                        {totalCount !== undefined && (
                            <span style={{ marginLeft: '6px', paddingLeft: '8px', borderLeft: '1px solid #334155', color: '#cbd5e1', fontWeight: 600 }}>
                                {totalCount} Books
                            </span>
                        )}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={onOpenAddModal}
                    >
                        <Plus size={18} />
                        <span>Add Book</span>
                    </button>
                </div>
            </div>
        </header >
    );
}