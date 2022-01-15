const form = document.getElementById('form');
const alertDOM = document.querySelector('.alert');
const inputValue = document.querySelector('input[type=number]');
const knapsackWeightDOM = document.querySelector('.weight-items');
const knapsackCapacityDOM = document.getElementById('knapsackCapacity');
const cartContentDOM = document.querySelector('.cart-content');
const cartOverlayDOM = document.querySelector('.cart-overlay');
const cartDOM = document.querySelector('.cart');
const itemsWeightDOM = document.querySelector('#itemsWeight');
const cartTotalDOM = document.querySelector('.cart-total');
const cartItems = document.querySelector('.cart-items');
const submitBtnDOM = document.querySelector('.submit');
const closeCartDOM = document.querySelector('.close-cart')
const weightDOM = document.querySelector('.weight')


const items = [
  {
    "id": "1",
    "title": "Ice Cream Treat",
    "price": 10.99,
    "image": "https://source.unsplash.com/6iyVYPzgFpw/1000x662",
    "weight": 10
  },
  {
    "id": "2",
    "title": "Apricot Iced tea Popsicles",
    "price": 15.99,
    "image": "https://source.unsplash.com/AHovO6qOdFg/1000x662",
    "weight": 17
  },
  {
    "id": "3",
    "title": "Autumnal Treats",
    "price": 17.99,
    "image": "https://source.unsplash.com/MXovqM130UI/1000x662",
    "weight": 19
  },
  {
    "id": "4",
    "title": "White forest Cake",
    "price": 18.99,
    "image": "https://source.unsplash.com/8Jg4U4xHu-o/1000x662",
    "weight": 14
  },
  {
    "id": "5",
    "title": "Baking Bread",
    "price": 12.99,
    "image": "https://source.unsplash.com/QsGtVwWStI8/1000x662",
    "weight": 12
  },
  {
    "id": "6",
    "title": "Complete Breakfast Set",
    "price": 120.99,
    "image": "https://source.unsplash.com/DfbrRpHTLy0/1000x662",
    "weight": 100
  },
  {
    "id": "7",
    "title": "sandwiches",
    "price": 50.99,
    "image": "https://source.unsplash.com/VRB1LJoTZ6w/1000x662",
    "weight": 66
  },
  {
    "id": "8",
    "title": "Meat Stew",
    "price": 10.99,
    "image": "https://source.unsplash.com/xKSRpUH0VZo/1000x662",
    "weight": 10
  },
  {
    "id": "9",
    "title": "Meat Treat",
    "price": 40.99,
    "image": "https://source.unsplash.com/O67LZfeyYBk/1000x662",
    "weight": 40
  },
  {
    "id": "10",
    "title": "Spaghetti Treat",
    "price": 65.99,
    "image": "https://source.unsplash.com/AUAuEgUxg5Q/1000x662",
    "weight": 65
  },
  {
    "id": "11",
    "title": "Pesto Pasta",
    "price": 88.99,
    "image": "https://source.unsplash.com/12eHC6FxPyg/1000x662",
    "weight": 88
  },
  {
    "id": "12",
    "title": "Steak Dinner",
    "price": 60.99,
    "image": "https://source.unsplash.com/auIbTAcSH6E/1000x662",
    "weight": 65
  },
  {
    "id": "13",
    "title": "Bugger",
    "price": 78.99,
    "image": "https://source.unsplash.com/7cve1jTDlfM/1000x662",
    "weight": 60
  },
  {
    "id": "14",
    "title": "Spanish Paella",
    "price": 34.99,
    "image": "https://source.unsplash.com/Pt_YmiYm7a4/1000x662",
    "weight": 54
  },
  {
    "id": "15",
    "title": "Meal with salmon and zucchini",
    "price": 200.99,
    "image": "https://source.unsplash.com/awj7sRviVXo/1000x662",
    "weight": 153
  },
  {
    "id": "16",
    "title": "Fancy Toast",
    "price": 17.99,
    "image": "https://source.unsplash.com/QaGDmf5tMiE/1000x662",
    "weight": 18
  },
  {
    "id": "17",
    "title": "Chopping Ingredients",
    "price": 10.99,
    "image": "https://source.unsplash.com/uQs1802D0CQ/1000x662",
    "weight": 10
  },
  {
    "id": "18",
    "title": "Desert Treat",
    "price": 71.99,
    "image": "https://source.unsplash.com/09HGdZzkP-Q/1000x662",
    "weight": 80
  },
  {
    "id": "19",
    "title": "Avocado and Egg Toast",
    "price": 10.99,
    "image": "https://source.unsplash.com/fdlZBWIP0aM/1000x662",
    "weight": 10
  },
  {
    "id": "20",
    "title": "Fries",
    "price": 56.99,
    "image": "https://source.unsplash.com/BSAJ2u8cbAA/1000x662",
    "weight": 40
  },

];
let knapsackItem = [];
let knapsackWeight = 0;
let itemsButton = [];
let totalWeight = 0;
let totalPrice = 0;


