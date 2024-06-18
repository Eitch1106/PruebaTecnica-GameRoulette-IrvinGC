import { defineStore } from 'pinia';
import { spinRoulette } from '@/services/rouletteService';
import { boolean } from 'joi';



export const rouletteStore = defineStore('roulette', {
    state: () => ({
        bet: {
          userName: '',
          betType: '',
          betValue: '',
          betAmount: 0
        },
        spin:{
          number: 0,
          numberType: undefined,
          color: '',
          win: boolean,
          totalAmount: 0,
          winnings: 0
        },
        optionsBet:{
          typeBet: '',
          valueBet: ''

        } 
    }),
    actions: {
        async spinR() {
            try{
              const response = await spinRoulette(
                this.bet.userName,
                this.bet.betType,
                this.bet.betValue,
                this.bet.betAmount
            );
            console.log("LA respuesta:" ,response);
            if (response) {
              this.spin.number = response.data.number;
              this.spin.numberType = response.data.numberType;
              this.spin.color = response.data.color;
              this.spin.win = response.data.win;
              this.spin.totalAmount = response.data.totalAmount;
              this.spin.winnings = response.data.winnings;
            }
              
            }
            catch(err){
              console.log(err);
            }
        }
    }
})