/* Made with ❤ By MekStuff */
/* Compiles typescript into docdocs readable data */

import ts from "typescript";
import path from "path";
import { Console } from "@mekstuff/logreport";
import { ModuleNode } from "./nodes/module-node.js";
import { ClassNode, ISerializedClassNode } from "./nodes/class-node.js";

export { ClassNode, ISerializedClassNode };

export async function GetParserVersion(): Promise<string> {
  return "0.1.1";
}
export class DocDocsParserTypescript {
  public program: ts.Program;
  private files: string[] = [];

  private resolveFilesPath(files: string[]): string[] {
    const f: string[] = [];
    files.forEach((file) => {
      f.push(path.resolve(file));
    });
    return f;
  }

  constructor(
    initialFiles: string[],
    private compilerOptions?: ts.CompilerOptions
  ) {
    this.program = ts.createProgram(
      this.resolveFilesPath(initialFiles),
      compilerOptions || {}
    );
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
  parse(file: string, reset?: boolean): Promise<ModuleNode> {
    return new Promise((resolve, reject) => {
      resolve(this.parseSync(file, reset) as ModuleNode);
    });
  }
  /**
   * @param file If the file was edited/newly added, make sure to set reset `true`
   * @param reset Creates a new program with the file included if it's not.
   */
  parseSync(file: string, reset?: boolean): ModuleNode | undefined {
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
