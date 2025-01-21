import { Middleware } from '@reduxjs/toolkit';

// Save State in Local Storage
const saveState = (state: any) => {
  if (typeof localStorage != "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('appState', serializedState);
    } catch (err) {
      console.error('Could not save state to localStorage', err);
    }
  }
};

// Get State from Local Storage
export const loadState = () => {
  if (typeof localStorage != "undefined") {
    try {
      const serializedState = localStorage.getItem('appState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Could not load state from localStorage', err);
      return undefined;
    }
  } return undefined;
};

// Local Storage Middleware
export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  // Save the new state to localStorage after every action is dispatched
  saveState(store.getState());
  return result;
};
