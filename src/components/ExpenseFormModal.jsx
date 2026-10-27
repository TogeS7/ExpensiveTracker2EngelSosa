import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const ExpenseFormModal = ({ isOpen, onClose, onAddExpense }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      if (!dialogElement.open) dialogElement.showModal();
    } else {
      if (dialogElement.open) dialogElement.close();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExpense = {
      id: Date.now().toString(),
      name: formData.get('name'),
      category: formData.get('category'),
      amount: Number(formData.get('amount')),
    };
    onAddExpense(newExpense);
    e.target.reset();
    onClose();
  };

  return createPortal(
    <dialog 
      ref={dialogRef} 
      onClose={onClose} 
      style={{
        padding: '0',
        border: 'none',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <header style={{ padding: '1rem 1.5rem', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Nuevo Gasto</h2>
        <button 
          type="button" 
          onClick={onClose} 
          style={{ minHeight: '44px', minWidth: '44px', background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ✕
        </button>
      </header>
      <main style={{ padding: '1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: '500' }}>
            Nombre:
            <input type="text" name="name" required style={{ minHeight: '44px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: '500' }}>
            Categoría:
            <input type="text" name="category" required style={{ minHeight: '44px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontWeight: '500' }}>
            Monto:
            <input type="text" inputMode="decimal" name="amount" required style={{ minHeight: '44px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </label>
          <button 
            type="submit" 
            style={{ minHeight: '44px', marginTop: '1rem', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
          >
            Guardar Gasto
          </button>
        </form>
      </main>
    </dialog>,
    document.body
  );
};