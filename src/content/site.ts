import type { SiteContent } from "./types";

/**
 * Cafe Genovese (St. Johns, FL): the only editable content file. Data only.
 *
 * Shapes: src/content/types.ts in skate28/cafe-genovese (Catullo's types + optional
 * FeatureFlags.catering; local copy in handoff/types.reference.ts, plus the dev's pending
 * `extraRatings?: Rating[]` added locally for the typecheck). Field docs: CONTENT_SCHEMA.md.
 * Data only (call/text helpers live in src/lib/contact.ts). Mark anything unconfirmed `// TODO(Leads): verify`.
 * No owner/staff names, personal emails, reviewer names or photo-source URLs in this file.
 *
 * WEBSITE WARNING: a site at cafegenovese[.]com appeared in Oct 2026 (domain registered 2026-10-10,
 * Hostinger). It is NOT linked from Google, Apple Maps, Nextdoor or Tripadvisor, uses stock/AI images,
 * sells coffee beans the cafe isn't known to sell, quotes made-up reviews and has a contact form that
 * throws messages away. Ownership unknown (see research_brief.md). Never link it or copy from it.
 *
 * Menu + prices: CONFIRMED from the cafe's current printed breakfast and lunch menus, photographed in
 * the cafe on 2026-10-20 (single source of truth; supersedes Yelp/aggregator/older printings).
 *
 * Ordering: dine-in + call-ahead takeout. The printed menu says "Call Ahead & Take Out Orders Welcome!"
 * (verified 2026-10-20). No online ordering, DoorDash, Uber Eats or Grubhub store found. No texting.
 * All `features` are "off": the site only shows services the cafe offers today (dine-in, call-ahead).
 *
 * Photos: real customer photos from the cafe's own Google Maps listing (downloaded, not hotlinked).
 * Pitch use only until the owner approves; sources in photo-sources.md. No logo found (no artwork
 * online; the Facebook page is not publicly viewable).
 */

