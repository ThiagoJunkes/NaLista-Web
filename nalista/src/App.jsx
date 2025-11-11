import { useState } from "react";
import ListSelector from "./components/ListSelector";
import ItemList from "./components/ItemList";
import ConfigPage from "./pages/ConfigPage";

export default function App() {
  const [selectedList, setSelectedList] = useState(null);

  return (
    <>
      {!selectedList ? (
        <ListSelector onSelectList={setSelectedList} />
      ) : (
        <ItemList list={selectedList} onBack={() => setSelectedList(null)} />
      )}
    </>
  );
}
