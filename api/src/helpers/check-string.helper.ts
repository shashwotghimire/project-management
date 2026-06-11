export function isString(value: any) {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  } else if (value.trim() === "") {
    throw new Error("String cannot be empty");
  }
  return value;
}
