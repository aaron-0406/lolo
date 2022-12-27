import { createContext, useContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { CustomerHasBankType } from "../types/customer-has-bank";
import { CustomerType } from "../types/customer.type";

const appLoloClientStateKey = "lolo:client";
const appLoloBankStateKey = "lolo:bank";
const appLoloSelectedBankStateKey = "lolo:selected:bank";

const initialCustomerState: CustomerType = {
  id: 0,
  ruc: "",
  companyName: "",
  urlIdentifier: "",
  state: false,
};

export const LoloContext = createContext<{
  client: {
    customer: CustomerType;
    setCustomer: (customer: CustomerType) => void;
  };
  bank: {
    banks: Array<CustomerHasBankType>;
    setBanks: (banks: Array<CustomerHasBankType>) => void;
    selectedBank: number;
    setSelectedBank: (selectedBank: number) => void;
  };
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
    appLoloClientStateKey,
    initialCustomerState
  );

  const [banksState, setBanksState] = usePersistedState<
    Array<CustomerHasBankType>
  >(appLoloBankStateKey, []);

  const [selectedBankState, setSelectedBankState] = usePersistedState(
    appLoloSelectedBankStateKey,
    0
  );

  const setCustomer = (customer: CustomerType) => {
    setCustomerState(customer);
  };

  const setBanks = (banks: Array<CustomerHasBankType>) => {
    setBanksState(banks);
  };

  const setSelectedBank = (selectedBank: number) => {
    setSelectedBankState(selectedBank);
  };

  return (
    <LoloContext.Provider
      value={{
        client: {
          customer: customerState,
          setCustomer,
        },
        bank: {
          banks: banksState,
          setBanks,
          selectedBank: selectedBankState,
          setSelectedBank,
        },
      }}
    >
      {children}
    </LoloContext.Provider>
  );
};
