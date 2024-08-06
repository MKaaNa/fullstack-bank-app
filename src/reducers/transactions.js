// ../reducers/transactions.js

const initialState = [];

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, action.transaction];
    case 'REMOVE_TRANSACTION':
      return state.filter(transaction => transaction.id !== action.id);
    default:
      return state;
  }
};
