const db = require('../config/db')

const find = () => {
    return db('schemes')
}

const findById = (id) => {
    return db('schemes')
        .where({ id })
        .first()
}

const findSteps = (id) =>  {
    return db('steps as t')
        .join('schemes as s')
        .on('t.scheme_id', 's.id')
        .where('t.scheme_id', id)
        .select('t.id', 's.scheme_name', 't.step_number')
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