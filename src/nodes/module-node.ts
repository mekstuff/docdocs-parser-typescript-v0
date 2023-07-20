import ts from "typescript";
import { DocDocsParserTypescript } from "../index.js";
import { ClassNode } from "./class-node.js";

export class ModuleNode {
  private Classes: ClassNode[] = [];
  private eachSourceFile = (child: ts.Node) => {
    if (ts.isClassDeclaration(child)) {
      this.Classes.push(new ClassNode(child, this.Parser));
    }
  };

  constructor(
    sourceFile: ts.SourceFile,
    private Parser: DocDocsParserTypescript
  ) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, (child) => {
        this.eachSourceFile(child);
      });
    }

    this.Classes.forEach((ClassNode) => {
      console.log(ClassNode.Serialize());
    });
  }
}
