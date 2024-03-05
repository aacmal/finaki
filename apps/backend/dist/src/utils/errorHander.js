export const errorResponse = (param, msg) => ({
    errors: [
        {
            param,
            msg,
        },
    ],
});
