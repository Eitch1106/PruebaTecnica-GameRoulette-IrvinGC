<script setup>
import { ref } from 'vue';
const selectedOption = ref('');

const selectOption = (option) => {
selectedOption.value = option;
};

</script>

<template>

<div class="flex space-x-4 mb-5">
        <Button label="Color" @click="selectOption('Color')" severity="danger" 
        :rounded="selectedOption !== 'Color'" :raised="selectedOption === 'Color'"/>
        <Button label="Pares / Impares" @click="selectOption('ParesImpares')" severity="secondary" 
        :rounded="selectedOption !== 'ParesImpares'" :raised="selectedOption === 'ParesImpares'"/>
        <Button label="Número y Color" @click="selectOption('NumeroColor')" severity="danger" 
        :rounded="selectedOption !== 'NumeroColor'" :raised="selectedOption === 'NumeroColor'" 
        style="background-color: #8E4232 " />
      </div>
      <div v-if="selectedOption === 'Color'" class="flex space-x-4 mb-5 border border-black p-4" >
      <Button label="Rojo" severity="danger" outlined size="small"/>
      <Button label="Negro" severity="secondary" outlined size="small"/>
    </div>
    <div v-if="selectedOption === 'ParesImpares'" class="grid grid-cols-2 gap-4 mb-5 border border-black p-4">
      <Button label="Pares" severity="danger" outlined size="small"/>
      <Button label="Impares" severity="secondary" outlined size="small" />
      <Button label="Impares" severity="danger" outlined size="small" />
      <Button label="Pares" severity="secondary" outlined size="small" />
    </div>
    <div v-if="selectedOption === 'NumeroColor'" class="flex flex-col space-y-4 mb-5 border border-black p-4">
      <InputText placeholder="Número" />
      <div class="flex space-x-4">
        <Button label="Rojo" severity="danger" outlined size="small" />
        <Button label="Negro" severity="secondary" outlined size="small"/>
      </div>
    </div>
</template>

<style scoped>  
</style>