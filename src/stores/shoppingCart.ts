// Utilities
import { useLocalStorage } from '@/composables/useLocalStorage';
import { defineStore } from 'pinia';

type StateType = {
  id: number;
  quantity: number;
};

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const items = ref<StateType[]>([]);

  const { setItem, getItem } = useLocalStorage('shopping-cart');

  items.value = getItem<StateType[]>() || ([] as StateType[]);

  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  function itemQuantity(itemId: number) {
    const item = items.value.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  }

  function addToCart(item: { id: number; quantity: number }) {
    const existingItem = items.value.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.value.push(item);
    }

    setItem(items.value);
  }

  function removeFromCart(itemId: number) {
    items.value = items.value.filter((i) => i.id !== itemId);
    setItem(items.value);
  }

  function setItemQuantity(itemId: number, quantity: number) {
    const item = items.value.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }

    setItem(items.value);
  }

  function clearCart() {
    items.value = [];
    setItem(items.value);
  }

  return {
    items,
    itemCount,
    itemQuantity,
    addToCart,
    removeFromCart,
    setItemQuantity,
    clearCart,
  };
});
