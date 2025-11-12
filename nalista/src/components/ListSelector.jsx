import { useState } from "react";
import { getApi } from "../api/api";

export default function ListSelector({ initialLists, onSetLists, onSelectList }) {
  const [newListName, setNewListName] = useState("");

  const lists = initialLists;

  // Cria nova lista
  async function createList() {
    if (!newListName.trim()) return alert("Digite um nome para a lista!");
    try {
      const api = getApi();
      const res = await api.post("/lists", { name: newListName });
      // Atualiza o estado no componente pai (App.jsx)
      onSetLists(prev => [...prev, res.data]);
      setNewListName("");
    } catch (err) {
      alert("Erro ao criar lista");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">🛒 Suas Listas</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md">
        <ul className="space-y-3 mb-4">
          {lists.map(list => (
            <li
              key={list.id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer transition text-gray-800 dark:text-gray-200"
              onClick={() => onSelectList(list)}
            >
              {list.name}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nova lista..."
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            className="flex-1 border dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200"
          />
          <button
            onClick={createList}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
