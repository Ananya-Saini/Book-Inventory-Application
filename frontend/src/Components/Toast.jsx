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
      minWidth: '320px',
      maxWidth: '440px',
      background: '#ffffff',
      border: `1px solid ${isError ? '#fecaca' : isSuccess ? '#bbf7d0' : '#dbeafe'}`,
      borderLeft: `4px solid ${isError ? '#dc2626' : isSuccess ? '#16a34a' : '#2563eb'}`,
      borderRadius: '10px',
      padding: '14px 18px',
      boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      animation: 'slideUp 0.2s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isError ? (
          <AlertCircle size={20} color="#dc2626" />
        ) : isSuccess ? (
          <CheckCircle2 size={20} color="#16a34a" />
        ) : (
          <Info size={20} color="#2563eb" />
        )}
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
            {isError ? 'Error' : isSuccess ? 'Success' : 'Notice'}
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            {toast.message}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
