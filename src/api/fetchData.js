import { axios } from "../../lib/axios";
export const fetchRates = async (currencyOne) => {
  const { data } = await axios.get(
    `/latest?base=${currencyOne}&apikey=${import.meta.env.VITE_API_KEY}`
  );
  console.log(import.meta.env.VITE_API_KEY)
  return data;

};

export const fetchSymbols = async () => {
  const { data } = await axios.get(
    `/symbols?apikey=${import.meta.env.VITE_API_KEY}`
  );
  return data;
};
