module.exports = {
  friendlyName: "Create",

  description: "Create todo.",

  inputs: {
    description: {
      required: true,
      description: "description for TODO",
      type: "string",
    },
    boardId: {
      required: true,
      description: "id of the board to which todo is attached.",
      type: "number",
    },
  },

  exits: {
    invalid: {
      description: "Database error",
    },
  },

  fn: async function (inputs) {
    // All done.
    const { description, boardId } = inputs;
    try {
      await Todo.create({
        description,
        boardId,
      });

      return;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
