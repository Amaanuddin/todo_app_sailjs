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
    status: {
      required: true,
      description: "status of the todo item",
      type: "boolean",
    },
  },

  exits: {
    invalid: {
      description: "Database error",
    },
  },

  fn: async function (inputs) {
    // All done.
    const { description, boardId, status } = inputs;
    try {
      await Todo.create({
        description,
        boardId,
        status,
      });

      return;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
