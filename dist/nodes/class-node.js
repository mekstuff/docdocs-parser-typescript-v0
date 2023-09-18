/**
 * Working on class node
 * Helpful links:
 * https://github.com/jordimarimon/ts-ast-parser/blob/main/packages/core/src/parse-from-files.ts
 * https://github.com/jordimarimon/ts-ast-parser/blob/main/packages/core/src/nodes/class-node.ts
 * https://github.com/jordimarimon/ts-ast-parser/blob/main/packages/core/src/utils/member.ts#L101
 * github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 * stackoverflow.com/questions/58885433/typescript-compiler-how-to-get-an-exported-symbol-by-name
 * github.com/microsoft/TypeScript/wiki/Architectural-Overview
 * https://stackoverflow.com/questions/58886590/typescript-compiler-how-to-navigate-to-the-definition-of-a-symbol
 */
import { Console } from "@mekstuff/logreport";
import { SerializeSignature, SerializeSymbol, } from "../utils/main-serializer.js";
/**
 * A Node for classes.
 */
export class ClassNode {
    /**
     * Gets inheritance of the class.
     */
    GetInheritanceSymbol() {
        var _a;
        const Type = this._checker.getTypeAtLocation(this.Node);
        const BaseType = (_a = Type.getBaseTypes()) === null || _a === void 0 ? void 0 : _a[0];
        if (!BaseType) {
            return undefined;
        }
        const SYMBOL = BaseType.getSymbol();
        if (SYMBOL) {
            return SerializeSymbol(SYMBOL, this._checker);
        }
        return undefined;
    }
    /**
     * Serializes the classes constructors.
     */
    GetConstructors() {
        if (!this._symbol) {
            Console.warn("No symbols for class node.");
            return [];
        }
        const constructorType = this._checker.getTypeOfSymbolAtLocation(this._symbol, this.Node);
        return constructorType.getConstructSignatures().map((signature) => {
            return SerializeSignature(signature, this._checker);
        });
    }
    /**
     * Gets the properties/members of the class node.
     */
    GetMembers() {
        //TODO: if static member is included then it's not considered a member
        const symbol = this._checker.getTypeAtLocation(this.Node).getSymbol();
        const properties = (symbol &&
            this._checker.getDeclaredTypeOfSymbol(symbol).getProperties()) ||
            [];
        return properties.map((x) => {
            return SerializeSymbol(x, this._checker);
        });
    }
    /**
     * Serializes the class with all needed info.
     */
    Serialize() {
        return {
            members: this.GetMembers(),
            constructors: this.GetConstructors(),
            inheritanceSymbol: this.GetInheritanceSymbol(),
            symbol: SerializeSymbol(this._symbol, this._checker),
        };
    }
    constructor(Node, Parser) {
        this.Node = Node;
        this.Parser = Parser;
        const typeChecker = Parser.program.getTypeChecker();
        this._checker = typeChecker;
        if (!Node.name) {
            return;
        }
        const symbol = typeChecker.getSymbolAtLocation(Node.name);
        if (!symbol) {
            Console.warn(`Could not get symbol for class.`);
        }
        this._symbol = symbol;
    }
}
//# sourceMappingURL=class-node.js.map