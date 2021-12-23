module.exports = {
  friendlyName: "Update",

  description: "Update todo.",

  inputs: {
    description: {
      required: true,
      description: "description for TODO",
      type: "string",
    },
    id: {
      required: true,
      description: "id for todo",
      type: "number",
    },
    status: {
      required: true,
      description: "status of the todo item",
      type: "boolean",
    },
    boardId: {
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
    // All done.
    const { description, id, status, boardId } = inputs;
    try {
      const updatedTodo = await Todo.updateOne({ id }).set({
        description,
        status,
        boardId,
      });

      return updatedTodo;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
