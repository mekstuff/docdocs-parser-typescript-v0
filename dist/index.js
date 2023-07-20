/* Made with ❤ By MekStuff */
/* Compiles typescript into docdocs readable data */
import ts from "typescript";
import path from "path";
import LogReport from "@mekstuff/logreport";
import { ModuleNode } from "./nodes/module-node.js";
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
     */
    parse(file, reset) {
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
            LogReport.warn(`Could not get source from file => "${file}"`);
            return;
        }
        new ModuleNode(sourceFile, this);
    }
}
new DocDocsParserTypescript([
    "C:/Users/Lanzo/Documents/Github/Mekstuff/docdocs-parser-typescript-v2/src/test.ts",
]).parse("C:/Users/Lanzo/Documents/Github/Mekstuff/docdocs-parser-typescript-v2/src/test.ts");
// new DocDocsParserTypescript().ParseFile(
//   "C:/Users/Lanzo/Documents/Github/Mekstuff/docdocs-parser-typescript-v2/src/test.ts"
// );
//# sourceMappingURL=index.js.map