exports.handler = async function () {
  return {
    statusCode: 302,
    headers: {
      Location: "https://www2-stage.aapc.com/account",
    },
  };
};
