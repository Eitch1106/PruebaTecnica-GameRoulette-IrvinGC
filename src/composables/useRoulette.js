import { storeToRefs } from "pinia";
import { rouletteStore } from "@/stores/rouletteStore";

export const useRoulette = () => {
    
    const spinStore = rouletteStore();
    const { bet, spin, spinR } = storeToRefs(spinStore);

    const play = async () => {
        if (!bet.value.betType && !bet.value.betValue && bet.value.betAmount == 0) return;
        await spinStore.spinR();
    }
    return{
        bet,
        spin,

        play
    }
}