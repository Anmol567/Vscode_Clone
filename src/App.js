import "./styles.css";
import FileStructure from "./data";
import { useMemo, useState } from "react";
const ParseFolder = ({ root, fileStructure }) => {
  const folders = root.children?.filter((child) => !child.isFile);
  const files = root.children?.filter((child) => child.isFile);
  const [render, setRender] = useState(0);
  const [addEntity, setAddEntity] = useState(false);
  return (
    <div style={{ marginLeft: `${JSON.parse(root.depth) + 5}px` }}>
      <div style={{ display: "flex" }}>
        <div>{root.name}</div>
        {!root.isFile && (
          <>
            <div
              style={{ paddingLeft: "4px" }}
              onClick={() => setAddEntity("folder")}
            >
              <button>Folder +</button>
            </div>
            <div
              style={{ paddingLeft: "4px" }}
              onClick={() => setAddEntity("file")}
            >
              <button>File +</button>
            </div>
          </>
        )}
      </div>
      {root.children.map((child) => {
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
          position: "absolute"
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
              }
              setAddEntity(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = e.target.value;
                if (val) {
                  if (addEntity === "file") fileStructure.addFile(root.id, val);
                  else fileStructure.addFolder(root.id, val);
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
