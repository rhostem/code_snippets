import produce from 'immer';

describe('immer test', () => {
  test('check immutability of unchanged property', () => {
    const initial = {
      todos: [],
      title: 'title',
      nested: {},
    };

    const state2 = produce(initial, (draft) => {
      draft.title = 'new Title';
      draft.nested = { value: 1 };
    });

    expect(initial).not.toBe(state2);
    expect(initial.todos).toBe(state2.todos);
    expect(initial.nested).not.toBe(state2.nested);
  });
});
