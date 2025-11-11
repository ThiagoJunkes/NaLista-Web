import { useState, useEffect } from "react";

export default function ConfigPage({ onBack }) {
  const [backendUrl, setBackendUrl] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem("backendUrl") || "http://localhost:3000";
    setBackendUrl(savedUrl);
  }, []);

  const handleSave = () => {
    localStorage.setItem("backendUrl", backendUrl);
    alert("Configurações salvas!");
    onBack(); // volta pra tela anterior
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Configurações ⚙️</h1>
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL do Backend:
        </label>
        <input
          type="text"
          value={backendUrl}
          onChange={(e) => setBackendUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Salvar
        </button>
        <button
          onClick={onBack}
          className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