const alertResult = (state, output) => {
  if (state === 'success') {
    alertDOM.classList.toggle("success");
    alertDOM.innerText = output;
    setTimeout(function () {
      alertDOM.classList.toggle("success");
      alertDOM.innerText = '';
      inputValue.value = ''
    }, 2000);
  } else {
    alertDOM.classList.toggle("failed");
    alertDOM.innerText = output;
    setTimeout(function () {
      alertDOM.classList.toggle("failed");
      alertDOM.innerText = '';
    }, 2000);
  }
}
const resetKnapsackItem = () => {
  while (knapsackItem.length) { knapsackItem.pop(); }
  totalWeight = 0;
  totalPrice = 0;
  cartItems.innerText = knapsackItem.length;
  cartItems.style.background = 'green';
  cartItems.parentElement.style.color = 'green';
  while (cartContentDOM.children.length > 0) {
    cartContentDOM.removeChild(cartContentDOM.children[0]);
  }
}

const getKnapsackWeight = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputValue.value > 0) {
      alertResult('success', 'success');
      knapsackWeight = inputValue.value;
      knapsackCapacityDOM.innerText = `${knapsackWeight}kg`;
      knapsackWeightDOM.innerText = `${knapsackWeight}kg`;
      weightDOM.style.color = 'green';
      resetKnapsackItem();
    }
    if (!inputValue.value || inputValue.value.length > 10 || inputValue.value <= 0) {
      alertResult('failed', 'Please set knapsack weight');
    }
  })
}
const getKnapsackItem = (id) => items.find(item => item.id === id);
const addItemToSack = (item) => {
  cartContentDOM.innerHTML += `
      <div class="cart-item">
           <img src=${item.image} alt="product">
           <div>
               <h4>${item.title}</h4>
               <h5>$${item.price}</h5>
               <h5>$${item.weight}</h5>
           </div>
       </div>`;
}
const showKnapsack = () => {
  cartDOM.classList.toggle("showCart");
  cartOverlayDOM.classList.toggle('transparentBcg');
}

const setKnapsackValues = (knapsack) => {
  let tempWeight = 0;
  let tempPrice = 0;
  knapsack.forEach(item => {
    tempWeight += item.weight;
    tempPrice += item.price;
  })
  totalWeight = tempWeight;
  totalPrice = tempPrice;
  itemsWeightDOM.innerText = parseFloat(totalWeight.toFixed(2));
  cartTotalDOM.innerText = parseFloat(totalPrice.toFixed(2));
}

const getProductsBtn = () => {
  itemsButton = [...document.querySelectorAll('.bag-btn')];
  itemsButton.forEach(item => {
    item.addEventListener('click', () => {
      if (knapsackWeight > 0) {
        if (knapsackWeight > totalWeight) {
          const id = item.dataset.id;
          const currentKnapsackItem = getKnapsackItem(id)
          knapsackItem = [...knapsackItem, currentKnapsackItem]
          addItemToSack(currentKnapsackItem);
          setKnapsackValues(knapsackItem);
          cartItems.innerText = knapsackItem.length;
        }
        if (knapsackWeight <= totalWeight) {
          alertResult('failed', 'knapsack is filled');
          cartItems.style.background = 'red';
          cartItems.parentElement.style.color = 'red'
          weightDOM.style.color = 'red';
        }

      }
      if (knapsackWeight <= 0) {
        alertResult('failed', "knapsack weight can't be zero");
      }
    })
  })
}

const checkItemSubmit = () => {
  submitBtnDOM.addEventListener('click', () => {
    showKnapsack();
  });
  closeCartDOM.addEventListener('click', () => {
    showKnapsack();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getKnapsackWeight();
  getProductsBtn();
  checkItemSubmit()
});