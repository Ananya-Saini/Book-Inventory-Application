import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle } from 'lucide-react';

export default function BookModel({ isOpen, onClose, onSubmit, bookToEdit = null, isSubmitting = false }) {
    const isEdit = Boolean(bookToEdit);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        price: '',
        stockQuantity: '',
        publishedDate: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title || '',
                author: bookToEdit.author || '',
                genre: bookToEdit.genre || '',
                isbn: bookToEdit.isbn || '',
                price: bookToEdit.price !== undefined ? bookToEdit.price : '',
                stockQuantity: bookToEdit.stockQuantity !== undefined ? bookToEdit.stockQuantity : '',
                publishedDate: bookToEdit.publishedDate ? bookToEdit.publishedDate.split('T')[0] : ''
            });
        } else {
            setFormData({
                title: '',
                author: '',
                genre: 'Technology',
                isbn: '',
                price: '19.99',
                stockQuantity: '10',
                publishedDate: new Date().toISOString().split('T')[0]
            });
        }
        setErrors({});
    }, [bookToEdit, isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const errs = {};
        if (!formData.title.trim()) errs.title = 'Title is required.';
        if (!formData.author.trim()) errs.author = 'Author is required.';
        if (!formData.genre.trim()) errs.genre = 'Genre is required.';
        if (!isEdit && !formData.isbn.trim()) errs.isbn = 'ISBN is required.';
        if (!formData.price || Number(formData.price) <= 0) errs.price = 'Price must be greater than 0.';
        if (formData.stockQuantity === '' || Number(formData.stockQuantity) < 0) errs.stockQuantity = 'Stock must be non-negative.';
        if (!formData.publishedDate) errs.publishedDate = 'Published date is required.';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            title: formData.title.trim(),
            author: formData.author.trim(),
            genre: formData.genre.trim(),
            isbn: formData.isbn.trim(),
            price: Number(formData.price),
            stockQuantity: Number(formData.stockQuantity),
            publishedDate: new Date(formData.publishedDate).toISOString()
        };

        onSubmit(payload);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ padding: '28px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            background: isEdit ? '#eff6ff' : '#f0fdf4',
                            padding: '8px',
                            borderRadius: '8px',
                            border: `1px solid ${isEdit ? '#dbeafe' : '#dcfce7'}`
                        }}>
                            {isEdit ? <Save size={20} color="#2563eb" /> : <PlusCircle size={20} color="#16a34a" />}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                {isEdit ? 'Edit Book Record' : 'Add New Book'}
                            </h2>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {isEdit ? `Updating ID #${bookToEdit.id}` : 'Fill details to add book to inventory'}
                            </p>
                        </div>
                    </div>
                    <button
                        className="btn btn-secondary btn-icon"
                        onClick={onClose}
                        style={{ borderRadius: '50%' }}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <span>Book Title *</span>
                            {errors.title && <span className="form-error">{errors.title}</span>}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Clean Architecture"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div className="form-group">
                            <label className="form-label">
                                <span>Author *</span>
                                {errors.author && <span className="form-error">{errors.author}</span>}
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Robert C. Martin"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span>Genre *</span>
                                {errors.genre && <span className="form-error">{errors.genre}</span>}
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Technology, Sci-Fi"
                                value={formData.genre}
                                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <span>ISBN (International Standard Book Number) *</span>
                            {errors.isbn && <span className="form-error">{errors.isbn}</span>}
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. 978-0132350884"
                            value={formData.isbn}
                            disabled={isEdit}
                            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                            style={isEdit ? { background: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' } : {}}
                        />
                        {isEdit && <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>ISBN cannot be modified once created.</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <label className="form-label">
                                <span>Price ($) *</span>
                                {errors.price && <span className="form-error">{errors.price}</span>}
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                className="form-input"
                                placeholder="29.99"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span>Stock Qty *</span>
                                {errors.stockQuantity && <span className="form-error">{errors.stockQuantity}</span>}
                            </label>
                            <input
                                type="number"
                                min="0"
                                className="form-input"
                                placeholder="15"
                                value={formData.stockQuantity}
                                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span>Published Date *</span>
                                {errors.publishedDate && <span className="form-error">{errors.publishedDate}</span>}
                            </label>
                            <input
                                type="date"
                                className="form-input"
                                value={formData.publishedDate}
                                onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Book')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}