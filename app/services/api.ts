// import pizza_viande from '../assets/imgs/pizza/pizza_viande.jpg';
// import pizza_viande from '../assets/imgs/pizza/pizza_viande.jpg';
// import pizza_poulet from '../assets/imgs/pizza/pizza_poulet.jpg';
// import pizza_merguez from '../assets/imgs/pizza/pizza_merguez.jpg';
// import pizza_thon from '../assets/imgs/pizza/pizza_thon.jpg';
// import pizza_champignon from '../assets/imgs/pizza/pizza_champignon.jpg';
// import pizza_4_fromages from '../assets/imgs/pizza/pizza_4_fromages.jpg';
// import pizza_fruits_de_mere from '../assets/imgs/pizza/pizza_fruits_de_mere.jpg';
// import pizza_sicilienne from '../assets/imgs/pizza/pizza_sicilienne.jpg';
const pizzaViande =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizzaPoulet =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizzaMerguez =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizzaThon =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizzaChampignon =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizza4Fromages =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizzaFruitsDeMere =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const pizzaSicilienne =
  'https://4.bp.blogspot.com/_O-z-5cRO5Hs/TN63GKMmrCI/AAAAAAAAAhk/2FcQTU3wEy0/w1200-h630-p-k-no-nu/pizza-dough-15.jpg';
const data = {
  families: [
    {
      id: 'Pizza',
      articles: [
        { id: 'pizza viande', price: 350, img: pizzaViande },
        { id: 'pizza poulet', price: 350, img: pizzaPoulet },
        { id: 'pizza mergeuz', price: 300, img: pizzaMerguez },
        { id: 'pizza thon', price: 300, img: pizzaThon },
        { id: 'pizza champignon', price: 300, img: pizzaChampignon },
        { id: 'pizza 4 fromages', price: 300, img: pizza4Fromages },
        { id: 'pizza fruits de mere', price: 300, img: pizzaFruitsDeMere },
        { id: 'pizza sicilienne', price: 300, img: pizzaSicilienne },
      ],
    },
    {
      id: 'Sandwich',
      articles: [
        { id: 'sandwich viande', price: 200, img: pizzaViande },
        { id: 'sandwich escalope', price: 200, img: pizzaViande },
        { id: 'sandwich chawarema', price: 200, img: pizzaViande },
        { id: 'sandwich steack', price: 200, img: pizzaViande },
        { id: 'sandwich foie', price: 200, img: pizzaViande },
        { id: 'sandwich Mergeuz', price: 200, img: pizzaViande },
      ],
    },
    {
      id: 'Mega',
      articles: [
        { id: 'Mega viande', price: 700, img: pizzaViande },
        { id: 'Mega poulet', price: 700, img: pizzaViande },
        { id: 'Mega merguez', price: 700, img: pizzaViande },
        { id: 'Mega chawarema', price: 700, img: pizzaViande },
        { id: 'Mega thon', price: 700, img: pizzaViande },
        { id: 'Mega champignon', price: 700, img: pizzaViande },
        { id: 'Mega viande poulet', price: 700, img: pizzaViande },
        { id: 'Mega 4 fromage ', price: 700, img: pizzaViande },
        { id: 'Mega fruits de mere', price: 700, img: pizzaViande },
      ],
    },
    {
      id: 'tacos',
      articles: [
        { id: 'tacos viande', price: 450, img: pizzaViande },
        { id: 'tacos poulet', price: 450, img: pizzaViande },
        { id: 'tacos chawarema', price: 450, img: pizzaViande },
        { id: 'tacos mix', price: 450, img: pizzaViande },
      ],
    },
    {
      id: 'hamburger',
      articles: [
        { id: 'hamburger viande', price: 200, img: pizzaViande },
        { id: 'hamburger escalope', price: 200, img: pizzaViande },
        { id: 'hamburger merguez', price: 200, img: pizzaViande },
        { id: 'hamburger foie', price: 200, img: pizzaViande },
        { id: 'hamburger double viande', price: 200, img: pizzaViande },
      ],
    },
    {
      id: 'panini',
      articles: [
        { id: 'panini viande', price: 200, img: pizzaViande },
        { id: 'panini poulet', price: 200, img: pizzaViande },
        { id: 'panini escalope', price: 200, img: pizzaViande },
        { id: 'panini merguez', price: 200, img: pizzaViande },
        { id: 'panini steack', price: 200, img: pizzaViande },
        { id: 'panini foie', price: 200, img: pizzaViande },
        { id: 'panini chawarema', price: 200, img: pizzaViande },
      ],
    },
  ],
  suppliments: [
    { id: 'Cheddar', price: 50 },
    { id: 'Gruyère', price: 50 },
  ],
  getArticle: (id: string) => {
    const family = data.families.find((fam) => {
      return fam.articles.some((article) => {
        return article.id === id;
      });
    });
    if (family) {
      return family.articles.find((art) => art.id === id);
    }
    return null;
  },
  getSuppliment: (id: string) => {
    return data.suppliments.find((supp) => supp.id === id);
  },
};

export default data;
