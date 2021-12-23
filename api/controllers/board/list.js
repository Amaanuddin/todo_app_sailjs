module.exports = {
  friendlyName: "List",

  description: "List board.",

  inputs: {},

  exits: {
    invalid: {
      description: "Database error",
    },
  },

  fn: async function (inputs) {
    try {
      const boards = await Board.find();
      return boards;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
