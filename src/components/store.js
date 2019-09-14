import { BehaviorSubject } from 'rxjs';

export const items$ = new BehaviorSubject(
  JSON.parse(window.localStorage.getItem('items') || '[]')
);

export function updateItems(newItem) {
  if (!newItem) {
    window.localStorage.removeItem('items');
  } else {
    window.localStorage.setItem('items', JSON.stringify(newItem));
  }
  items$.next(newItem);
}

export function addToCart(product, qty) {
  let ob = { product, qty };
  const cart = [...items$.value];
  const index = cart.findIndex(x => x.product._id === product._id);

  if (index > -1) {
    //om produkten redan finns
    cart[index].qty += qty;
  } else {
    cart.push(ob);
  }

  window.localStorage.setItem('items', JSON.stringify(cart));
  items$.next(cart);
}
