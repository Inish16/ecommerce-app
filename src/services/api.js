const API = "https://fakestoreapi.com/products";

export const getProducts = async () => {
  const res = await fetch(API);
  return res.json();
};