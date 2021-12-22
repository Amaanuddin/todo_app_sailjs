module.exports = {
  friendlyName: "Create",

  description: "Create board.",

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
    const { name } = inputs;
    try {
      await Board.create({
        name,
      });

      return;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
