<script setup lang="ts">
import { storeToRefs } from "pinia";
import { userStore } from '../stores/userStore.js';
import { useLogin } from '@/composables/useUser';
import { useRouter } from 'vue-router';

  const loginStore = userStore();
  const { user, isAuthenticated} = storeToRefs(loginStore);

  const { logout } = useLogin();
  const router = useRouter();
  const userName = user.value.name;

  const classCenter = isAuthenticated.value ? 'flex' : 'flex-1';
  const handleSubmit = async () => {
    await logout();
    if (!isAuthenticated.value) {
      router.push({ name: 'login' });
    }
    else {
      console.log('Authentication failed');
    }
  };

</script>

<template>
  <header class="bg-red-800 text-white p-4 flex justify-between items-center w-full fixed top-0">

    <div class="flex items-center" v-if="isAuthenticated">
      <Button label="Logout" icon="pi pi-sign-out" class="ml-2" @click="handleSubmit" text
      style="color: white;"/>
    </div>
    <div :class= "[classCenter ,'flex-col items-center text-center']">
      <span class="text-3xl font-bold">Bienvenido al juego de la ruleta</span>
      <span v-if="isAuthenticated" class="text-2xl font-bold">Jugador: {{ userName }}</span>
    </div>
    <div class="flex flex-col items-center" v-if="isAuthenticated">
      <Button label="Save Game" icon="pi pi-save" class="ml-2" text
      style="color: white;" v-tooltip.bottom="'Da click para guardar tu juego o saldo'" />
    </div>
  </header>
</template>

<style scoped>
</style>
