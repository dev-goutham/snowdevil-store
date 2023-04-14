import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const currencyOptions = [
  'USD',
  'CAD',
  'INR',
  'JPY',
  'GBP',
  'EUR',
  'AUD',
  'RUB',
] as const;

type CurrencyOptions = (typeof currencyOptions)[number];

interface ICurrencyContext {
  selected: CurrencyOptions;
  changeSelected: (val: CurrencyOptions) => void;
  exchangeRates: Record<CurrencyOptions, number> | null;
  currencyOptions: typeof currencyOptions;
}

const CurrencySelectorContext = createContext<ICurrencyContext>({
  selected: 'USD',
  changeSelected: () => {},
  exchangeRates: null,
  currencyOptions,
});

export const CurrencySelectorProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selected, setSelected] = useState<CurrencyOptions>('USD');
  const [exchangeRates, setExchangeRates] =
    useState<ICurrencyContext['exchangeRates']>(null);

  useEffect(() => {
    const storedCurrency =
      (window.localStorage.getItem('currency') as CurrencyOptions) || 'USD';
    setSelected(storedCurrency);
  }, []);

  const getExchangeRates = useCallback(async () => {
    return (
      (await (
        await fetch(
          'https://v6.exchangerate-api.com/v6/6e0045df844a9293e7605837/latest/USD',
        )
      )
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .json()) as {conversion_rates: Record<CurrencyOptions, number>}
    );
  }, []);

  useEffect(() => {
    getExchangeRates().then((res) => {
      setExchangeRates(res['conversion_rates']);
    });
  }, [getExchangeRates]);

  const changeSelected = (val: CurrencyOptions) => {
    setSelected(val);
    window.localStorage.setItem('currency', val);
  };

  return (
    <CurrencySelectorContext.Provider
      value={{selected, changeSelected, exchangeRates, currencyOptions}}
    >
      {children}
    </CurrencySelectorContext.Provider>
  );
};

export const useCurrencySelector = () => {
  return useContext(CurrencySelectorContext);
};
