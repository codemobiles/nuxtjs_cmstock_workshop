export const useIndexStore = defineStore("index", {
    // other options...
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount(): number {
            return this.count * 2;
        },
    },
    actions: {
        increment() {
            this.count++;
        },
    },
});
