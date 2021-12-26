module.exports = {
  friendlyName: "Delete",

  description: "Delete board.",

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
      const todos = await Todo.find({ where: { boardId: id } });
      await Board.destroy({
        id,
      }).fetch();
      const todosTodelete = todos.map((todo) => {
        return todo.id;
      });
      await Todo.destroy({
        id: { in: todosTodelete },
      }).fetch();
      return;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
