import api from "@/Api/api";

export const spinRoulette = async (userName, betType, betValue, betAmount) => {
    return await api.post(`/roulette/spin`,
        {
           userName: userName,
           betType: betType,
           betValue: betValue,
           betAmount: betAmount

        });
};