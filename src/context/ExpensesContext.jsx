import React, { createContext, useContext, useState, useEffect } from 'react';

const EXPENSES_KEY = '@expensetracker/expenses';
const SETTINGS_KEY = '@expensetracker/settings';

const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
};

const ExpensesContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const data = readStorage(EXPENSES_KEY, []);
    return Array.isArray(data) ? data : [];
  });

  const [settings, setSettings] = useState(() => {
    const data = readStorage(SETTINGS_KEY, DEFAULT_SETTINGS);
    return {
      notifications: Boolean(data?.notifications),
      darkMode: Boolean(data?.darkMode),
    };
  });

  const isLoaded = true;

  useEffect(() => {
    try {
      window.localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch {
      // Evitar fallos si el almacenamiento está restringido
    }
  }, [expenses]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Evitar fallos si el almacenamiento está restringido
    }
  }, [settings]);

  const addExpense = ({ title, amount, category, notes = '' }) => {
    const cleanTitle = String(title ?? '').trim();
    const numericAmount = Number(amount);

    if (!cleanTitle) {
      return { ok: false, error: 'El título es obligatorio.' };
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return { ok: false, error: 'El monto debe ser un número mayor a 0.' };
    }

    const newExpense = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: cleanTitle,
      amount: numericAmount,
      category: category || 'Otros',
      notes: String(notes ?? '').trim(),
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    return { ok: true, expense: newExpense };
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Boolean(value),
    }));
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        isLoaded,
        addExpense,
        removeExpense,
        settings,
        updateSetting,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) {
    throw new Error('useExpenses debe usarse dentro de un ExpensesProvider');
  }
  return ctx;
}