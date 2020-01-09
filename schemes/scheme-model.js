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
    // we destructure the array and indicate which table we want to insert an entry into. Then we return the entry that we added by using a function we've already defined (findById)
    const [id] = await db('schemes')
                .insert(scheme)
    return findById(id)
}


const update = async (changes, id) => {
    //very similar to add, though in this case we have to specify id as being the object we're looking to update. Once we've found it, we update it and then return the updated object by finding it by Id.
    await db('schemes')
        .where({ id })
        .update(changes)
    return findById(id)
}

const remove = (id) => {
    //simpler than others. We look for the correct entry via Id, then delete it.
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