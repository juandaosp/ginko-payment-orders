import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const useOrderForm = (onSuccess: (values: any) => void) => {
  const apiError = ref<string | null>(null);

  const validationSchema = toTypedSchema(
    z.object({
      providerName: z
        .string()
        .min(3, "El proveedor es requerido (mín 3 chars)"),
      amount: z.coerce.number().positive("El monto debe ser mayor a cero"),
      concept: z
        .string()
        .min(1, "El concepto es requerido")
        .max(250, "Máximo 250 caracteres"),
    }),
  );

  const { handleSubmit, isSubmitting, errors, meta } = useForm({
    validationSchema,
    initialValues: { providerName: "", amount: undefined, concept: "" },
  });

  const { value: providerName } = useField<string>("providerName");
  const { value: amount } = useField<number>("amount");
  const { value: concept } = useField<string>("concept");

  const onSubmit = handleSubmit(async (values) => {
    apiError.value = null;
    try {
      onSuccess(values);
    } catch (err) {
      apiError.value = "Error al procesar la solicitud";
    }
  });

  return {
    providerName,
    amount,
    concept,
    errors,
    isSubmitting,
    isValid: computed(() => meta.value.valid),
    apiError,
    onSubmit,
  };
};
