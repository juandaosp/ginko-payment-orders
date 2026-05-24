import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const useOrderForm = (onSuccess: (values: any) => void) => {
  const apiError = ref<string | null>(null);

  const validationSchema = toTypedSchema(
    z.object({
      provider: z.string().min(3, "El proveedor es requerido (mín 3 chars)"),
      amount: z.coerce.number().positive("El monto debe ser mayor a cero"),
      concept: z
        .string()
        .min(1, "El concepto es requerido")
        .max(250, "Máximo 250 caracteres"),
    }),
  );

  const { handleSubmit, isSubmitting, errors } = useForm({
    validationSchema,
  });

  // Configuración de validación dinámica por campo
  const fieldConfig = { validateOnValueUpdate: true };

  const { value: provider } = useField<string>(
    "provider",
    undefined,
    fieldConfig,
  );
  const { value: amount } = useField<number>("amount", undefined, fieldConfig);
  const { value: concept } = useField<string>(
    "concept",
    undefined,
    fieldConfig,
  );

  const onSubmit = handleSubmit(async (values) => {
    apiError.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess(values);
    } catch (err) {
      apiError.value = "Error al procesar la solicitud";
    }
  });

  return {
    provider,
    amount,
    concept,
    errors,
    isSubmitting,
    isValid: computed(() => Object.keys(errors.value).length === 0),
    apiError,
    onSubmit,
  };
};
