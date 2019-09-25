const pgp = require('pg-promise')(/*options*/)
const config = require('../config')

const cn = {
  host: process.env.BNBRIDGE_DB_HOST || config.host,
  port: 5432,
  database: process.env.DBNAME || config.database,
  user: process.env.DBUSER || config.user,
  password: process.env.DBPASSWORD || config.password
}
const db = pgp(cn)

module.exports = {
  pgp, db
}
