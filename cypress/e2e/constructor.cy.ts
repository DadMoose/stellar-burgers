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
    cy.contains('li', 'Булка тестовая').contains('Добавить').click();
    cy.contains('li', 'Котлета тестовая').contains('Добавить').click();
    cy.contains('li', 'Соус тестовый').contains('Добавить').click();

    cy.contains('Булка тестовая (верх)').should('exist');
    cy.contains('Булка тестовая (низ)').should('exist');
    cy.contains('.constructor-element', 'Котлета тестовая').should('exist');
    cy.contains('.constructor-element', 'Соус тестовый').should('exist');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.contains('li', 'Соус тестовый').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('.text_type_main-medium', 'Соус тестовый').should('exist');

    cy.contains('h3', 'Детали ингредиента').parent().find('button').click();
    cy.contains('Детали ингредиента').should('not.exist');

    cy.contains('li', 'Булка тестовая').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').children().last().click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.contains('li', 'Булка тестовая').contains('Добавить').click();
    cy.contains('li', 'Котлета тестовая').contains('Добавить').click();
    cy.contains('li', 'Соус тестовый').contains('Добавить').click();
    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');
    cy.contains('123456').should('exist');

    cy.get('#modals').children().last().click({ force: true });
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
