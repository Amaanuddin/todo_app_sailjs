module.exports = {
  friendlyName: "Update",

  description: "Update board.",

  inputs: {
    name: {
      required: true,
      description: "name for board",
      type: "string",
    },
  },

  exits: {
    invalid: {
      description: "Database error",
    },
  },

  fn: async function (inputs) {
    const { name, id } = inputs;
    try {
      const updatedBoard = await Board.updateOne({ id }).set({
        name,
      });
      return updatedBoard;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
