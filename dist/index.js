/* Made with ❤ By MekStuff */
/* Compiles typescript into docdocs readable data */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ts from "typescript";
import path from "path";
import { Console } from "@mekstuff/logreport";
import { ModuleNode } from "./nodes/module-node.js";
import { ClassNode } from "./nodes/class-node.js";
export { ClassNode };
export function GetParserVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        return "0.1.1";
    });
}
export class DocDocsParserTypescript {
    resolveFilesPath(files) {
        const f = [];
        files.forEach((file) => {
            f.push(path.resolve(file));
        });
        return f;
    }
    constructor(initialFiles, compilerOptions) {
        this.compilerOptions = compilerOptions;
        this.files = [];
        this.program = ts.createProgram(this.resolveFilesPath(initialFiles), compilerOptions || {});
        /*
        const compilerHost = ts.createCompilerHost(compilerOptions || {}, true);
        const diagnostics = this.program.getSemanticDiagnostics();
        console.log("Done diagnostics");
    
        if (diagnostics.length) {
          console.log("Has length");
          // logError('Error while analysing source files:', formatDiagnostics(diagnostics));
          // return [];
        }
        */
    }
    /**
     * @param file If the file was edited/newly added, make sure to set reset `true`
     * @param reset Creates a new program with the file included if it's not.
     *
     * Wraps `parseSync` request in a promise that can run async
     */
    parse(file, reset) {
        return new Promise((resolve, reject) => {
            resolve(this.parseSync(file, reset));
        });
    }
    /**
     * @param file If the file was edited/newly added, make sure to set reset `true`
     * @param reset Creates a new program with the file included if it's not.
     */
    parseSync(file, reset) {
        file = path.resolve(file);
        if (reset === true) {
            const oldProgram = this.program;
            if (this.files.indexOf(file) === -1) {
                this.files.push(file);
            }
            this.program = ts.createProgram({
                rootNames: this.files,
                oldProgram: oldProgram,
                options: this.compilerOptions || {},
            });
        }
        const sourceFile = this.program.getSourceFile(file);
        if (sourceFile === undefined) {
            Console.warn(`Could not get source from file => "${file}"`);
            return;
        }
        return new ModuleNode(sourceFile, this);
    }
}
// const FILE =
//   "C:/Users/Lanzo/Documents/Github/Mekstuff/docdocs-parser-typescript-v2/src/test.ts";
// const Parser = new DocDocsParserTypescript([FILE]);
// const res = Parser.parseSync(FILE);
// console.log(res?.Classes);
//# sourceMappingURL=index.js.map