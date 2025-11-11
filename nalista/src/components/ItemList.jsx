import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function ItemList({ list, onBack }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Busca itens da lista
  useEffect(() => {
    api.get(`/lists/${list.id}`)
      .then(res => setItems(res.data))
      .catch(() => alert("Erro ao carregar itens"));
  }, [list.id]);

  async function addItem() {
    if (!name.trim()) return;
    try {
      const res = await api.post("/itens", { name, listId: list.id, quantity });
      setItems(prev => [...prev, res.data]);
      setName("");
      setQuantity(1);
    } catch {
      alert("Erro ao adicionar item");
    }
  }

  async function toggleItem(id, checked) {
    await api.put(`/itens/${id}`, { checked: !checked });
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !checked } : item
      )
    );
  }

  async function deleteItem(id) {
    await api.delete(`/itens/${id}`);
    setItems(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{list.name}</h2>
        <button onClick={onBack} className="text-purple-600 underline">
          Voltar
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Novo item..."
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-20 border rounded-lg px-2 py-2 text-center"
          />
          <button
            onClick={addItem}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <div
                onClick={() => toggleItem(item.id, item.checked)}
                className={`cursor-pointer ${item.checked ? "line-through text-gray-400" : ""}`}
              >
                {item.name} — {item.quantity}
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
