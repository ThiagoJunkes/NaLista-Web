import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import ListSelector from "./components/ListSelector";
import ItemList from "./components/ItemList";
import ConfigPage from "./pages/ConfigPage";
import { getApi } from "./api/api";

export function applyTheme() {
  const theme = localStorage.getItem("theme");
  // Aplica o tema salvo no localStorage ou o tema do sistema
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    console.log("Tema alterado para: Escuro");
  } else {
    document.documentElement.classList.remove('dark');
    console.log("Tema alterado para: Claro");
  }
}

export default function App() {
  const [selectedList, setSelectedList] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [backendHealthy, setBackendHealthy] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(applyTheme, []);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const api = getApi();
        const response = await api.get("/");
        if (response.data === "NaLista API rodando") {
          setBackendHealthy(true);
        } else {
          setShowConfig(true);
          alert("A URL do backend parece estar incorreta. Verifique as configurações.");
        }
      } catch (error) {
        setShowConfig(true);
        alert("Não foi possível conectar ao backend. Verifique a URL nas configurações.");
      }
    };
    checkBackendHealth();
  }, []);

  // Busca as listas apenas se o backend estiver saudável
  useEffect(() => {
    if (backendHealthy) {
      const api = getApi();
      api.get("/lists")
        .then(res => setLists(res.data))
        .catch(() => alert("Erro ao carregar listas"));
    }
  }, [backendHealthy]);

  if (showConfig) {
    return <ConfigPage onBack={() => setShowConfig(false)} onThemeChange={applyTheme} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Botões do topo */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {selectedList && (
          <button onClick={() => setSelectedList(null)} className="text-purple-600 dark:text-purple-400 underline font-semibold">
            Voltar
          </button>
        )}
        <button
          onClick={() => setShowConfig(true)}
          className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full shadow"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Conteúdo principal */}
      {backendHealthy && (
        !selectedList
          ? <ListSelector
              initialLists={lists}
              onSetLists={setLists}
              onSelectList={setSelectedList}
            />
          : <ItemList list={selectedList} />
      )}
    </div>
  );
}
