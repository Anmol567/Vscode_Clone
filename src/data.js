class Node {
  constructor(children = [], name = "", isFile = false, id = null, depth = 0) {
    this.children = children;
    this.name = name;
    this.isFile = isFile;
    this.id = JSON.stringify(id);
    this.depth = JSON.stringify(depth);
  }
}

class FileStructure {
  constructor() {
    this.count = 1;
    this.folders = {
      0: new Node([], "root", false, 0, 0),
    };
  }
  addFile(folderId, fileName) {
    if (this.folders[folderId]) {
      this.folders[folderId].children.push(
        new Node(
          [],
          fileName,
          true,
          this.count,
          JSON.parse(this.folders[folderId].depth) + 1,
        ),
      );
      this.count++;
    }
    console.log(this.folders);
  }
  addFolder(folderId, folderName) {
    if (this.folders[folderId]) {
      const newFolder = new Node(
        [],
        folderName,
        false,
        this.count,
        JSON.parse(this.folders[folderId].depth) + 1,
      );
      this.folders[folderId].children.push(newFolder);
      this.folders[this.count] = newFolder;
      this.count++;
    }
    console.log(this.folders);
  }
}

const useFileStructure = () => {
  const fileStructure = new FileStructure();
  return {
    addFolder: (folderId, folderName) =>
      fileStructure.addFolder(folderId, folderName),
    addFile: (folderId, fileName) => fileStructure.addFile(folderId, fileName),
    root: fileStructure.folders["0"],
  };
};
export default useFileStructure;
