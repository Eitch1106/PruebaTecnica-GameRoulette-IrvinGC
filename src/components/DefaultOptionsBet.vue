<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoulette } from '@/composables/useRoulette';

const selectedOption = ref('');

const inputValue = ref('');
const selectedColor = ref('');
const selectOption = (option) => {
selectedOption.value = option;
bet.value.betType = option;
};

const selectParityColor=(valueBet)=>{
  bet.value.betValue = valueBet;
}

const onlyColor=(color)=>{
  bet.value.betValue = color;
}

// Método para actualizar el color seleccionado y la apuesta si ya hay un número ingresado
const updateBetValue = (color) => {
  selectedColor.value = color;
  if (inputValue.value) {
    bet.value.betValue = `${inputValue.value} ${color}`;
  }
};

// Método para actualizar la apuesta cuando cambia el valor del input
const handleInputChange = () => {
  if (selectedColor.value) {
    bet.value.betValue = `${inputValue.value} ${selectedColor.value}`;
  }
};
const { bet } = useRoulette();
</script>

<template>

<div class="flex space-x-4 mb-5">
        <Button label="Color" @click="selectOption('Color')" severity="danger" 
        :rounded="selectedOption !== 'Color'" :raised="selectedOption === 'Color'"/>
        <Button label="Pares / Impares" @click="selectOption('ParityColor')" severity="secondary" 
        :rounded="selectedOption !== 'ParityColor'" :raised="selectedOption === 'ParityColor'"/>
        <Button label="Número y Color" @click="selectOption('NumberColor')" severity="danger" 
        :rounded="selectedOption !== 'NumberColor'" :raised="selectedOption === 'NumberColor'" 
        style="background-color: #8E4232 " />
      </div>
      <div v-if="selectedOption === 'Color'" class="flex space-x-4 mb-5 border border-black p-4" >
      <Button label="Rojo" @click="onlyColor('Rojo')" severity="danger" outlined size="small"/>
      <Button label="Negro" @click="onlyColor('Negro')" severity="secondary" outlined size="small"/>
    </div>
    <div v-if="selectedOption === 'ParityColor'" class="grid grid-cols-2 gap-4 mb-5 border border-black p-4">
      <Button label="Pares" @click="selectParityColor('Even Rojo')" severity="danger" outlined size="small"/>
      <Button label="Impares" @click="selectParityColor('Odd Negro')" severity="secondary" outlined size="small" />
      <Button label="Impares" @click="selectParityColor('Odd Rojo')" severity="danger" outlined size="small" />
      <Button label="Pares" @click="selectParityColor('Even Negro')" severity="secondary" outlined size="small" />
    </div>
    <div v-if="selectedOption === 'NumberColor'" class="flex flex-col space-y-4 mb-5 border border-black p-4">
      <InputText placeholder="Número" v-model="inputValue" @input="handleInputChange" />
      <div class="flex space-x-4">
        <Button label="Rojo" @click="updateBetValue('Rojo')" severity="danger" outlined size="small" />
        <Button label="Negro" @click="updateBetValue('Negro')" severity="secondary" outlined size="small"/>
      </div>
    </div>
</template>

<style scoped>  
</style>