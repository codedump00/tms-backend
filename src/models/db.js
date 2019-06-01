
const initOptions = {
    // initialization options;
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(process.env.DATABASE_URI)

module.exports = {
    pgp, db
}