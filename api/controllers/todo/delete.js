module.exports = {
  friendlyName: "Delete",

  description: "Delete todo.",

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
      const deletedTodo = await Todo.destroy({
        id,
      }).fetch();
      console.log(deletedTodo);
      return;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
