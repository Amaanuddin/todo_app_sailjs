module.exports = {
  friendlyName: "List",

  description: "List todo.",

  inputs: {
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
    const { boardId } = inputs;
    try {
      const todos = await Todo.find({ where: { boardId } }).populate("boardId");
      return todos;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
