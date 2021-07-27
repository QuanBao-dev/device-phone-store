import { cartStream } from "./Cart";

export const parseCurrency = (string) => {
  const number = parseInt(string.replace(",", "")).toString();
  const length = number.length;
  let ans = "";
  for (let i = 0; i < length - 1; i++) {
    ans += number[i];
    if ((length - (i + 1)) % 3 === 0) {
      ans += ",";
    }
  }
  let decimalNumber = "";
  if (string.indexOf(".") !== -1)
    decimalNumber = string.slice(string.indexOf("."), string.length);
  return ans + number[length - 1] + decimalNumber;
};

export const parseUrlTitle = (title) => {
  return title
    .toLocaleLowerCase()
    .replace(/[″!@#$%^&*.]/g, "")
    .replace(/ /g, "-");
};

export const parseFloatCurrency = (string) => {
  return parseFloat(string.replace("$", ""));
};

export const convertFloatToCurrency = (float, numberOfProduct) => {
  return parseCurrency(
    (parseFloatCurrency(float) * numberOfProduct).toFixed(2).toString()
  );
};

export const currentTotalCart = () => {
  return cartStream.currentState().dataCart.reduce((ans, curr) => {
    const { newPrice, originalPrice, title } = curr;
    const numberOfProducts = cartStream.currentState().cartNumberOfProduct[
      title
    ];
    const price =
      parseFloat((!newPrice ? originalPrice : newPrice).replace("$", "")) *
      numberOfProducts;
    ans += price;
    return ans;
  }, 0);
};

export const optionSelect = [
  "Acoustics",
  "Action Camcorders",
  "Apple",
  "Apple iMac",
  "Apple iPads",
  "Apple iPads Mini",
  "Apple LED TVs",
  "Apple Macbook",
  "Asus",
  "Cameras",
  "Cell Phones",
  "Computer Hardware",
  "Daydream View",
  "Dell Laptop",
  "LED TVs",
  "Digital Camcorders",
  "Ear Headphones",
  "HTC",
  "IPhone",
  "Keyboards",
  "Laptops",
  "LED TVs ",
  "Meizu",
  "Mice",
  "Monitors",
  "Motorola",
  "Nintendo Switch",
  "Nokia",
  "OnePlus",
  "Over-Ear & On-Ear Headphones",
  "Powerbank",
  "Samsung",
  "Smart Watches",
  "Sony",
  "Tablets",
  "Televisions",
  "Uncategorized",
  "Video Games",
  "Xbox PlayStation",
  "Xiaomi",
];