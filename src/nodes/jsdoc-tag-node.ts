import ts from "typescript";

export class JSDocTagNode {
  name: string;
  /**
   * if `getValue` is null, `value` will always be "". So to get if actual value is null, call getValue
   */
  value: string;
  getName(): string {
    return this.TagInfo.name;
  }
  getValue(): string | undefined {
    return this.TagInfo.text
      ? ts.displayPartsToString(this.TagInfo.text)
      : undefined;
  }
  constructor(private TagInfo: ts.JSDocTagInfo) {
    this.name = this.getName();
    this.value = this.getValue() || "";
  }
}
