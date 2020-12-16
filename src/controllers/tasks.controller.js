const { getConnection } = require('../database');
const { v4 } = require('uuid')

// aca se definen funcionalidad sobre la db por ejemplo getTask devuele todas la tareas
const getTasks = (req ,res) => {
    // busca en los valores de task en el json y los trae
    const tasks = getConnection().get('tasks').value();
    res.json(tasks);
};

const createTask = (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
    const newTask = {
        // el id se genera por uuid v4 requerido arriba
        id: v4(),
        name: req.body.name,
        description: req.body.description
    };
    // get('tasks') devuelve tabla tasks
    getConnection().get('tasks').push(newTask).write();
    res.send('received')
}

const getTask = (req, res) => {
    const task = getConnection().get('tasks').find({id: req.params.id}).value();
    res.json(task)
}

const updateTask = async (req, res) => {
   const result = await getConnection().get('tasks').find({id: req.params.id})
        // asigna al lo que viene en el body al id que encontro en tabla tasks
        .assign(req.body)
        // graba el registro actualizado
        .write();
    res.json(result);
}

const deleteTask = async (req, res) => {
    const result = await getConnection().get('tasks').remove({id: req.params.id})
    res.json(result);
}

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
