// TODO: Fetch dummy data testing purpose

export const getTransactionsData = (): Promise<any> => {
  return new Promise((resolve) => {
    import('../data/transactions_example.json').then((data) => {
      resolve(data.default.data);
    });
  });
}