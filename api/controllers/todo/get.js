module.exports = {
  friendlyName: "Get",

  description: "Get todo.",

  inputs: {
    id: {
      required: true,
      description: "id for todo",
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
      const todo = await Todo.find({ id }).populate("boardId");
      return todo;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
