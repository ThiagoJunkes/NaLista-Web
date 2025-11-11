import { useState } from "react";
import { Settings } from "lucide-react";
import ListSelector from "./components/ListSelector";
import ItemList from "./components/ItemList";
import ConfigPage from "./pages/ConfigPage";

export default function App() {
  const [selectedList, setSelectedList] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  if (showConfig) {
    return <ConfigPage onBack={() => setShowConfig(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Botões do topo */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {selectedList && (
          <button onClick={() => setSelectedList(null)} className="text-purple-600 underline font-semibold">
            Voltar
          </button>
        )}
        <button
          onClick={() => setShowConfig(true)}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Conteúdo principal */}
      {!selectedList
        ? <ListSelector onSelectList={setSelectedList} />
        : <ItemList list={selectedList} />}
    </div>
  );
}
