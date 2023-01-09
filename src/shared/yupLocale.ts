import * as yup from "yup";
import get from "lodash/get";

yup.setLocale({
  mixed: {
    required: (data: { label: string }) => {
      if (!!data?.label) {
        return `${data.label} es un valor requerido`;
      }
      return "valor requerido";
    },
    notType: (data: unknown) => {
      const type = get(data, "type");
      if (type) {
        return `este campo debería ser ${type}`;
      }

      return "tipo invalido";
    },
  },
  number: {
    positive: (data: unknown) => {
      return `${get(data, "label", " este campo")} debe ser un número positivo`;
    },
    moreThan: ({ more }: { more: number }) =>
      `el valor debe ser mayor que ${more}`,
    min: ({ min }: { min: number }) => `el valor mínimo es ${min}`,
    max: ({ max }: { max: number }) => `el valor máximo es ${max}`,
  },
  string: {
    matches: (data: unknown) => {
      return `formato inválido para ${get(data, "label", " este campo")}`;
    },
    email: () => {
      return "formato de email inválido";
    },
    min: ({ min }: { min: number }) =>
      `el valor mínimo es de ${min} caracteres`,
    max: ({ max }: { max: number }) =>
      `el valor máximo es de ${max} caracteres`,
  },
  array: {
    min: ({ min, label }: { min: number; path: string; label: string }) => {
      return `seleccione ${min} o más ${label}`;
    },
  },
});

export default yup;
