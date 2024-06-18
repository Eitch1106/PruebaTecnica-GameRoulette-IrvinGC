  <script setup>
  import DefaultHeader from '@/components/DefaultHeader.vue';
  import DefaultOptionsBet from '@/components/DefaultOptionsBet.vue';
  import { ref } from 'vue';

  const cantidad = ref('');

</script>
  <template>

    <DefaultHeader />

    <div class="flex flex-col items-center mt-40">

      <h2 class="text-xl mb-5">Tipo de apuesta</h2>
      <DefaultOptionsBet/>
      <InputText v-model="cantidad" placeholder="Cantidad a apostar" class="mb-5" />
      <div class="mb-5 text-green-500">Saldo:$</div>
      <div class="mb-5 text-black">{{ cantidad }}</div>
      <Button label="Girar" class="p-button-success" />
    </div>
  </template>
<style scoped></style>