export const site: SiteContent = {
  name: "Cafe Genovese",
  // Built from verified facts (family-run breakfast & lunch cafe since 2006, regulars greeted by name).
  // A 2026 Tripadvisor review says the staff shirts read "Where we don't forget your name!".
  // TODO(Leads): confirm the slogan with the owner before using it in the tagline.
  tagline: "Family-run breakfast and lunch in St. Johns, where regulars get greeted by name.",
  description:
    "Cafe Genovese is a family-run breakfast and lunch cafe at 1515 County Road 210 W, Suite 108, St. Johns, FL 32259. Eggs, omelets, pancakes, corned beef hash, grit bowls, burgers, hoagies and salads, cooked to order on the grill. Open Monday–Friday 7 AM–2 PM and Saturday 7 AM–noon; closed Sunday. Call (904) 829-0707.",
  // Florida DBPR food-service license for this address: licensure date 10/25/2006 (status Current, Active,
  // read 2026-10-20). Corporation incorporated Sept 2006 (Sunbiz via bisprofiles). TODO(Leads): owner confirms.
  opened: "2006",

  address: {
    street: "1515 County Road 210 W",
    // Suite from DBPR license location, Tripadvisor, Visit St. Augustine and the lead sheet. Google omits it.
    suite: "Suite 108",
    neighborhood: "St. Johns County",
    city: "St. Johns",
    region: "FL",
    postalCode: "32259",
    country: "US",
    full: "1515 County Road 210 W, Suite 108, St. Johns, FL 32259",
  },
  // Visit St. Augustine: "just east of the 95 exit", "in a small industrial/office park". A Nextdoor
  // neighbor (Sep 2026) says it's easy to miss and parking is limited. TODO(Leads): owner's own directions.
  locationHint: "Just east of I-95 off County Road 210 W, tucked inside a small office park. Look for Suite 108.",

  // Google pin for the listing (feature 0x88e4329fb0786ad1:0xdc2822085028a320).
  geo: {
    latitude: 30.0697343,
    longitude: -81.4909162,
  },
  // place_id ChIJ0Wp4sJ8y5IgRIKMoUAgiKNw decodes to the feature id above (CID 15863967106512495392).
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Cafe+Genovese+1515+County+Road+210+W+St+Johns+FL+32259&query_place_id=ChIJ0Wp4sJ8y5IgRIKMoUAgiKNw",

  // Google Maps, Apple Maps, Nextdoor, DBPR-listed business, Tripadvisor, Visit St. Augustine: all agree.
  phone: {
    display: "(904) 829-0707",
    tel: "tel:+19048290707",
    e164: "+19048290707",
  },

  // None today.
  afterHoursPhone: null,
  textNumber: null,

  closedNotice:
    "We're closed right now. We're open Monday–Friday 7 AM–2 PM and Saturday 7 AM–noon. Closed Sundays.",

  // CONFLICT: weekday opening time.
  //  7 AM: Google Maps listing (read live 2026-10-20), Nextdoor, Restaurantji, Weeblyte, Checkle (Nov 2025),
  //        exa place data; one Google review: "they don't actually open until 7am".
  //  6 AM: storefront door decal in a May 2022 Google photo, Visit St. Augustine, Tripadvisor, MenuPix,
  //        cafegenovese[.]com (unverified site).
  // Using 7 AM (most recent + the cafe-facing Google listing) so the site never says "open" when the
  // door is locked. Saturday 7 AM–noon and Sunday closed agree everywhere.
  // TODO(Leads): owner confirms weekday open time and holiday closures.
  hours: {
    timezone: "America/New_York",
    summary: "Mon–Fri 7 AM–2 PM · Sat 7 AM–Noon · Closed Sunday",
    openTime: null,
    closeTime: null,
    byDay: {
      mon: { openTime: "07:00", closeTime: "14:00" },
      tue: { openTime: "07:00", closeTime: "14:00" },
      wed: { openTime: "07:00", closeTime: "14:00" },
      thu: { openTime: "07:00", closeTime: "14:00" },
      fri: { openTime: "07:00", closeTime: "14:00" },
      sat: { openTime: "07:00", closeTime: "12:00" },
      sun: { openTime: null, closeTime: null, closed: true },
    },
  },

  // Printed menu 2026-10-20: breakfast plates $8.99–15.99, lunch $8.59–13.99. Restaurantji/Checkle "$",
  // MenuPix "$$". TODO(Leads): confirm "$" vs "$$".
  priceRange: "$",
  // Apple Maps: accepts contactless payments. Not shown until the owner confirms cards/cash.
  paymentNote: "",

  // Call-ahead takeout VERIFIED: the current printed menu says "Call Ahead & Take Out Orders Welcome!"
  // (photographed 2026-10-20). Phone is the only ordering channel; no online/delivery store exists.
  orderingLinks: [{ label: "Call ahead for takeout", href: "tel:+19048290707", kind: "phone" }],

  // EMPTY on purpose. Google, Apple Maps and Nextdoor list facebook.com/CafeGenovese, but on 2026-10-20 it
  // shows "This content isn't available right now" signed out (the same check loads other restaurant
  // pages fine). No Instagram found. TODO(Leads): ask the owner whether the page still exists, then add it.
  socials: [],

  // Re-checked 2026-10-20 ~12:15 PM ET. Google: Google Maps listing, read live.
  rating: {
    value: 4.7,
    count: 540,
    source: "Google",
  },

  // Yelp 4.4 from 171 (was 170 this morning; Yelp data as shown on Apple Maps, read live 2026-10-20).
  // Tripadvisor 4.5 from 58 (unclaimed listing; search-index copy of the page carrying a 2026-09-28
  // review; tripadvisor.com itself blocks automated fetches). TODO(Leads): re-check before launch.
  extraRatings: [
    { value: 4.4, count: 171, source: "Yelp" },
    { value: 4.5, count: 58, source: "Tripadvisor" },
  ],

  // Verbatim excerpts (whole sentences, unedited, original spelling/punctuation) from public reviews.
  // Attributed by platform only: no reviewer names/initials, no review-specific URLs. sourceUrl is the
  // platform's public business listing. Dated source notes: research_brief.md "Testimonials".
  // TODO(Leads): owner OKs quoting these before launch.
  testimonials: [
    {
      quote:
        "That’s gotta be one of the best corn beef hash breakfasts I’ve ever had. The food was seasoned super well, perfectly crispy and delicious.",
      sourceLabel: "Google review",
      sourceUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Genovese+1515+County+Road+210+W+St+Johns+FL+32259&query_place_id=ChIJ0Wp4sJ8y5IgRIKMoUAgiKNw",
    },
    {
      quote:
        "If you want delicious food that was cooked with love then this is your place! Family run restaurant where everyone knows each other and is enjoying company!",
      sourceLabel: "Google review",
      sourceUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Genovese+1515+County+Road+210+W+St+Johns+FL+32259&query_place_id=ChIJ0Wp4sJ8y5IgRIKMoUAgiKNw",
    },
    {
      quote: "My wife wanted the Reuben again; it absolutely did not disappoint.",
      sourceLabel: "Google review",
      sourceUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Genovese+1515+County+Road+210+W+St+Johns+FL+32259&query_place_id=ChIJ0Wp4sJ8y5IgRIKMoUAgiKNw",
    },
    {
      quote:
        "The food is absolutely delicious—classic comfort food done right—but what really sets Cafe Genovese apart is the atmosphere. It’s genuine, friendly, and full of heart.",
      sourceLabel: "Google review",
      sourceUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Genovese+1515+County+Road+210+W+St+Johns+FL+32259&query_place_id=ChIJ0Wp4sJ8y5IgRIKMoUAgiKNw",
    },
    {
      quote: "The food was great. The service stellar and you can't beat their menu choices.",
      sourceLabel: "Yelp review",
      sourceUrl: "https://www.yelp.com/biz/cafe-genovese-saint-johns",
    },
    {
      quote: "There is always a conversation going on and when you walk in you are welcomed by name.",
      sourceLabel: "Tripadvisor review",
      sourceUrl: "https://www.tripadvisor.com/Restaurant_Review-g4153940-d904253-Reviews-Cafe_Genovese-St_Johns_Florida.html",
    },
  ],

  // Verified answers only.
  // TODO(Leads): owner-only FAQs: gluten-free options,
  // Veterans Day breakfast (a Google Q&A asks about it), outdoor seating use.
  faq: [
    {
      question: "What are your hours?",
      answer: "Monday–Friday 7 AM–2 PM and Saturday 7 AM–noon. We're closed on Sundays.",
    },
    {
      // Door decal (2022 photo): "Come in and take a seat anywhere".
      question: "Do I need a reservation?",
      answer:
        "No. Come in and take a seat anywhere: at the counter facing the grill or at one of our tables.",
    },
    {
      // Printed menu: "Call Ahead & Take Out Orders Welcome!"
      question: "Can I call ahead for takeout?",
      answer: "Yes. Call-ahead and take-out orders are welcome. Call (904) 829-0707 and we'll have it ready.",
    },
    {
      // Visit St. Augustine: "serving breakfast all day". TODO(Leads): confirm.
      question: "Is breakfast served all day?",
      answer: "Yes. Breakfast is served until we close, and lunch is served alongside it.",
    },
    {
      question: "Do you have a kids' menu?",
      answer:
        "Yes. Kids Breakfast is 2 pancakes or eggs with bacon or sausage and a drink. For lunch, kids pick chicken tenders, a hamburger, grilled cheese, a hot dog or peanut butter and jelly, with fries or fruit and a drink. Each is $8.99.",
    },
    {
      question: "Where exactly are you?",
      answer:
        "1515 County Road 210 W, Suite 108, in a small office park just east of I-95. It's easy to drive past, so use the map link for directions.",
    },
  ],

  menuNote:
    "Cooked to order on our grill. We serve Boar's Head luncheon meat. Call ahead and take-out orders welcome: (904) 829-0707.",

  // SOURCE OF TRUTH: the cafe's current printed breakfast and lunch menus, photographed in the cafe by
  // Nick on 2026-10-20 (owner-menu/breakfast.jpg, owner-menu/lunch.jpg). Categories, names, descriptions
  // and prices are as printed (light case/punctuation edits only). Variant and add-on prices go in the
  // description because MenuItem has no variant field. Printed item numbers use `number`.
  // Beverages are printed on both menus, with identical prices, and appear once here.
  // `signature` = most-mentioned dishes in reviews (corned beef hash, grit bowl, pancakes, Reuben).
  menu: [
    {
      id: "specials",
      name: "Specials",
      items: [
        { id: "special-1", number: 1, name: "2 Eggs, 2 Pancakes & Bacon or Sausage", description: "2 eggs, 2 pancakes, 2 strips of bacon or 2 sausage patties.", price: 11.99 },
        { id: "special-2", number: 2, name: "2 Eggs", description: "With home fries, grits or hash browns, plus toast, English muffin, bagel or biscuit. With bacon or sausage $11.79 · With ham $12.29.", price: 9.79 },
        { id: "special-3", number: 3, signature: true, name: "Grit Bowl", description: "2 eggs, grits, cheese, bacon, sausage or ham, onions and bell peppers.", price: 12.29 },
        { id: "special-4", number: 4, signature: true, name: "Corn Beef Hash", description: "Served with 2 eggs, home fries or grits, plus toast, English muffin, bagel or biscuit.", price: 12.99 },
        { id: "special-5", number: 5, name: "2 Eggs with 5 oz Sirloin Steak", description: "With toast, English muffin, bagel or biscuit. With grits, home fries or hash browns $14.99.", price: 13.99 },
        { id: "special-6", number: 6, signature: true, name: "Three Pancakes", description: "With bacon or sausage $11.99. Add chocolate chips, pecans, fresh strawberries or blueberries +$1.50.", price: 9.99 },
        { id: "special-7", number: 7, name: "French Toast", description: "Topped with powdered sugar and cinnamon. With bacon or sausage $12.59.", price: 10.59 },
        { id: "special-8", number: 8, name: "Belgian Waffle", description: "With bacon or sausage $10.99. Add chocolate chips, pecans, fresh strawberries or blueberries +$1.50.", price: 8.99 },
      ],
    },
    {
      id: "omelets",
      name: "Omelets",
      description:
        "Includes grits, home fries or hash browns, plus toast, English muffin, bagel or biscuit. Substitute fruit for $2.00.",
      items: [
        { id: "omelet-1", number: 1, name: "Three Eggs and Cheese", price: 11.59 },
        { id: "omelet-2", number: 2, name: "Three Eggs and Cheese with Meat", description: "With bacon, sausage or ham.", price: 12.79 },
        { id: "omelet-3", number: 3, name: "Three Eggs and Vegetables", description: "With mushrooms, tomatoes, onions and bell peppers.", price: 12.79 },
        { id: "omelet-4", number: 4, name: "Three Eggs, Vegetables and Meat", description: "With bacon, sausage, ham, tomatoes, onions and bell peppers.", price: 13.79 },
      ],
    },
    {
      id: "complete-breakfast",
      name: "Complete Breakfast",
      items: [
        { id: "complete-breakfast", signature: true, name: "Complete Breakfast", description: "2 eggs, 2 pancakes, choice of 2 strips of bacon or 2 grilled sausage patties, choice of grits, home fries or hash browns, and coffee or tea. Juice or milk add $1.00.", price: 15.99 },
      ],
    },
    {
      id: "breakfast-sandwiches",
      name: "Breakfast Sandwiches",
      description: "2-egg sandwich on toast, English muffin, bagel or biscuit.",
      items: [
        { id: "bsand-1", number: 1, name: "Egg", price: 5.79 },
        { id: "bsand-2", number: 2, name: "Egg and Cheese", price: 6.79 },
        { id: "bsand-3", number: 3, name: "Egg and Cheese with Meat", description: "With bacon, sausage or ham.", price: 8.99 },
      ],
    },
    {
      id: "kids-breakfast",
      name: "Kids Breakfast",
      items: [
        { id: "kids-breakfast", name: "Kids Breakfast", description: "2 pancakes or eggs, bacon or sausage, and a drink.", price: 8.99 },
      ],
    },
    {
      id: "breakfast-sides",
      name: "Breakfast Sides",
      items: [
        { id: "bside-eggs", name: "2 Eggs Any Style", price: 3.49 },
        { id: "bside-potatoes", name: "Grits, Home Fries or Hash Browns", description: "With cheese $4.79.", price: 3.99 },
        { id: "bside-bacon-sausage", name: "Bacon or Sausage", price: 4.29 },
        { id: "bside-ham", name: "Ham", price: 4.59 },
        { id: "bside-sirloin", name: "5 oz Sirloin Steak", price: 9.59 },
        { id: "bside-hash", name: "Corn Beef Hash", price: 4.99 },
        { id: "bside-pancake", name: "Pancake", price: 3.99 },
        { id: "bside-toast", name: "Toast, English Muffin or Biscuit", price: 2.29 },
        { id: "bside-fruit", name: "Fruit", price: 4.49 },
        { id: "bside-bagel", name: "Bagel", description: "With cream cheese $3.74.", price: 2.99 },
        { id: "bside-cream-cheese", name: "Cream Cheese", price: 0.75 },
        { id: "bside-addons", name: "Cheese, Tomatoes, Onions, Bell Peppers or Mushrooms", description: "Each.", price: 0.99 },
      ],
    },
    {
      id: "appetizers",
      name: "Appetizers",
      items: [
        { id: "app-chicken-tenders", name: "Chicken Tenders", price: 11.99 },
        { id: "app-buffalo-tenders", name: "Buffalo Tenders", price: 12.99 },
        { id: "app-cheese-sticks", name: "Cheese Sticks", price: 7.99 },
      ],
    },
    {
      id: "salads",
      name: "Fresh Salads",
      description:
        "Dressings: ranch, blue cheese, French, balsamic vinaigrette, honey mustard, Italian, raspberry vinaigrette.",
      items: [
        { id: "chef-salad", name: "Chef Salad", description: "With ham, turkey, cheese, bacon, tomatoes and egg.", price: 13.59 },
        { id: "chicken-caesar", name: "Chicken Caesar Salad", description: "With romaine lettuce, chicken breast and Parmesan cheese.", price: 12.99 },
        { id: "carolina-salad", name: "Carolina Salad", description: "With romaine lettuce, chicken tenders, grilled, Cajun or BBQ chicken, cheese, bacon, pecans and tomatoes.", price: 13.29 },
        { id: "buffalo-chicken-salad", name: "Buffalo Chicken Salad", description: "With blue cheese crumbles and tomatoes.", price: 13.29 },
        { id: "mandarin-salad", name: "Mandarin Salad", description: "With chicken tenders or grilled chicken, feta cheese, pecans, Craisins and mandarin oranges.", price: 13.29 },
      ],
    },
    {
      id: "burgers-sandwiches",
      name: "Burgers & Sandwiches",
      description:
        "All burgers and sandwiches are served with your choice of fries, onion rings, steamed broccoli or chips. \"All the Way\" means lettuce, tomato, onion, pickles, mustard and mayonnaise. We serve Boar's Head luncheon meat.",
      items: [
        { id: "hamburger", name: "Hamburger", price: 12.29 },
        { id: "cheeseburger", name: "Cheeseburger", price: 12.79 },
        { id: "alpine-burger", name: "Alpine Burger", price: 13.29 },
        { id: "bacon-cheeseburger", name: "Bacon Cheeseburger", price: 13.29 },
        { id: "smoke-house-burger", name: "Smoke House Burger", price: 13.59 },
        { id: "pattie-melt", name: "Pattie Melt", description: "Beef pattie with Swiss cheese and grilled onion on grilled rye bread.", price: 12.99 },
        { id: "black-and-blue-burger", name: "Black and Blue Burger", price: 13.29 },
        { id: "grilled-cheese", name: "Grilled Cheese", price: 8.59 },
        { id: "grilled-cheese-ham", name: "Grilled Cheese with Ham", price: 10.99 },
        { id: "blt", name: "\"BLT\"", description: "Bacon, lettuce and tomato.", price: 10.99 },
        { id: "turkey-cheese", name: "Turkey Breast with Cheese", price: 12.29 },
        { id: "turkey-blt", name: "Turkey \"BLT\"", price: 12.99 },
        { id: "chicken-tuna-salad", name: "Chicken or Tuna Salad", price: 12.29 },
        { id: "mahi-sandwich", name: "Mahi Sandwich", description: "Lemon pepper or blackened.", price: 13.99 },
      ],
    },
    {
      id: "specialties",
      name: "Specialties",
      description: "Each specialty includes one side.",
      items: [
        { id: "tilapia", name: "Tilapia", description: "Lemon pepper or blackened.", price: 12.99 },
        { id: "italian-sausage", name: "Italian Sausage Hoagie", description: "Italian sausage, bell peppers, onions and provolone cheese on a hoagie.", price: 12.99 },
        { id: "meatball-hoagie", name: "Meatball Hoagie", description: "With provolone cheese.", price: 12.99 },
        { id: "chicken-parmesan", name: "Chicken Parmesan", description: "With provolone cheese.", price: 12.99 },
        { id: "crispy-chicken-club", name: "Crispy Chicken Club", description: "With Swiss cheese and bacon.", price: 12.99 },
        { id: "buffalo-chicken", name: "Buffalo Chicken", description: "With Jack cheese.", price: 12.99 },
        { id: "grilled-cajun-chicken", name: "Grilled or Cajun Chicken", description: "With Jack cheese.", price: 12.99 },
        { id: "reuben", signature: true, name: "Reuben", price: 13.99 },
        { id: "cheese-steak", name: "Cheese Steak", description: "With bell peppers, onions and provolone cheese.", price: 12.99 },
        { id: "grilled-roast-beef", name: "Grilled Roast Beef", description: "With cheddar cheese.", price: 13.99 },
        { id: "hickory-chicken", name: "Hickory Chicken", description: "With BBQ sauce, cheddar cheese and bacon.", price: 12.99 },
        { id: "chicken-philly", name: "Chicken Philly", description: "With peppers, onions and provolone.", price: 12.99 },
        { id: "french-dip", name: "French Dip", price: 13.99 },
      ],
    },
    {
      id: "kids-lunch",
      name: "Kids Lunch",
      description: "Includes fries or fruit and a drink. Your choice, only $8.99 each.",
      items: [
        { id: "kids-chicken-tenders", name: "Chicken Tenders", price: 8.99 },
        { id: "kids-hamburger", name: "Hamburger", price: 8.99 },
        { id: "kids-grilled-cheese", name: "Grilled Cheese", price: 8.99 },
        { id: "kids-hot-dog", name: "Hot Dog", price: 8.99 },
        { id: "kids-pbj", name: "Peanut Butter and Jelly", price: 8.99 },
      ],
    },
    {
      id: "lunch-sides",
      name: "Sides",
      items: [
        { id: "side-fruit", name: "Fruit", price: 4.49 },
        { id: "side-house-salad", name: "House Salad", price: 4.29 },
        { id: "side-macaroni-salad", name: "Macaroni Salad", price: 3.99 },
        { id: "side-onion-rings", name: "Onion Rings", price: 4.59 },
        { id: "side-fries", name: "Fries", price: 4.29 },
        { id: "side-chips", name: "Chips", price: 1.99 },
        { id: "side-broccoli", name: "Broccoli", price: 4.29 },
        { id: "side-cottage-cheese", name: "Cottage Cheese", price: 3.99 },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      description: "Free refills on coffee, tea and soda.",
      items: [
        { id: "coffee-tea", name: "Coffee, Hot or Iced Tea", price: 3.29 },
        { id: "soda", name: "Soda", description: "Coke products.", price: 3.29 },
        { id: "bottled-water", name: "Bottled Water", price: 1.75 },
        { id: "milk-juice", name: "Milk or Juice", description: "Small $3.49 · Large $4.49.", price: 3.49, priceFrom: true },
      ],
    },
  ],

  // Real customer photos from the cafe's own Google Maps listing (see images/MANIFEST.md); credit keys
  // only, no URLs. Four were cropped to remove people. TODO(Leads): owner's OK, or a short shoot.
  photos: [
    { src: "/images/hero-corned-beef-hash-breakfast.jpg", alt: "Corned beef hash with home fries and eggs on an orange plate, with a side of bacon", category: "food", credit: "google-maps-ugc", width: 1200, height: 1600, hero: true },
    { src: "/images/corned-beef-hash-eggs-grits.jpg", alt: "Crispy corned beef hash with two sunny-side-up eggs and a cup of cheese grits", category: "food", credit: "google-maps-ugc", width: 901, height: 1600 },
    { src: "/images/grit-bowl.jpg", alt: "Grit bowl: a fried egg over cheesy grits with meat, onions and peppers", category: "food", credit: "google-maps-ugc", width: 1600, height: 1200 },
    { src: "/images/pancake-bacon-scrambled-eggs.jpg", alt: "A big golden pancake with scrambled eggs and crispy bacon", category: "food", credit: "google-maps-ugc", width: 1600, height: 901 },
    { src: "/images/french-toast-bacon-eggs.jpg", alt: "French toast with bacon and scrambled eggs", category: "food", credit: "google-maps-ugc", width: 1600, height: 1200 },
    { src: "/images/eggs-bacon-hash-browns-coffee.jpg", alt: "Two eggs, bacon, hash browns and rye toast next to a mug of coffee", category: "food", credit: "google-maps-ugc", width: 1200, height: 890 },
    { src: "/images/bacon-cheeseburger-onion-rings.jpg", alt: "Bacon cheeseburger served open with lettuce and a side of onion rings", category: "food", credit: "google-maps-ugc", width: 1600, height: 1198 },
    { src: "/images/burger-crinkle-fries.jpg", alt: "Burger on a seeded bun with crinkle-cut fries", category: "food", credit: "google-maps-ugc", width: 1600, height: 1200 },
    { src: "/images/hot-hoagie-melted-cheese.jpg", alt: "Hot hoagie with grilled meat, peppers and melted cheese", category: "food", credit: "google-maps-ugc", width: 1600, height: 1200 },
    { src: "/images/garden-salad-ranch.jpg", alt: "Garden salad with tomatoes, shredded cheddar and a cup of ranch", category: "food", credit: "google-maps-ugc", width: 1600, height: 1416 },
    { src: "/images/storefront-sign.jpg", alt: "The Café Genovese sign above the storefront", category: "storefront", credit: "google-maps-ugc", width: 1600, height: 790 },
    { src: "/images/counter-stools-front-windows.jpg", alt: "Counter stools and tables by the front windows, with an Italian phrase painted above", category: "interior", credit: "google-maps-ugc", width: 660, height: 1020 },
    { src: "/images/grill-counter.jpg", alt: "The open grill behind the granite counter", category: "interior", credit: "google-maps-ugc", width: 700, height: 1380 },
    { src: "/images/yankees-memorabilia-wall.jpg", alt: "Dining room wall of framed New York Yankees photos and a painted street scene", category: "interior", credit: "google-maps-ugc", width: 1600, height: 960 },
    { src: "/images/dining-room-wall-art.jpg", alt: "Yellow dining room wall with framed photos and a colorful street-scene painting", category: "interior", credit: "google-maps-ugc", width: 1600, height: 1200 },
  ],
  heroImage: "/images/hero-corned-beef-hash-breakfast.jpg",

  // Navy from the storefront letters, warm orange from the house plates, mustard/cream from the walls.
  palette: {
    ink: "#1E2A38",
    brand: "#24476B",
    brandDeep: "#183552",
    accent: "#E0843E",
    salmon: "#D9A441",
    nori: "#1B2F45",
    rice: "#FBF6EA",
    paper: "#FFFFFF",
  },

  about: {
    // Verified: family-owned and operated (Visit St. Augustine, many reviews); licensed at this address
    // since 2006 (DBPR); counter facing the grill + tables for two and four (Visit St. Augustine); walls of
    // Yankees/Giants photos (Google photos; Restaurantji summary also mentions first-responder photos); regulars greeted by
    // name (dozens of reviews). Nextdoor's page says it won Neighborhood Faves 2017–2020 and 2022–2024.
    // TODO(Leads): owner's own story (keep owner names off the site) and confirm the Nextdoor wins.
    heading: "A neighborhood counter since 2006",
    paragraphs: [
      "Cafe Genovese is a family-run breakfast and lunch spot on County Road 210, serving St. Johns since 2006. Pull up a stool at the counter facing the grill or grab a table, and we'll get your coffee going.",
      "Cooked to order: Eggs any style, fluffy pancakes, crispy corned beef hash, grit bowls and omelets in the morning; burgers, Reubens, cheese steaks, hoagies and fresh salads at lunch. Breakfast is served all day.",
      "Everybody knows your name: Our regulars come in several times a week, and first-timers usually leave as regulars. The walls are covered in New York sports photos, and there's always a conversation going.",
      "Neighborhood favorite: St. Johns neighbors have voted us a Nextdoor Neighborhood Fave in multiple years.",
    ],
  },

  // Required by the type but unused: features.textPreorders is "off", so nothing renders. Kept empty
  // on purpose so no texting copy can leak onto the page.
  preorder: {
    heading: "",
    intro: "",
    textButtonLabel: "",
    textMessage: "",
    maxDaysAhead: 0,
  },

  // customOrders intentionally absent (hidden).

  whatToExpect: {
    heading: "Come in and take a seat anywhere",
    intro: "No reservations, no fuss. Seat yourself and we'll be right with you.",
    // No reliable wait-time data. A few reviews mention it gets busy on weekends and late morning.
    typicalWait: "",
    items: [
      // Door decal (2022 Google photo).
      { title: "Seat yourself", body: "Grab any open table, or a stool at the counter facing the grill." },
      // Visit St. Augustine.
      { title: "Breakfast all day", body: "Pancakes at noon? Go for it. Lunch starts alongside breakfast." },
      // Printed menu: "Call Ahead & Take Out Orders Welcome!"
      { title: "Call ahead", body: "Call-ahead and take-out orders are welcome. Call (904) 829-0707." },
      // Visit St. Augustine ("small industrial/office park"); Nextdoor review (easy to miss).
      { title: "Finding us", body: "We're inside a small office park on County Road 210 W, just east of I-95. Suite 108." },
    ],
  },

  // Every feature off (set explicitly: an absent flag defaults to "preview"). Nick: no "Coming soon"
  // section; the site only shows what the cafe offers today. That slot becomes the reviews section.
  features: {
    textPreorders: "off",
    waitlist: "off",
    aiPhone: "off",
    catering: "off",
  },

  heroKicker: "Breakfast & lunch · St. Johns · Since 2006",

  seo: {
    title: "Cafe Genovese | Family-Run Breakfast & Lunch in St. Johns, FL",
    description:
      "Eggs, pancakes, corned beef hash, grit bowls, burgers and hoagies cooked to order at 1515 County Road 210 W, St. Johns, FL. Mon–Fri 7 AM–2 PM, Sat 7 AM–noon. Call (904) 829-0707.",
  },

  footerCredit: "Built by nicklopacki.com",
};
