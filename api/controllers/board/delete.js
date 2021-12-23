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
      const board = await Board.destroy({
        id,
      }).fetch();
      console.log(board);
      const todos = await Todo.find({ boardId: id });
      const todosTodelete = todos.map((todo) => todo.id);
      const deletedTodo = await Todo.destroy({
        id: { in: todosTodelete },
      }).fetch();
      console.log(deletedTodo);
      return;
    } catch (err) {
      console.log(err);
      throw { invalid: err };
    }
  },
};
