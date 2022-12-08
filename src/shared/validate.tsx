interface FData {
  [k: string]: string | number | null | undefined; //
}
type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: "required" } | { type: "pattern"; regex: RegExp });
export type Rules<T> = Rule<T>[];

export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  rules.forEach((rule) => {
    const { key, type, message } = rule;
    const value = formData[key]; //key=name,sign
    switch (type) {
      case "required":
        if (value === null || value === undefined || value === "") {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case "pattern":
        if(value && !rule.regex.test(value.toString())){
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      default:
        return;
    }
  })
  console.log(errors);

  return errors
};
