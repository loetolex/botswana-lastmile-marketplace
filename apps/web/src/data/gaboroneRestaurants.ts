export type DemoMenuItem = {
  name: string;
  price?: number;
  note?: string;
};

export type DemoStorefront = {
  id: string;
  name: string;
  area: string;
  cuisines: string[];
  rating?: number;
  reviews?: number;
  etaMinutes: number;
  deliveryFee: number;
  brand: [string, string];
  image: string;
  sourceLabel: string;
  sourceUrl: string;
  menu?: DemoMenuItem[];
};

const foodImages = {
  african:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
  grill:"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=80",
  cafe:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
  pizza:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=80",
  indian:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80",
  asian:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80",
  chicken:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=80",
  seafood:"https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80",
  fine:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80"
};

const T="https://www.tripadvisor.com/Restaurants-g293767-Gaborone_South_East_District.html";

export const gaboroneStorefronts: DemoStorefront[] = [
  {id:"sanitas",name:"Sanitas Restaurant",area:"Gaborone",cuisines:["Cafe","Garden"],rating:4.2,reviews:330,etaMinutes:31,deliveryFee:18,brand:["#10b981","#064e3b"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"courtyard",name:"The Courtyard @ BotswanaCraft",area:"Gaborone",cuisines:["African","Healthy"],rating:4.7,reviews:132,etaMinutes:34,deliveryFee:22,brand:["#f97316","#7c2d12"],image:foodImages.african,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"table50two",name:"Table50Two",area:"CBD",cuisines:["European","Fine dining"],rating:4.1,reviews:94,etaMinutes:33,deliveryFee:25,brand:["#7c3aed","#312e81"],image:foodImages.fine,sourceLabel:"Tripadvisor",sourceUrl:"https://www.tripadvisor.com/Restaurant_Review-g293767-d13227018-Reviews-Table50Two-Gaborone_South_East_District.html"},
  {id:"zen",name:"Zen Cafe Lounge",area:"Westgate Mall",cuisines:["Italian","Japanese"],rating:4.8,reviews:36,etaMinutes:27,deliveryFee:20,brand:["#ec4899","#7c3aed"],image:foodImages.asian,sourceLabel:"Official menu",sourceUrl:"https://zencafe.co.bw/menu",menu:[
    {name:"Prawn & Avocado Power Bowl",price:210,note:"Public menu"},
    {name:"6 Roses",price:100,note:"Public menu"},
    {name:"Tuna Tatar",price:250,note:"Public menu"},
    {name:"Garlic Butter Escargot",note:"Seasonal price"}
  ]},
  {id:"bull-bush",name:"Bull & Bush Pub",area:"Gaborone",cuisines:["Steakhouse","Bar"],rating:3.9,reviews:364,etaMinutes:29,deliveryFee:19,brand:["#ef4444","#111827"],image:foodImages.grill,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"mokolodi",name:"Mokolodi Bush Kitchen",area:"Mokolodi",cuisines:["African","Bush kitchen"],rating:4.2,reviews:18,etaMinutes:48,deliveryFee:35,brand:["#84cc16","#365314"],image:foodImages.african,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"daily-grind",name:"The Daily Grind Cafe + Kitchen",area:"Independence Avenue",cuisines:["Cafe","Healthy"],rating:4.6,reviews:95,etaMinutes:22,deliveryFee:15,brand:["#f59e0b","#78350f"],image:foodImages.cafe,sourceLabel:"Official menu",sourceUrl:"https://www.houseofbriscoe.com/menu",menu:[
    {name:"Smashed Avo Toast",note:"Current public menu"},
    {name:"Eggs Benedict",note:"Current public menu"},
    {name:"Korean Fried Chicken Bowl",note:"Current public menu"},
    {name:"TDG Cheese Burger",note:"Current public menu"},
    {name:"Panko Prawn Tacos",note:"Current public menu"}
  ]},
  {id:"main-deck",name:"Main Deck",area:"Gaborone",cuisines:["Bar","Pub"],rating:4.1,reviews:87,etaMinutes:28,deliveryFee:18,brand:["#06b6d4","#164e63"],image:foodImages.grill,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"bukhara",name:"Bukhara",area:"Airport Junction",cuisines:["Indian","Mediterranean"],rating:5.0,reviews:5,etaMinutes:30,deliveryFee:20,brand:["#f97316","#9a3412"],image:foodImages.indian,sourceLabel:"Public listing",sourceUrl:T},
  {id:"cafe-dijo",name:"Cafe Dijo",area:"Gaborone",cuisines:["Cafe","Breakfast"],rating:4.3,reviews:126,etaMinutes:24,deliveryFee:15,brand:["#14b8a6","#134e4a"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"zorros",name:"ZORRO's Restaurant",area:"Gaborone",cuisines:["Mexican","Indian"],rating:4.6,reviews:20,etaMinutes:28,deliveryFee:18,brand:["#eab308","#7c2d12"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"rhapsodys",name:"Rhapsody's Gaborone",area:"Airport Junction",cuisines:["International","Bar"],rating:3.6,reviews:132,etaMinutes:31,deliveryFee:20,brand:["#8b5cf6","#1e1b4b"],image:foodImages.fine,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"rodizio",name:"Rodizio Brazilian Restaurant",area:"Gaborone",cuisines:["Brazilian","Barbecue"],rating:4.1,reviews:242,etaMinutes:32,deliveryFee:21,brand:["#dc2626","#111827"],image:"https://cdn.tripinafrica.com/places/-T0tlMCarTI.jpeg",sourceLabel:"Public listing",sourceUrl:T},
  {id:"267",name:"Two Six Seven Kitchen + Bar",area:"Riverwalk",cuisines:["American","Contemporary"],rating:4.9,reviews:7,etaMinutes:24,deliveryFee:18,brand:["#2563eb","#1e3a8a"],image:foodImages.fine,sourceLabel:"House of Briscoe",sourceUrl:"https://www.houseofbriscoe.com/menu"},
  {id:"embassy",name:"Embassy",area:"Riverwalk Mall",cuisines:["Indian","Asian"],rating:4.0,reviews:123,etaMinutes:29,deliveryFee:18,brand:["#f59e0b","#991b1b"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"beef-baron",name:"Beef Baron Grill & Rib Room",area:"Gaborone",cuisines:["Steakhouse","Grill"],rating:3.7,reviews:130,etaMinutes:35,deliveryFee:22,brand:["#b91c1c","#111827"],image:foodImages.grill,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"news-cafe",name:"News Cafe Gaborone",area:"Gaborone",cuisines:["Cafe","Bar"],rating:3.6,reviews:110,etaMinutes:25,deliveryFee:17,brand:["#0ea5e9","#0f172a"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"mahogany",name:"Mahogany's Restaurant",area:"Avani Gaborone",cuisines:["International","European"],rating:4.1,reviews:43,etaMinutes:34,deliveryFee:23,brand:["#92400e","#451a03"],image:foodImages.fine,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"eastern-crescent",name:"Eastern Crescent",area:"Sebele Mall",cuisines:["Chinese","Asian"],rating:4.2,reviews:19,etaMinutes:30,deliveryFee:20,brand:["#ef4444","#7f1d1d"],image:foodImages.asian,sourceLabel:"Public listing",sourceUrl:T},
  {id:"yacht-club",name:"Gaborone Yacht Club",area:"Gaborone Dam",cuisines:["Cafe","Casual"],rating:4.0,reviews:9,etaMinutes:42,deliveryFee:30,brand:["#0284c7","#0c4a6e"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"cappuccinos",name:"Cappuccino's Pizzeria Grill Cafe",area:"Airport Junction",cuisines:["Italian","Pizza","Grill"],rating:3.7,reviews:161,etaMinutes:27,deliveryFee:18,brand:["#dc2626","#7c2d12"],image:foodImages.pizza,sourceLabel:"Public menu",sourceUrl:"https://www.tripadvisor.com/Restaurant_Review-g293767-d3410068-Reviews-Cappuccino_s_Pizzeria_Grill_Cafe-Gaborone_South_East_District.html"},
  {id:"chutney",name:"Chutney Restaurant",area:"Gaborone",cuisines:["Indian"],rating:4.0,reviews:210,etaMinutes:29,deliveryFee:18,brand:["#f97316","#7c2d12"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"saffron",name:"Saffron",area:"Gaborone",cuisines:["Indian","Asian"],rating:3.8,reviews:80,etaMinutes:31,deliveryFee:19,brand:["#f59e0b","#78350f"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"delis",name:"Delis",area:"Gaborone",cuisines:["Cafe","Lunch"],rating:4.2,reviews:34,etaMinutes:23,deliveryFee:15,brand:["#22c55e","#14532d"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"mozambik",name:"Mozambik Gaborone",area:"Gaborone",cuisines:["Seafood","Portuguese"],rating:4.3,reviews:4,etaMinutes:33,deliveryFee:22,brand:["#f97316","#0f766e"],image:foodImages.seafood,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"fego",name:"Fego Caffe",area:"CBD",cuisines:["Cafe","European"],rating:4.0,reviews:134,etaMinutes:22,deliveryFee:15,brand:["#a16207","#422006"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"ola-tia",name:"Ola Tia Cafe",area:"Gaborone",cuisines:["Cafe","Breakfast"],rating:4.6,reviews:82,etaMinutes:24,deliveryFee:15,brand:["#fb7185","#881337"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"treehaus",name:"Treehaus – The Meeting Place",area:"Gaborone",cuisines:["African","Cafe"],rating:5.0,reviews:8,etaMinutes:27,deliveryFee:17,brand:["#16a34a","#14532d"],image:foodImages.african,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"kebabish",name:"Kebabish Curry and Grill",area:"Gaborone",cuisines:["Indian","Grill"],rating:4.2,reviews:16,etaMinutes:30,deliveryFee:19,brand:["#f59e0b","#991b1b"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"ashoka",name:"Ashoka Palace",area:"Gaborone",cuisines:["Indian","Asian"],rating:4.1,reviews:34,etaMinutes:30,deliveryFee:19,brand:["#f97316","#7c2d12"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"linga-longa",name:"Linga Longa",area:"Gaborone",cuisines:["Bar","European"],rating:3.3,reviews:47,etaMinutes:32,deliveryFee:20,brand:["#6366f1","#312e81"],image:foodImages.grill,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"patio",name:"The Patio Cafe & Deli",area:"Gaborone",cuisines:["American","African"],rating:4.0,reviews:2,etaMinutes:24,deliveryFee:15,brand:["#fb7185","#7f1d1d"],image:foodImages.cafe,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"sip-grill",name:"Sip & Grill",area:"iTowers North",cuisines:["Lebanese","Mediterranean"],rating:3.5,reviews:2,etaMinutes:28,deliveryFee:18,brand:["#0ea5e9","#334155"],image:foodImages.grill,sourceLabel:"Public listing",sourceUrl:T},
  {id:"china",name:"China Restaurant",area:"CBD iTowers",cuisines:["Chinese","Seafood","Sushi"],rating:3.8,reviews:22,etaMinutes:29,deliveryFee:18,brand:["#dc2626","#7f1d1d"],image:foodImages.asian,sourceLabel:"Public listing",sourceUrl:T},
  {id:"multicuisine",name:"Multicuisine Restaurant",area:"CBD",cuisines:["Indian","Asian"],rating:4.3,reviews:4,etaMinutes:27,deliveryFee:17,brand:["#8b5cf6","#4c1d95"],image:foodImages.indian,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"morula",name:"Morula",area:"Game City",cuisines:["International"],rating:4.3,reviews:7,etaMinutes:26,deliveryFee:17,brand:["#059669","#064e3b"],image:foodImages.fine,sourceLabel:"Public listing",sourceUrl:T},
  {id:"la-sante",name:"La Sante Restaurant",area:"Gaborone",cuisines:["African","Cafe"],rating:4.0,reviews:3,etaMinutes:25,deliveryFee:15,brand:["#22c55e","#166534"],image:foodImages.african,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"edlas",name:"Ed-La's Chisanyama",area:"Masiakgang",cuisines:["African","Braai"],rating:3.5,reviews:2,etaMinutes:32,deliveryFee:20,brand:["#ea580c","#431407"],image:foodImages.grill,sourceLabel:"Public listing",sourceUrl:T},
  {id:"nandos-riverwalk",name:"Nando's Riverwalk",area:"Riverwalk Mall",cuisines:["Chicken","PERi-PERi"],rating:4.2,reviews:25,etaMinutes:22,deliveryFee:15,brand:["#dc2626","#111827"],image:foodImages.chicken,sourceLabel:"Official menu",sourceUrl:"https://www.nandos.co.bw/eat/order/",menu:[{name:"Flame-grilled PERi-PERi chicken",note:"Official menu category"},{name:"Everyone's Favourites",note:"Official menu collection"}]},
  {id:"nandos-broadhurst",name:"Nando's Broadhurst",area:"Broadhurst",cuisines:["Chicken","Fast food"],rating:3.8,reviews:5,etaMinutes:24,deliveryFee:15,brand:["#dc2626","#111827"],image:foodImages.chicken,sourceLabel:"Public listing",sourceUrl:T},
  {id:"debonairs-main",name:"Debonairs Pizza Main Mall",area:"Main Mall",cuisines:["Pizza","Fast food"],etaMinutes:24,deliveryFee:15,brand:["#2563eb","#dc2626"],image:foodImages.pizza,sourceLabel:"Public listing",sourceUrl:T},
  {id:"debonairs-rail",name:"Debonairs Pizza Rail Park Mall",area:"Rail Park Mall",cuisines:["Pizza","Fast food"],rating:3.0,reviews:2,etaMinutes:23,deliveryFee:15,brand:["#2563eb","#dc2626"],image:foodImages.pizza,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"debonairs-acacia",name:"Debonairs Pizza Acacia Mall",area:"Acacia Mall",cuisines:["Pizza","Fast food"],etaMinutes:27,deliveryFee:17,brand:["#2563eb","#dc2626"],image:foodImages.pizza,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"kfc-riverwalk",name:"KFC Village Riverwalk",area:"Riverwalk",cuisines:["Chicken","Fast food"],rating:4.9,reviews:3517,etaMinutes:21,deliveryFee:15,brand:["#ef4444","#991b1b"],image:foodImages.chicken,sourceLabel:"2026 public ratings",sourceUrl:"https://eatoutmap.com/en/botswana/gaborone/best"},
  {id:"kfc-gamecity",name:"KFC Game City",area:"Game City",cuisines:["Chicken","Fast food"],rating:4.8,reviews:1945,etaMinutes:22,deliveryFee:15,brand:["#ef4444","#991b1b"],image:foodImages.chicken,sourceLabel:"2026 public ratings",sourceUrl:"https://eatoutmap.com/en/botswana/gaborone/best"},
  {id:"steers-riverwalk",name:"Steers Riverwalk Mall",area:"Riverwalk Mall",cuisines:["Burgers","Grill"],etaMinutes:25,deliveryFee:15,brand:["#f59e0b","#dc2626"],image:foodImages.grill,sourceLabel:"Public listing",sourceUrl:T},
  {id:"panarottis",name:"Panarottis Turnrite",area:"Turnrite Shopping Mall",cuisines:["Italian","Pizza"],etaMinutes:29,deliveryFee:18,brand:["#16a34a","#dc2626"],image:foodImages.pizza,sourceLabel:"Public listing",sourceUrl:T},
  {id:"pedros",name:"Pedros Fields Mall",area:"The Fields Mall",cuisines:["Chicken","Fast food"],rating:4.4,reviews:313,etaMinutes:24,deliveryFee:15,brand:["#f97316","#111827"],image:foodImages.chicken,sourceLabel:"2026 public ratings",sourceUrl:"https://eatoutmap.com/en/botswana/gaborone/best"},
  {id:"hungry-lion",name:"Hungry Lion Rail Park Mall",area:"Rail Park Mall",cuisines:["Chicken","Fast food"],etaMinutes:23,deliveryFee:15,brand:["#facc15","#dc2626"],image:foodImages.chicken,sourceLabel:"Tripadvisor",sourceUrl:T},
  {id:"casa-del-sol",name:"Casa del Sol",area:"Mowana Park Mall, Phakalane",cuisines:["European","Contemporary"],etaMinutes:35,deliveryFee:22,brand:["#f59e0b","#f97316"],image:foodImages.fine,sourceLabel:"Official site",sourceUrl:"https://casadelsol.co.bw/",menu:[
    {name:"Batata Onion Omelette",note:"Official site"},
    {name:"Beef Bourguignon",note:"Official site"},
    {name:"Coq au Vin",note:"Official site"},
    {name:"Bell Pepper Salad",note:"Official site"}
  ]}
];

export const storefrontCount = gaboroneStorefronts.length;
