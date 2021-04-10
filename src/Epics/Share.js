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
  "Dell LED TVs",
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

export let dataListProduct = [
  {
    title: "12-inch Intel Core",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/13-3-540x540.jpg",
    tags: ["Apple Macbook", "Laptops"],
    originalPrice: "$1120.00",
    star: 2,
    isSale: false,
    newPrice: null,
    description: `Proin ut urna eget tortor scelerisque porttitor. Donec at justo tellus. Integer maximus erat justo, a accumsan leo iaculis nec. Maecenas tempor, ex sed tempor vulputate, elit mauris vulputate odio, sed cursus diam dolor ut libero. Quisque vel lobortis turpis. Aenean leo quam, varius a fermentum et, venenatis eu lacus. Vestibulum facilisis elit in tincidunt vehicula. Morbi sit amet molestie nibh, id convallis nisl. Ut vel nunc sit amet lorem venenatis consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris egestas dui vitae dolor feugiat accumsan. Aliquam accumsan quam ac bibendum cursus. Fusce et nisl id neque auctor ullamcorper in a tellus. Fusce non erat vitae purus tempor pretium.

    Praesent commodo risus ac risus fringilla, quis lacinia felis lobortis. Donec maximus sed leo a rhoncus. Mauris turpis diam, gravida ac turpis nec, vestibulum pellentesque leo. Ut quis mauris sit amet sem congue tincidunt. Cras posuere, quam sed gravida vulputate, nisi sem auctor risus, vel malesuada ante arcu in nisl. Vestibulum eu ultrices ipsum. Vivamus tristique vehicula massa. Aliquam blandit cursus metus. Maecenas semper fermentum sagittis.
    
    Vivamus sit amet mauris imperdiet, efficitur libero in, mollis magna. Quisque lacinia volutpat tortor, nec ultrices velit pulvinar sit amet. Nulla eleifend leo ut risus elementum scelerisque id ac mi. Mauris efficitur cursus sem sed sagittis. Vivamus commodo enim non dolor convallis, porttitor eleifend urna faucibus. Donec nec augue sit amet eros bibendum aliquet id quis eros. Suspendisse lobortis lobortis nibh in lobortis. Vestibulum imperdiet, enim sit amet fringilla viverra, leo sem pellentesque nunc, vel vehicula metus ex mattis libero.`,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "3M PF Apple iMac",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/4-2-540x540.jpg",
    tags: ["Apple iMac", "Laptops"],
    originalPrice: "$120.00",
    star: 2,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple 21.5″ LED",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/7-2-540x540.jpg",
    tags: ["Apple LED TVs", "Monitors"],
    originalPrice: "$150.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple 9.7″ iPad",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/18-3-540x540.jpg",
    tags: ["Apple iPads", "Tablets"],
    originalPrice: "$200.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple Fitness Watch",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/26-2-540x540.jpg",
    tags: ["Apple", "Smart Watches"],
    originalPrice: "$150.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple iPhone 5S 32GB GM",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/11-2-540x540.jpg",
    tags: ["Cell Phones", "IPhone"],
    originalPrice: "$700.00",
    star: 3,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple iPhone 6",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/20-3-540x540.jpg",
    tags: ["Cell Phones", "IPhone"],
    originalPrice: "$400.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    reviews: [
      {
        imageUrl:
          "https://secure.gravatar.com/avatar/cec22fb290043e2c1b9972d9bc2f0cfb?s=70&d=mm&r=g",
        username: "cmsmasters",
        star: 4,
        createdAt: "October 12, 2017",
        content: "Aenean semper varius pellentesque",
      },
    ],
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple iPhone 6 16GB",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/12-2-540x540.jpg",
    tags: ["Cell Phones", "IPhone"],
    originalPrice: "$700.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple Macbook",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/12-3-540x540.jpg",
    tags: ["Apple Macbook", "Laptops"],
    originalPrice: "$1000.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple Magic Mouse",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/35-2-540x540.jpg",
    tags: ["Computer Hardware", "Mice"],
    originalPrice: "$60.00",
    star: 5,
    isSale: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: "$50.00",
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Apple Silicone Watch",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/16-3-540x540.jpg",
    tags: ["Apple", "Smart Watches"],
    originalPrice: "$200.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Asus Zenbook ux360ca",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/2-3-540x540.jpg",
    tags: ["Asus", "Laptops"],
    originalPrice: "$1100.00",
    star: 5,
    isSale: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: "$900.00",
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Bluetooth Keyboard",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/34-2-540x540.jpg",
    tags: ["Computer Hardware", "Keyboards"],
    originalPrice: "$55.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Dell 12.0-inch 256GB",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/5-2-540x540.jpg",
    tags: ["Dell Laptop", "Laptops"],
    originalPrice: "$800.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Google Daydream VR",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/7-3-540x540.jpg",
    tags: ["Computer Hardware", "Daydream View"],
    originalPrice: "$420.00",
    star: 5,
    isSale: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: "$400.00",
    additionalInformation: {
      CPU: "Custom CPU @ 2.30 GHz, 8 cores",
      "Optical disc drive": "4K UHD Blu-ray",
      "Content protection": "HDCP 2.2",
      "CODECs decoded": "AAC, MP3, MPEG1, WMV",
    },
  },
  {
    title: "HTC Desire 830",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/15-2-540x540.jpg",
    tags: ["Cell Phones", "HTC"],
    originalPrice: "$400.00",
    star: 5,
    isSale: false,
    newPrice: null,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "JBL Pulse 3",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/15-540x540.jpg",
    tags: ["Acoustics", "Computer Hardware"],
    originalPrice: "$400.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Marshall – Major ii Brown",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/8-3-540x540.jpg",
    tags: ["Ear Headphones", "Headphones"],
    originalPrice: "$400.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Meizu M6 Note Blue",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/1-3-540x540.jpg",
    tags: ["Cell Phones", "Meizu"],
    originalPrice: "$400.00",
    star: 5,
    isSale: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: "$350.00",
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Misfit Shine 2",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/10-540x540.jpg",
    tags: ["Apple", "Smart Watches"],
    originalPrice: "$269.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Motorola Plus GSM",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/14-2-540x540.jpg",
    tags: ["Cell Phones", "Motorola"],
    originalPrice: "$500.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Motorola 32GB",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/18-2-540x540.jpg",
    tags: ["Cell Phones", "Motorola"],
    originalPrice: "$500.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Motorola Gear S2 Watch",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/19-3-540x540.jpg",
    tags: ["Motorola", "Smart Watches"],
    originalPrice: "$327.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Motorola GSM",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/19-2-540x540.jpg",
    tags: ["Cell Phones", "Motorola"],
    originalPrice: "$280.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Nokia 5",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/22-3-540x540.jpg",
    tags: ["Cell Phones", "Nokia"],
    originalPrice: "$400.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Nokia 6 Dual Sim",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/21-3-540x540.jpg",
    tags: ["Cell Phones", "Motorola"],
    originalPrice: "$280.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "OnePlus 5T",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/5-540x540.jpg",
    tags: ["Cell Phones", "OnePlus"],
    originalPrice: "$120.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Polaroid Cube+",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/9-3-540x540.jpg",
    tags: ["Action Camcorders", "Cameras"],
    originalPrice: "$200.00",
    star: 4,
    isSale: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: "$168.00",
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Refurbished Apple iPad Mini",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/21-2-540x540.jpg",
    tags: ["Apple iPads Mini", "Tablets"],
    originalPrice: "$170.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Refurbished iPad Mini 4th",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/24-3-540x540.jpg",
    tags: ["Apple iPads Mini", "Tablets"],
    originalPrice: "$200.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Samsung Galaxy J5 Black",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/20-2-540x540.jpg",
    tags: ["Cell Phones", "Samsung"],
    originalPrice: "$280.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Samsung Galaxy S8",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/14-3-540x540.jpg",
    tags: ["Cell Phones", "Samsung"],
    originalPrice: "$950.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Samsung Gear Blue",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/05/4-540x540.jpg",
    tags: ["Samsung", "Smart Watches"],
    originalPrice: "$40.00",
    star: 5,
    isSale: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: "$20.00",
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Samsung Level Over Silver",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/29-2-540x540.jpg",
    tags: ["Headphones", "Over-Ear & On-Ear Headphones"],
    originalPrice: "$55.00",
    star: 4,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Sony srs xb40",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/05/3-540x540.jpg",
    tags: ["Acoustics", "Computer Hardware"],
    originalPrice: "$400.00",
    star: 3,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Sony Watch 3 SWR50",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/17-3-540x540.jpg",
    tags: ["Smart Watches", "Sony"],
    originalPrice: "$327.00",
    star: 3,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Sony Watch Series F",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/23-3-540x540.jpg",
    tags: ["Smart Watches", "Sony"],
    originalPrice: "$327.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Tesla Generation",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/11-540x540.jpg",
    tags: ["Computer Hardware", "Powerbank"],
    originalPrice: "$300.00",
    star: 4,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Vizio Smart 1080p LED HDTV",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/09/10-2-540x540.jpg",
    tags: ["LED TVs", "Televisions"],
    originalPrice: "$200.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
  {
    title: "Xiaomi Mi Mix 2",
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2015/05/6-540x540.jpg",
    tags: ["Cell Phones", "Xiaomi"],
    originalPrice: "$55.00",
    star: 5,
    isSale: false,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique nibh ac ligula dapibus, quis ornare felis malesuada. Cras in feugiat diam. Donec euismod purus lorem, vel euismod sem pharetra at. Integer elit nulla, aliquet eget nisi lobortis, varius accumsan dui. Quisque semper dolor nibh, ac aliquet quam vehicula a. Aenean id consequat sapien, venenatis feugiat neque. Donec sit amet elit non ante eleifend sagittis sit amet eget mauris. Vestibulum nec pretium leo, sed lacinia odio. Vestibulum et tempor nunc. Etiam mattis porttitor lectus, vel egestas nunc dignissim ut. Sed mollis nisi nisl, porta egestas lectus porttitor quis. Sed arcu neque, consectetur ut bibendum at, tincidunt ut elit.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras sodales nisi pretium placerat tempus.
    Pellentesque id erat sodales, mollis turpis sed, bibendum justo.
    Nunc condimentum tortor non fringilla congue.
    Donec tempus odio eu libero mattis, in posuere nisl vulputate.
    Imperdiet mi. Suspendisse mollis leo in sapien venenatis, ac congue ex auctor. Donec dapibus ipsum ex, eu fringilla arcu elementum at. Nulla quis urna pharetra, tincidunt sem a, pharetra mauris. Duis vel posuere tortor. Integer at porttitor quam. Sed consequat nec dui ut feugiat. Phasellus feugiat non ante a lacinia. Sed accumsan magna eu dapibus tempus. Etiam euismod nulla sed ex ultrices gravida.`,
    newPrice: null,
    additionalInformation: {
      "Native Resolution": "720p",
      "Screen Size": "20 – 29 Inches",
      Material: "Paper",
      "Backlight Technologies": "LED",
      "Country of Origin": "South Korea",
    },
  },
].map((data) => {
  return {
    ...data,
    id: parseUrlTitle(data.title),
  };
});

export const getDataByTitle = (titleSearch) => {
  return dataListProduct[
    dataListProduct.findIndex(({ title }) => title === titleSearch)
  ];
};

export const getDataById = (idSearch) => {
  return dataListProduct[
    dataListProduct.findIndex(({ id }) => id === idSearch)
  ];
};

const getAllDataByTag = (tag) => {
  return dataListProduct.filter(({ tags }) => tags.includes(tag));
};

export const getAllDataByTags = (tagsProductData = []) => {
  return dataListProduct.reduce((ans, data) => {
    tagsProductData.forEach((tag) => {
      const matchData = getAllDataByTag(tag);
      matchData.forEach((dataMatch) => (ans[dataMatch.title] = dataMatch));
    });
    return ans;
  }, {});
};

export const postNewReview = (
  id,
  review = {
    imageUrl: "",
    username: "",
    star: 0,
    createdAt: "",
    content: "",
  }
) => {
  dataListProduct = dataListProduct.reduce((ans, data) => {
    if (data.id !== id) {
      ans.push(data);
      return ans;
    }
    if(data.reviews){
      data.reviews.push(review);
    } else {
      data.reviews = [review];
    }
    ans.push(data)
    return ans;
  }, []);
};