import { defineStore } from 'pinia';
import { getUserById, createUser, updateUser } from '../services/userService.js';

export const userStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      amount: 0},
    loading: false,
    isAuthenticated: false,
    isNew: true,
    error: null,
    amountNew: 0
  }),
  actions: {
    async login() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getUserById(this.user.name);
        if (response) {
          this.user.name = response.data.name;
          this.user.amount = response.data.saldo;
          this.isAuthenticated = true;
          this.isNew = false;
        } else {
          const createUserResponse = await createUser( this.user.name );
          try{
              if(createUserResponse){
                  this.isNew = true;
                  this.user.name = createUserResponse.data.name;
                  this.user.amount = createUserResponse.data.amount;
                  this.isAuthenticated = true;
                }
          }catch(err){
            console.log(err);
          }
        }
      } catch (err) {
        this.error = 'An error occurred while logging in.';
      } finally {
        this.loading = false;
      }
  },
    logout() {
      this.isAuthenticated = false,
      this.user = { name: '', amount: 0 },
      this.isNew = true,
      this.amountNew= 0
    },
   async updateSaldo() {
    try{
        const response = await updateUser( this.user.name, this.amountNew );
        this.user.amount = response.data.saldo;
        
    }
    catch(err){
      console.log(err);
    }
   },
}
});
