module.exports = {
  friendlyName: "List",

  description: "List todo.",

  inputs: {
    // id: {
    //   required: true,
    //   description: "id for board",
    //   type: "number",
    // },
  },

  exits: {
    invalid: {
      description: "Database error",
    },
  },

  fn: async function (inputs) {
    // const { id } = inputs;
    try {
      const todos = await Todo.find().populate("boardId");
      return todos;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
