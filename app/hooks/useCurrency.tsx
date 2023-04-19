import {useEffect, useState} from 'react';
import {useCurrencySelector} from '~/context/CurrencySelector';

const useCurrency = (amount: number, roundUp = false) => {
  const {selected, exchangeRates} = useCurrencySelector();
  const [formattedAmount, setFormattedAmount] = useState('');

  useEffect(() => {
    if (exchangeRates) {
      setFormattedAmount(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: selected,
        }).format(Math.ceil(amount * exchangeRates[selected])),
      );
    } else {
      setFormattedAmount(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: selected,
        }).format(Math.ceil(amount)),
      );
    }
  }, [amount, selected, exchangeRates]);

  return formattedAmount;
};

export default useCurrency;
