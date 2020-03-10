import { useContext } from "react";
import { storesContext } from "./stores";

export const useStores = () => {
  const stores = useContext(storesContext)
  if (!stores) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return stores;
}
