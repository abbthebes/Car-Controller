/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from 'quasar/wrappers';
import { createPinia, Pinia } from 'pinia';


export default store(() => {
  const pinia = createPinia();
  return pinia;
});