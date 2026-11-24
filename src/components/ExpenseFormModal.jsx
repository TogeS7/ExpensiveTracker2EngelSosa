import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CATEGORIES } from '../data/categories';
import { useExpenses } from '../context/ExpensesContext';

export function ExpenseFormModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].label);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      setErrorMsg('');
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addExpense({ title, amount, category, notes });
    if (!res.ok) {
      setErrorMsg(res.error);
      return;
    }

    setTitle('');
    setAmount('');
    setCategory(CATEGORIES[0].label);
    setNotes('');
    setErrorMsg('');
    onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      style={{
        width: '92%',
        maxWidth: '420px',
        border: 'none',
        borderRadius: '12px',
        padding: 0,
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Nuevo gasto</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          style={{
            minWidth: '44px',
            minHeight: '44px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.15rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </header>

      <main style={{ padding: '1.25rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 600 }}>
            Título
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Supermercado"
              style={{ minHeight: '44px', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 600 }}>
            Monto
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: 25000"
              style={{ minHeight: '44px', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 600 }}>
            Categoría
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ minHeight: '44px', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontWeight: 600 }}>
            Notas (opcional)
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Compra semanal"
              style={{ minHeight: '44px', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </label>

          {errorMsg && (
            <p role="alert" style={{ margin: 0, color: '#dc2626', fontWeight: 600, fontSize: '0.9rem' }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            style={{
              minHeight: '44px',
              marginTop: '0.5rem',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Guardar gasto
          </button>
        </form>
      </main>
    </dialog>,
    document.body
  );
}