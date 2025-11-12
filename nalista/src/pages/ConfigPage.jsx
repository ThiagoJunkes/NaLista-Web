import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ConfigPage({ onBack, onThemeChange }) {
  const [backendUrl, setBackendUrl] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) return localStorage.getItem('theme');
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    const savedUrl = localStorage.getItem("backendUrl") || "http://localhost:3000";
    setBackendUrl(savedUrl);
  }, []);

  const handleSave = () => {
    localStorage.setItem("backendUrl", backendUrl);
    toast.success("Configurações salvas! Recarregando...");
    // Adiciona um pequeno atraso para que o usuário possa ver o toast antes do reload.
    // A tela de "Verificando conexão..." vai aparecer logo após o reload.
    setTimeout(() => window.location.reload(), 1000);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    onThemeChange(); // Notifica o App para reaplicar o tema
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Configurações</h1>
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        {/* Seção de Tema */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tema
          </label>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            {theme === 'light' ? <Sun className="text-yellow-500" /> : <Moon className="text-indigo-400" />}
            <span className="text-gray-700 dark:text-gray-300">
              Alternar para modo {theme === 'light' ? 'Escuro' : 'Claro'}
            </span>
          </button>
        </div>

        {/* Seção de URL do Backend */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL do Backend:
          </label>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Salvar
        </button>
        <button
          onClick={onBack}
          className="mt-2 w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white font-semibold py-2 rounded-lg transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
