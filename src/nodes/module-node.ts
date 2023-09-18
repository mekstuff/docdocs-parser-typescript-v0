import ts from "typescript";
import { DocDocsParserTypescript } from "../index.js";
import { ClassNode, ISerializedClassNode } from "./class-node.js";

export class ModuleNode {
  public Classes: ISerializedClassNode[] = [];
  constructor(
    sourceFile: ts.SourceFile,
    private Parser: DocDocsParserTypescript
  ) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, (child) => {
        // this.eachSourceFile(child);
        if (ts.isClassDeclaration(child)) {
          this.Classes.push(new ClassNode(child, this.Parser).Serialize());
        }
      });
    }
  }
}
