// Utilities
import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    items: [] as { id: number; quantity: number }[],
  }),
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    itemQuantity: (state) => (itemId: number) => {
      const item = state.items.find((i) => i.id === itemId);
      return item ? item.quantity : 0;
    },
  },
  actions: {
    addToCart(item: { id: number; quantity: number }) {
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.items.push(item);
      }
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter((i) => i.id !== itemId);
    },
    setItemQuantity(itemId: number, quantity: number) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart() {
      this.items = [];
    },
  },
});
