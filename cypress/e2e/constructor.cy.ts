const selectors = {
  modalTitle: 'Детали ингредиента',
  modalHeader: 'h3',
  modalRoot: '#modals',
  constructorItem: '.constructor-element'
};

const ingredientNames = {
  bun: 'Булка тестовая',
  main: 'Котлета тестовая',
  sauce: 'Соус тестовый'
};

describe('Конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refreshToken');
    });
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.addIngredient(ingredientNames.bun);
    cy.addIngredient(ingredientNames.main);
    cy.addIngredient(ingredientNames.sauce);

    cy.contains(`${ingredientNames.bun} (верх)`).should('exist');
    cy.contains(`${ingredientNames.bun} (низ)`).should('exist');
    cy.contains(selectors.constructorItem, ingredientNames.main).should(
      'exist'
    );
    cy.contains(selectors.constructorItem, ingredientNames.sauce).should(
      'exist'
    );
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.openIngredientModal(ingredientNames.sauce);
    cy.contains(selectors.modalTitle).should('exist');
    cy.contains('.text_type_main-medium', ingredientNames.sauce).should(
      'exist'
    );

    cy.contains(selectors.modalHeader, selectors.modalTitle)
      .parent()
      .find('button')
      .click();
    cy.contains(selectors.modalTitle).should('not.exist');

    cy.contains('li', ingredientNames.bun).click();
    cy.contains(selectors.modalTitle).should('exist');
    cy.get(selectors.modalRoot).children().last().click({ force: true });
    cy.contains(selectors.modalTitle).should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.addIngredient(ingredientNames.bun);
    cy.addIngredient(ingredientNames.main);
    cy.addIngredient(ingredientNames.sauce);
    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');
    cy.contains('123456').should('exist');

    cy.get(selectors.modalRoot).children().last().click({ force: true });
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
