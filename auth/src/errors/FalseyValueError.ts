export default class FalsyValueError extends Error {
  constructor(falsyFieldNames: string[]) {
    if(falsyFieldNames.length > 1) {
        super(`Invalid value for the following field: ${falsyFieldNames[0]}. Falsy values are not allowed.`);
    } else {
        super(`Invalid values for the following fields: \`${falsyFieldNames.join("\`, \`")}\`. Falsy values are not allowed.`);
    }
    this.name = "FalsyValueError";
  }
}
