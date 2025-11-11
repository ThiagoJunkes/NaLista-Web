import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function ListSelector({ onSelectList }) {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  // Busca todas as listas
  useEffect(() => {
    api.get("/lists")
      .then(res => setLists(res.data))
      .catch(() => alert("Erro ao carregar listas"));
  }, []);

  // Cria nova lista
  async function createList() {
    if (!newListName.trim()) return alert("Digite um nome para a lista!");
    try {
      const res = await api.post("/lists", { name: newListName });
      setLists(prev => [...prev, res.data]);
      setNewListName("");
    } catch (err) {
      alert("Erro ao criar lista");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Suas Listas</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <ul className="space-y-3 mb-4">
          {lists.map(list => (
            <li
              key={list.id}
              className="p-3 bg-gray-100 rounded-lg hover:bg-purple-100 cursor-pointer transition"
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
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={createList}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
