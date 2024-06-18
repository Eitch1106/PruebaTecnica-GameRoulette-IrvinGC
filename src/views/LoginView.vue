<script setup lang="ts">
import { ref, watch } from 'vue';
import Joi from 'joi';
import DefaultHeader from '@/components/DefaultHeader.vue';
import { useLogin } from '@/composables/useUser';
import { useRouter } from 'vue-router';
import DefaultLoader from '@/components/DefaultLoader.vue';

const name = ref('');
const errors = ref([]);
const { user, isAuthenticated, login } = useLogin();
const router = useRouter();
const loadingButton = ref(false)

const schema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(30).required().messages({
    'string.base': 'El nombre debe ser un texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede tener más de 30 caracteres',
    'any.required': 'El nombre es requerido',
    'string.pattern.base': 'El nombre solo puede contener letras',
  }),
});

const validateName = () => {
  const result = schema.validate({ name: name.value }, { abortEarly: false });
  if (result.error) {
    errors.value = result.error.details.map(detail => detail.message);
  } else {
    errors.value = [];
  }
};

watch(name, validateName);

const handleSubmit = async () => {
  validateName();
  if (errors.value.length === 0) {
    loadingButton.value = true
    user.value.name = name.value;
    await login();
    if (isAuthenticated.value) {
      loadingButton.value = false
      router.push({ name: 'main' });
    }
    else {
      loadingButton.value = false
      console.log('Authentication failed');
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <DefaultHeader />
    <div class="flex-grow flex items-center justify-center bg-gray-100 pt-16">
      <div class="p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <h2 class="mb-4 text-2xl text-center">Ingresa tu nombre para jugar</h2>
        <form class="flex flex-col space-y-4" @submit.prevent="handleSubmit">
          <InputText placeholder="Enter your name" v-model="name" class="p-inputtext w-full" />
          <Button label="Submit" class="w-full" severity="danger" type="submit" outlined />
        </form>
        <ul v-if="errors.length" class="mt-4 text-red-500">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>
    <DefaultLoader v-if="loadingButton"/>
  </div>
</template>
