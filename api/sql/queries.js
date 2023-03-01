// queries.js dosyası

const getTodos = 'SELECT * FROM todos';
const addTodo = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
const deleteTodo = 'DELETE FROM todos WHERE id = ?';
const updateTodo = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';

module.exports = { getTodos, addTodo, deleteTodo, updateTodo };
