export type PilotMenuItem = {
  id: string;
  name: string;
  description?: string;
  category: string;
  price?: number;
  dietary?: string[];
};

export type PilotRestaurant = {
  id: string;
  name: string;
  area: string;
  cuisines: string[];
  rating?: number;
  etaMinutes: number;
  deliveryFee: number;
  brand: [string,string];
  image: string;
  sourceUrl: string;
  sourceLabel: string;
  openLabel: string;
  menu: PilotMenuItem[];
};

export const pilotRestaurants: PilotRestaurant[] = [
  {
    id:"zen",
    name:"Zen Cafe Lounge",
    area:"Gaborone",
    cuisines:["Fine dining","Sushi","Grill","Mexican"],
    rating:4.8,
    etaMinutes:27,
    deliveryFee:20,
    brand:["#ec4899","#7c3aed"],
    image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85",
    sourceUrl:"https://zencafe.co.bw/order",
    sourceLabel:"Official ordering menu",
    openLabel:"Cafe · lounge · fine dining",
    menu:[
      {id:"zen-pizza-fries",name:"Pizza Fries",category:"Starters",price:75,description:"Crispy strips of deep-fried pizza dough with herbs and parmesan."},
      {id:"zen-tempura-chicken",name:"Tempura Chicken",category:"Starters",price:85,description:"Crispy chicken strips in a light tempura batter."},
      {id:"zen-seswaa-taco",name:"Seswaa Taco",category:"Tacos",price:210,description:"Botswana-style slow-cooked shredded beef in a tortilla."},
      {id:"zen-classic-burger",name:"Classic Burger",category:"Burgers",price:120,description:"Brioche bun with beef or chicken patty and house toppings."},
      {id:"zen-mega-burger",name:"Zen Mega Burger",category:"Burgers",price:280,description:"Giant brioche burger with beef or chicken and cheese."},
      {id:"zen-rump",name:"Rump Steak",category:"Grill",price:190,description:"Rump steak with herb butter, side and steak sauce."},
      {id:"zen-ribs",name:"Pork Ribs 500g",category:"Grill",price:250,description:"Sticky BBQ pork ribs with a side."},
      {id:"zen-satori",name:"Satori Zen Platter 48pcs",category:"Sushi",price:540,description:"A large sushi tasting platter built for sharing."}
    ]
  },
  {
    id:"daily-grind",
    name:"The Daily Grind",
    area:"Independence Avenue",
    cuisines:["Cafe","Breakfast","Lunch"],
    rating:4.6,
    etaMinutes:22,
    deliveryFee:15,
    brand:["#f59e0b","#78350f"],
    image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085e?auto=format&fit=crop&w=1200&q=85",
    sourceUrl:"https://www.houseofbriscoe.com/daily-grind",
    sourceLabel:"Official House of Briscoe menu",
    openLabel:"Breakfast to lunch",
    menu:[
      {id:"tdg-avo",name:"Smashed Avo Toast",category:"Breakfast",description:"Smashed avocado, lemon and chilli on artisan sourdough.",dietary:["V"]},
      {id:"tdg-benedict",name:"Eggs Benedict",category:"Breakfast",description:"Choice of bacon, smoked salmon trout, or mushroom and artichoke."},
      {id:"tdg-bravas",name:"Golden Botswana Bravas",category:"Breakfast",description:"Crispy potatoes, smoky tomato and garlic aioli.",dietary:["V"]},
      {id:"tdg-korean",name:"Korean Fried Chicken Bowl",category:"Lunch",description:"Crispy chicken, gochujang glaze, kimchi and jasmine rice."},
      {id:"tdg-curry",name:"Cape Malay Chicken Curry",category:"Lunch",description:"Aromatic spices, basmati rice and sambals."},
      {id:"tdg-burger",name:"TDG Cheese Burger",category:"Buns",description:"House patty, cheddar, pickles and special sauce on brioche."},
      {id:"tdg-prawn",name:"Panko Prawn Taco",category:"Tacos",description:"Crisp prawns, cabbage, lime and sriracha aioli."}
    ]
  },
  {
    id:"267",
    name:"Two Six Seven",
    area:"Riverwalk Mall",
    cuisines:["Steakhouse","Pizza","Bar"],
    rating:4.9,
    etaMinutes:24,
    deliveryFee:18,
    brand:["#2563eb","#1e3a8a"],
    image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    sourceUrl:"https://www.houseofbriscoe.com/two-six-seven",
    sourceLabel:"Official House of Briscoe concept",
    openLabel:"Lunch through late dinner",
    menu:[
      {id:"267-sharing",name:"Sharing Plates",category:"For the table",description:"A rotating collection of plates built for sharing."},
      {id:"267-pizza",name:"Wood-fired Pizza",category:"Pizza",description:"Wood-fired pizza selection from the current kitchen program."},
      {id:"267-steak",name:"Steakhouse Classics",category:"Grill",description:"Steakhouse-leaning mains designed for a long-table dinner."},
      {id:"267-cocktails",name:"House Signature Cocktails",category:"Drinks",description:"Signature cocktail list for the evening program."}
    ]
  },
  {
    id:"casa-del-sol",
    name:"Casa del Sol",
    area:"Mowana Park Mall, Phakalane",
    cuisines:["European","Contemporary","Sharing"],
    etaMinutes:35,
    deliveryFee:22,
    brand:["#f59e0b","#f97316"],
    image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
    sourceUrl:"https://casadelsol.co.bw/",
    sourceLabel:"Official restaurant site",
    openLabel:"Mon–Sat 11:00–22:00 · Sun 11:00–15:00",
    menu:[
      {id:"casa-batata",name:"Batata Onion Omelette",category:"Kitchen",description:"A featured plate from the current official site."},
      {id:"casa-beef",name:"Beef Bourguignon",category:"Mains",description:"A featured wood-fired/main plate from the current official site."},
      {id:"casa-coq",name:"Coq au Vin",category:"Mains",description:"A current featured dish from the restaurant."},
      {id:"casa-pepper",name:"Bell Pepper Salad",category:"Salads",description:"A current featured salad from the restaurant."}
    ]
  },
  {
    id:"nandos-riverwalk",
    name:"Nando's Riverwalk",
    area:"Riverwalk Mall",
    cuisines:["Chicken","PERi-PERi","Fast casual"],
    rating:4.2,
    etaMinutes:21,
    deliveryFee:15,
    brand:["#dc2626","#111827"],
    image:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
    sourceUrl:"https://www.nandos.co.bw/eat/order/",
    sourceLabel:"Official Botswana ordering site",
    openLabel:"Flame-grilled PERi-PERi",
    menu:[
      {id:"nandos-chicken",name:"PERi-PERi Chicken",category:"Chicken",description:"Flame-grilled chicken with your preferred PERi-PERi heat."},
      {id:"nandos-favourites",name:"Everyone's Favourites",category:"Combos",description:"Popular meal combinations from the Botswana menu."},
      {id:"nandos-sides",name:"Sides",category:"Sides",description:"Classic sides to pair with flame-grilled chicken."}
    ]
  }
];
