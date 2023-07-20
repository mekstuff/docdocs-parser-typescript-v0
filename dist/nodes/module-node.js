import ts from "typescript";
import { ClassNode } from "./class-node.js";
export class ModuleNode {
    constructor(sourceFile, Parser) {
        this.Parser = Parser;
        this.Classes = [];
        this.eachSourceFile = (child) => {
            if (ts.isClassDeclaration(child)) {
                this.Classes.push(new ClassNode(child, this.Parser));
            }
        };
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
//# sourceMappingURL=module-node.js.map