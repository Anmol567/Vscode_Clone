import "./styles.css";
import FileStructure from "./data";
import { useMemo, useState } from "react";
const ParseFolder = ({ root, fileStructure }) => {
  const [expand, setExpand] = useState(false);
  const [addEntity, setAddEntity] = useState(false);
  return (
    <div
      style={{ marginLeft: `${JSON.parse(root.depth) + 5}px`, padding: "4px" }}
    >
      <div style={{ display: "flex" }}>
        <div onClick={() => setExpand((prev) => !prev)}>
          {!root.isFile ? <span>📁</span> : <span>📄</span>}
          <span style={{ marginLeft: "4px" }}>{root.name}</span>
        </div>
        {!root.isFile && (
          <>
            <div
              style={{ paddingLeft: "4px" }}
              onClick={() => {
                setAddEntity("folder");
                setExpand(true);
              }}
            >
              <button>Folder +</button>
            </div>
            <div
              style={{ paddingLeft: "4px" }}
              onClick={() => {
                setAddEntity("file");
                setExpand(true);
              }}
            >
              <button>File +</button>
            </div>
          </>
        )}
      </div>
      {expand &&
        root.children.map((child) => {
          return (
            <ParseFolder
              root={child}
              key={child.id}
              fileStructure={fileStructure}
            />
          );
        })}
      <div
        style={{
          marginLeft: `${JSON.parse(root.depth) + 5}px`,
          position: "absolute",
        }}
      >
        {addEntity && (
          <input
            autoFocus={true}
            onBlur={(e) => {
              const val = e.target.value;
              if (val) {
                if (addEntity === "file") fileStructure.addFile(root.id, val);
                else fileStructure.addFolder(root.id, val);
                setExpand(true);
              }
              setAddEntity(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = e.target.value;
                if (val) {
                  if (addEntity === "file") fileStructure.addFile(root.id, val);
                  else fileStructure.addFolder(root.id, val);
                  setExpand(true);
                  setAddEntity(null);
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
export default function App() {
  const fileStructure = useMemo(() => {
    return new FileStructure();
  }, []);
  console.log(fileStructure);
  return (
    <div className="App">
      <ParseFolder
        root={fileStructure.folders["0"]}
        fileStructure={fileStructure}
      />
    </div>
  );
}
