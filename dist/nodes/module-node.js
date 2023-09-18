import ts from "typescript";
import { ClassNode } from "./class-node.js";
export class ModuleNode {
    constructor(sourceFile, Parser) {
        this.Parser = Parser;
        this.Classes = [];
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
//# sourceMappingURL=module-node.js.map