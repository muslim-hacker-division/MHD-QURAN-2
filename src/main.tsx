import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Komponen utama sementara
function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-emerald-400">MHD Qur'an — 5 Bahasa</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
