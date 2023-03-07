import Knex from 'knex'

const dbConnection = {
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite'
    }
}

export default Knex(dbConnection)
