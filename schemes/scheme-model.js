const db = require('../config/db')

const find = () => {
    return db('schemes')
}

const findById = (id) => {
    return db('schemes')
        .where({ id })
        .first()
}

const findSteps = (id) => {
    //we're taking in an id as an argument.
    return db('schemes as t')
        //we're returning the database table schemes as the left side.
        .select('s.id', 't.scheme_name', 's.step_number', 's.instructions')
        //we're choosing what we want to see here.
        .join('steps as s', 't.id', 's.scheme_id')
        //we're indicating the table we want to join, the table parameter we'd like to join to, the parameter from the first argument that we'd like to use to join the original table.
        .where({ scheme_id: id })
}

const add = async (scheme) => {
    const [id] = await db('schemes')
                .insert(scheme)
    return findById(id)
}

const update = async (changes, id) => {
    await db('schemes')
        .where({ id })
        .update(changes)
    return findById(id)
}

const remove = (id) => {
    return db('schemes')
        .where({ id })
        .del()
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}