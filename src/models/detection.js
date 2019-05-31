
const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.DATABASE_URL)

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
