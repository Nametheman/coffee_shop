import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BeansData from '../data/BeanData';
import CoffeeData from '../data/CoffeeData';

export const useStore = create(
  persist(
    (set: (partial: any, replace?: boolean | undefined) => void, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      CartList: [],
      FavouriteList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state: any) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size === cartItem.sizes[0].size
                  ) {
                    state.CartList[i].prices[j].quantity++;
                    size = true;
                    break;
                  }
                }
                if (!size) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].price.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  } else if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateTotalPrice: () =>
        set(
          produce((state: any) => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempPrice =
                  tempPrice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].itemPrice = tempPrice.toFixed(2).toString();
              totalPrice = totalPrice + tempPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce((state: any) => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavouriteList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type === 'Beans') {
              for (let i = 0; i < state.BeansList.length; i++) {
                if (state.BeansList[i].id === id) {
                  if (state.BeansList[i].favourite === false) {
                    state.BeansList[i].favourite = true;
                    state.FavouriteList.unshift(state.BeansList[i]);
                  }
                  break;
                }
              }
            }
          }),
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce((state: any) => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === true) {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Beans') {
              for (let i = 0; i < state.BeansList.length; i++) {
                if (state.BeansList[i].id === id) {
                  if (state.BeansList[i].favourite === true) {
                    state.BeansList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavouriteList.length; i++) {
              if (state.FavouriteList[i].id == id) {
                spliceIndex = i;
                return;
              }
            }
            state.FavouriteList.splice(spliceIndex, 1);
          }),
        ),
    }),
    {
      name: 'coffee-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
