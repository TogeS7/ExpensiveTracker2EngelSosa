import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const SETTINGS_KEY = '@expensetracker/settings';

const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
};

const ExpensesContext = createContext(null);

function readSettingsStorage() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      notifications: Boolean(parsed?.notifications),
      darkMode: Boolean(parsed?.darkMode),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function normalizeCreatedAt(rawCreatedAt) {
  if (!rawCreatedAt) return new Date().toISOString();
  if (typeof rawCreatedAt.toDate === 'function') {
    return rawCreatedAt.toDate().toISOString();
  }
  return String(rawCreatedAt);
}

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [settings, setSettings] = useState(() => readSettingsStorage());

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Evitar fallos si el almacenamiento está restringido
    }
  }, [settings]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'expenses'),
      (snapshot) => {
        const items = snapshot.docs.map((document) => {
          const data = document.data({ serverTimestamps: 'estimate' });
          return {
            id: document.id,
            title: data.title ?? '',
            amount: Number(data.amount ?? 0),
            category: data.category ?? 'Otros',
            notes: data.notes ?? '',
            createdAt: normalizeCreatedAt(data.createdAt),
          };
        });

        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setExpenses(items);
        setIsLoaded(true);
      },
      (err) => {
        console.error('Error al escuchar gastos en Firestore:', err);
        setIsLoaded(true);
      }
    );

    return () => unsubscribe();
  }, []);

  const addExpense = ({ title, amount, category, notes = '' }) => {
    const cleanTitle = String(title ?? '').trim();
    const numericAmount = Number(amount);

    if (!cleanTitle) {
      return { ok: false, error: 'El título es obligatorio.' };
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return { ok: false, error: 'El monto debe ser un número mayor a 0.' };
    }

    const payload = {
      title: cleanTitle,
      amount: numericAmount,
      category: category || 'Otros',
      notes: String(notes ?? '').trim(),
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, 'expenses'), payload).catch((err) =>
      console.error('Error al guardar gasto:', err)
    );

    return { ok: true, expense: payload };
  };

  const removeExpense = (id) => {
    deleteDoc(doc(db, 'expenses', id)).catch((err) =>
      console.error('Error al eliminar gasto:', err)
    );
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