import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    getters: {
        double: (state) => state.count * 2,
        trippel: (state) => state.count * 3,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})