  <script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import DefaultHeader from '@/components/DefaultHeader.vue';
  import DefaultOptionsBet from '@/components/DefaultOptionsBet.vue';
  import { ref, watch } from 'vue';
  import { userStore } from '@/stores/userStore';
  import Joi from 'joi';
  import { useRoulette } from '@/composables/useRoulette';

  const loginStore = userStore();
  const { user } = storeToRefs(loginStore);
  const saldo = user.value.amount;
  const name = user.value.name;

  const cantidad = ref('');
  const errors = ref([]);
  const win = ref();

  const { bet, spin, play } = useRoulette();


  const schema = Joi.object({
    cantidad: Joi.number().min(1).max(saldo).required().messages
      ({
        "number.min": "La cantidad debe ser mayor a 0",
        "number.max": "La cantidad no puede ser mayor al saldo actual",
        "any.required": "Debes apostar un valor aunque sea mínimo",

      }),
  });

  const validateAmount = () => {
    const result = schema.validate({ cantidad: cantidad.value }, { abortEarly: false });
    if (result.error) {
      errors.value = result.error.details.map(detail => detail.message);
    } else {
      errors.value = [];
    }
  };

  watch(cantidad, validateAmount);

  const handleSubmit = async () => {
    validateAmount();
    if (errors.value.length === 0) {
      bet.value.userName = name;
      bet.value.betAmount = cantidad.value;
      await play();
      if (spin.value.win) {
        win.value = true;
      }
      else {
        win.value = false;
        console.log('Intentalo de nuevo');
      }
    }
  };

</script>
  <template>

    <DefaultHeader />

    <div class="flex flex-col items-center mt-40">

      <h2 class="text-xl mb-5">Tipo de apuesta</h2>
      <DefaultOptionsBet />
      <form @submit.prevent="handleSubmit" class="flex flex-col items-center">
        <InputText v-model="cantidad" placeholder="Cantidad a apostar" class="mb-5" />
        <ul v-if="errors.length" class="mt-.5 text-red-500 mb-5">
          <li v-for="error in errors" :key="error">Error: {{ error }}</li>
        </ul>
        <div class="mb-5 text-black">
          <span>Saldo actual: ${{ saldo }}</span>
        </div>
        <div class="mb-5 text-black flex justify-between space-x-4 px-4">
          <span class="text-blue-500 font-mono font-bold border-l border-gray-400 pl-2">Tipo apuesta:
            {{ bet.betType }}</span>
          <span class="text-green-500 font-mono font-bold border-l border-gray-400 pl-2">Apuesta: {{ bet.betValue
            }}</span>
          <span class="text-red-500 font-mono font-bold border-l border-gray-400 pl-2">Monto: ${{ cantidad }}</span>
        </div>
        <Button label="Girar ruleta" type="submit" style="background-color: crimson" raised />
        <div v-if="win" class="mt-5 text-black flex justify-between space-x-4 px-4" style="display: block;">
          <p class="text-green-500 font-bold">Felicidades, has ganado</p>
          <div class="flex flex-col items-center space-y-1">
            <ul>
              <li class="text-green-500 font-bold">Número: {{ spin.number }}</li>
              <li class="text-green-500 font-bold">Tipo de número: {{ spin.numberType }}</li>
              <li class="text-green-500 font-bold">Color: {{ spin.color }}</li>
              <li class="text-red-500 font-bold">Nuevo Saldo: ${{ spin.totalAmount }}</li>
              <li class="text-green-500 font-bold">Perdidas: ${{ spin.winnings }}</li>
            </ul>
          </div>
        </div>
        <div v-else class="mt-5 text-black flex justify-between space-x-4 px-4" style="display: block;">
          <p class="text-red-500 font-bold">Lo sentimos, no has ganado</p>
          <div class="flex flex-col items-center space-y-1">
            <ul>
              <li class="text-green-500 font-bold">Número: {{ spin.number }}</li>
              <li class="text-green-500 font-bold">Tipo de número: {{ spin.numberType }}</li>
              <li class="text-green-500 font-bold">Color: {{ spin.color }}</li>
              <li class="text-red-500 font-bold">Nuevo Saldo: ${{ spin.totalAmount }}</li>
              <li class="text-green-500 font-bold">Perdidas: ${{ spin.winnings }}</li>
            </ul>
          </div>
        </div>

      </form>
    </div>
  </template>
<style scoped></style>
