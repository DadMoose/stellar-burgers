import { TIngredient } from '@utils-types';
import reducer, {
  addIngredient,
  moveIngredient,
  removeIngredient
} from './constructorSlice';

const bun: TIngredient = {
  _id: 'bun',
  name: 'Булка обыкновенная',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 9999,
  price: 1,
  image: '',
  image_large: '',
  image_mobile: ''
};

const main: TIngredient = {
  ...bun,
  _id: 'main',
  type: 'main',
  name: 'Начинка вкусная',
  price: 5
};

describe('constructorSlice', () => {
  it('добавляет булку и начинку', () => {
    let state = reducer(undefined, addIngredient(bun));
    expect(state.bun?._id).toBe('bun');
    state = reducer(undefined, addIngredient(main));
    expect(state.ingredients[0]._id).toBe('main');
  });

  it('удаляет ингредиент по id', () => {
    const startState = reducer(undefined, addIngredient(main));
    const id = startState.ingredients[0].id;
    const state = reducer(startState, removeIngredient(id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('меняет порядок ингредиентов', () => {
    const first = { ...main, _id: 'main-0' };
    const second = { ...main, _id: 'main-1' };
    let state = reducer(undefined, addIngredient(first));
    state = reducer(state, addIngredient(second));

    const stateMoved = reducer(state, moveIngredient({ from: 0, to: 1 }));

    expect(stateMoved.ingredients[0]._id).toBe('main-1');
    expect(stateMoved.ingredients[1]._id).toBe('main-0');
  });
});
