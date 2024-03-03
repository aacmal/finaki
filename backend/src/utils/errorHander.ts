export const errorResponse = (param: string, msg: string) => ({
  errors: [
    {
      param,
      msg,
    },
  ],
});
