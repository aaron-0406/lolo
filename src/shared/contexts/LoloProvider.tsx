import { createContext, useContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { CustomerType } from "../types/customer.type";

const appLoloStateKey = "lolo";

const initialCustomerState: CustomerType = {
  id: 0,
  ruc: "",
  companyName: "",
  urlIdentifier: "",
  state: false,
};

export const LoloContext = createContext<{
  customer: CustomerType;
  setCustomer: (customer: CustomerType) => void;
} | null>(null);

export const useLoloContext = () => {
  const context = useContext(LoloContext);

  if (context === null) {
    throw new Error("useLoloContext must be used within a LoloProvider");
  }

  return context;
};

type LoloProviderProps = {
  children: React.ReactNode;
};

export const LoloProvider: React.FC<LoloProviderProps> = ({ children }) => {
  const [customerState, setCustomerState] = usePersistedState(
    appLoloStateKey,
    initialCustomerState
  );

  const setCustomer = (customer: CustomerType) => {
    setCustomerState(customer);
  };

  return (
    <LoloContext.Provider
      value={{
        customer: customerState,
        setCustomer,
      }}
    >
      {children}
    </LoloContext.Provider>
  );
};
