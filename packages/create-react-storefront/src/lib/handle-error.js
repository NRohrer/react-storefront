/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
/**
 * Prints an error stack trace, a custom message, and exits with code 1.
 *
 * @param {Object} err The error object.
 * @param {string} msg The message to be printed.
 */
const handleError = (err, msg) => {
  console.log(err.stack)
  console.log(msg)

  if (process.env.NODE_ENV != 'test') {
    process.exit(1)
  }
}

module.exports = handleError