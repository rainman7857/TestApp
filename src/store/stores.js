import { createContext } from 'react';

import MainStore from "./MainStore";

export const storesContext = createContext({
  MainStore: new MainStore(),
});
