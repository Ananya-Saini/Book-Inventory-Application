import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      minWidth: '300px',
      maxWidth: '420px',
      background: isError ? '#1f1315' : isSuccess ? '#0d1f18' : '#131b2e',
      border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.4)' : isSuccess ? 'rgba(16, 185, 129, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`,
      borderRadius: '12px',
      padding: '14px 18px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      animation: 'slideUp 0.25s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isError ? (
          <AlertCircle size={20} color="#f87171" />
        ) : isSuccess ? (
          <CheckCircle2 size={20} color="#34d399" />
        ) : (
          <Info size={20} color="#818cf8" />
        )}
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
            {isError ? 'Error' : isSuccess ? 'Success' : 'Notice'}
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {toast.message}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '4px' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
