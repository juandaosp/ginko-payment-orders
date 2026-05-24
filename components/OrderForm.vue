<template>
    <form @submit="onSubmit" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700"
                >Proveedor</label
            >
            <input
                v-model="providerName"
                type="text"
                class="w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.providerName }"
            />
            <span class="text-xs text-red-500">{{ errors.providerName }}</span>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700"
                >Monto (COP)</label
            >
            <input
                v-model="amount"
                type="number"
                class="w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.amount }"
            />
            <span class="text-xs text-red-500">{{ errors.amount }}</span>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700"
                >Concepto</label
            >
            <textarea
                v-model="concept"
                class="w-full p-2 border rounded-md"
                :class="{ 'border-red-500': errors.concept }"
            ></textarea>
            <div class="flex justify-between">
                <span class="text-xs text-red-500">{{ errors.concept }}</span>
                <span class="text-xs text-gray-500"
                    >{{ concept?.length || 0 }}/250</span
                >
            </div>
        </div>

        <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
            {{ isSubmitting ? "Enviando..." : "Crear Orden" }}
        </button>
    </form>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const emit = defineEmits(["success"]);

// Definición de esquema con Zod
const validationSchema = toTypedSchema(
    z.object({
        providerName: z.string().min(1, "El proveedor es requerido"),
        amount: z.coerce.number().positive("El monto debe ser mayor a cero"),
        concept: z
            .string()
            .min(1, "El concepto es requerido")
            .max(250, "Máximo 250 caracteres"),
    }),
);

const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema,
});

const { value: providerName } = useField("providerName");
const { value: amount } = useField("amount");
const { value: concept } = useField("concept");

const onSubmit = handleSubmit(async (values) => {
    try {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Orden creada:", values);
        emit("success");
    } catch (err) {
        console.error(err);
    }
});
</script>
