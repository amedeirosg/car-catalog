export const validateRequiredFields = (fields: Record<string, any>) => {
  for (let [key, value] of Object.entries(fields)) {
    if (value.trim() === "" && typeof value === "string") {
      return `O campo ${key} é obrigatório.`;
    }
  }
};

export const teste = (teste: Object) => {
  console.log(teste);
};
