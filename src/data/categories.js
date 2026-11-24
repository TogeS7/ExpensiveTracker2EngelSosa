export const CATEGORIES = [
  { id: 'alimentacion', label: 'Alimentación', color: '#16a34a', icon: '🛒' },
  { id: 'transporte', label: 'Transporte', color: '#2563eb', icon: '⛽' },
  { id: 'servicios', label: 'Servicios', color: '#9333ea', icon: '🌐' },
  { id: 'hogar', label: 'Hogar', color: '#ea580c', icon: '🏠' },
  { id: 'otros', label: 'Otros', color: '#475569', icon: '📌' },
];

export const getCategoryMeta = (categoryLabel) =>
  CATEGORIES.find((c) => c.label === categoryLabel) || CATEGORIES[CATEGORIES.length - 1];