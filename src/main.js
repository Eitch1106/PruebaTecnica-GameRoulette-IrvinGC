import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import Lara from './presets/lara'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import SplitButton from 'primevue/splitbutton';
import 'primeicons/primeicons.css'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

const app = createApp(App)

app.use(router)
app.use(ToastService);

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});
app.use(createPinia())

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Card', Card)
app.component('SplitButton', SplitButton)
app.component('Toast', Toast)
app.directive('tooltip', Tooltip);
app.mount('#app')
