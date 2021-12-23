module.exports = {
  friendlyName: "Get",

  description: "Get board.",

  inputs: {
    id: {
      required: true,
      description: "id for board",
      type: "number",
    },
  },

  exits: {
    invalid: {
      description: "Database error",
    },
  },

  fn: async function (inputs) {
    const { id } = inputs;
    try {
      const board = await Board.find({ id });
      return board;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
