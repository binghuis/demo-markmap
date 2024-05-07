import "./App.css";
import MindMap from "./components/mindmap";
function App() {
  return (
    <MindMap
      content={`# markmap
      
  - beautiful
  - useful
  - easy
  - interactive
  `}
    ></MindMap>
  );
}

export default App;
