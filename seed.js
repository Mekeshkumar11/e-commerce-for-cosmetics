const mongoose = require("mongoose");
const createModel = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/cosmetics", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    collection: "facewash",
    products: [
      {
        name: "Nivea Purifying Face Wash",
        price: 299,
        rating: 4.3,
        reviews: 128,
        image: "https://img.nivea.com/-/media/miscellaneous/media-center-items/4/2/0/d7bc71df2e514f3a806c5f09801cc916-web_1010x1180_transparent_png.webp?mw=768&hash=65851B4A18755D6BA3E51DFB479C578C"
      },
      {
        name: "Himalaya Neem Face Wash",
        price: 180,
        rating: 4.5,
        reviews: 250,
        image: "https://imgs.search.brave.com/v_gVzu3I2ud5HULTy2_tFP3UHT_eVDghXZBusQtteiU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaW1h/bGF5YXdlbGxuZXNz/LmV1L2Nkbi9zaG9w/L2ZpbGVzL1B1cmlm/eWluZy1OZWVtLUZh/Y2UtV2FzaC1Gcm9u/dC5qcGc_dj0xNzA4/NTA0OTAyJndpZHRo/PTEwODA"
      }
    ]
  },
  {
    collection: "makeupremover",
    products: [
      {
        name: "Estée Lauder Liquid Makeup Remover Lotion ",
        price: 150,
        rating: 4.1,
        reviews: 78,
        image: "https://imgs.search.brave.com/b5QD-cBMIVixP1X7erpYWzY_akfK_sc4vctshTrUpQc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFoa3RXRzJRSkwu/anBn"
      }
    ]
  },
  {
    collection: "micellarwater",
    products: [
      {
        name: "NIVEA Skin Glow Serum Infused Micellar Water",
        price: 199,
        rating: 4.4,
        reviews: 342,
        image: "https://img.nivea.com/-/media/miscellaneous/media-center-items/c/5/2/dcd22e17d78841af84d7b9d36d85e888-web_1010x1180_transparent_png.webp?mw=768&hash=C1AD43BCB5F5645142EE4E4DB4A9D392"
      }
    ]
  },
  {
    collection: "toner",
    products: [
      {
        name: "Elvey Essentials Glo Brightening Face Toner",
        price: 399,
        rating: 4,
        reviews: 1289,
        image: "https://m.media-amazon.com/images/I/31K7mHELDTL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Plum Green Tea Face Toner For Oily, Acne-Prone Skin ",
        price: 380,
        rating: 4.5,
        reviews: 550,
        image: "https://m.media-amazon.com/images/I/21EBBzm7q4L._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Plum Bulgarian Valley Rose Water Face Toner",
        price: 299,
        rating: 3.7,
        reviews: 189,
        image: "https://m.media-amazon.com/images/I/31KK2OOzv4L._SX300_SY300_QL70_FMwebp_.jpg"
      }
    ]
  },
  {
    collection: "cleansingbar",
    products: [
      {
        name: "Sebamed Cleansing Bar",
        price: 99,
        rating: 4,
        reviews: 178,
        image: "https://m.media-amazon.com/images/I/31Ai--a5hEL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "The Body Shop British Rose Cleansing Face & Body Bar",
        price: 80,
        rating: 3.5,
        reviews: 250,
        image: "https://m.media-amazon.com/images/I/41bbHmd3Q+L._SX342_SY445_.jpg"
      }
    ]
  },
  {
    collection: "daycream",
    products: [
      {
        name: "Forest Essentials Eladi Day Cream SPF 30",
        price: 2989,
        rating: 4.3,
        reviews: 1258,
        image: "https://m.media-amazon.com/images/I/31aw7rmgfQL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Olay Moisturising Cream ",
        price: 280,
        rating: 4.5,
        reviews: 250,
        image: "https://m.media-amazon.com/images/I/41xTP-zlrJL._SX300_SY300_QL70_FMwebp_.jpg"
      }
    ]
  },
  {
    collection: "wipes",
    products: [
      {
        name: "Savlon Germ Protection Multipurpose Thick & Soft Wet Wipes",
        price: 185,
        rating: 4,
        reviews: 129,
        image: "https://m.media-amazon.com/images/I/41ky-fbD8ZL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Dettol Germ Protection Wet Wipes for Skin & Surfaces",
        price: 203,
        rating: 3.5,
        reviews: 550,
        image: "https://m.media-amazon.com/images/I/41e3lMBq4sS._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Lacto Calamine Daily Cleansing Facial Wipes",
        price: 129,
        rating: 4.7,
        reviews: 289,
        image: "https://m.media-amazon.com/images/I/31eP0jG+mbL._SY300_SX300_.jpg"
      }
    ]
  },
  {
    collection: "nightcream",
    products: [
      {
        name: "Dot & Key Night Reset Retinol + Ceramide Night Cream",
        price: 599,
        rating: 4,
        reviews: 1629,
        image: "https://m.media-amazon.com/images/I/61yBBlMifkL._SX522_.jpg"
      },
      {
        name: "Lacto Calamine Green Tea Night Gel Moisturizer For Women ",
        price: 249,
        rating: 3.9,
        reviews: 350,
        image: "https://m.media-amazon.com/images/I/31uRdAAlIpL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Plum Green Tea Renewed Clarity Night Gel ",
        price: 499,
        rating: 3.7,
        reviews: 189,
        image: "https://m.media-amazon.com/images/I/41eu9rXfJzL._SX522_.jpg"
      }
    ]
  },
  {
    collection: "tintedcream",
    products: [
      {
        name: "brwn. pro melanin care Tinted Moisturizer For Face",
        price: 499,
        rating: 4.0,
        reviews: 19,
        image: "https://m.media-amazon.com/images/I/31+3KmLRmwL._SY300_SX300_.jpg"
      },
      {
        name: "FACES CANADA Peaches N Cream Tinted Moisturizer",
        price: 460,
        rating: 3.9,
        reviews: 1550,
        image: "https://m.media-amazon.com/images/I/41t0UYiOfVL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "FACESCANADA Strobe Cream - Rose Gold",
        price: 499,
        rating: 3.9,
        reviews: 689,
        image: "https://m.media-amazon.com/images/I/31sWZEpp7HL._SX300_SY300_QL70_FMwebp_.jpg"
      }
    ]
  },
  {
    collection: "lotion",
    products: [
      {
        name: "POND'S HYDRA MIRACLE BODY GEL LOTION",
        price: 269,
        rating: 4.5,
        reviews: 289,
        image: "https://m.media-amazon.com/images/I/51x9TTkP4aL._SX522_.jpg"
      },
      {
        name: "NIVEA Nourishing Body Milk 600ml Body Lotion ",
        price: 320,
        rating: 4.4,
        reviews: 850,
        image: "https://m.media-amazon.com/images/I/31saK6Qrn4L._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Himalaya Herbals Intensive Body Lotion, Cocoa Butter, 400ml",
        price: 189,
        rating: 3.7,
        reviews: 489,
        image: "https://m.media-amazon.com/images/I/51HzgC8ytcL._SY741_.jpg"
      }
    ]
  },
  {
    collection: "gradualtan",
    products: [
      {
        name: "Body Drench Quick Tan Gradual Tanning Lotion, Medium, 8 Ounce",
        price: 2399,
        rating: 4.7,
        reviews: 289,
        image: "https://m.media-amazon.com/images/I/31W4TK7pjRL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      {
        name: "Raaga Professional De-Tan Pack ",
        price: 1380,
        rating: 3.9,
        reviews: 750,
        image: "https://m.media-amazon.com/images/I/314EkF7q+ZL._SY300_SX300_.jpg"
      },
      {
        name: "Ozone D-Tan Facial Cleanser",
        price: 528,
        rating: 3.7,
        reviews: 789,
        image: "https://m.media-amazon.com/images/I/31yBDl3tkgL._SX300_SY300_QL70_FMwebp_.jpg"
      }
    ]
  },
 
];

// Insert sample data
async function seedDB() {
  for (let category of categories) {
    const Product = createModel(category.collection);
    await Product.deleteMany({});
    await Product.insertMany(category.products);
    console.log(`Seeded ${category.collection}`);
  }
  mongoose.disconnect();
}

seedDB();
