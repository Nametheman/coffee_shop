import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BeansData from '../data/BeanData';
import CoffeeData from '../data/CoffeeData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      CartList: [],
      FavouriteList: [],
      OrderHistoryList: [],
    }),
    {
      name: 'coffee-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
