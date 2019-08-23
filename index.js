'use strict'

module.exports = thunky

function thunky (fn) {
  var state = run
  return thunk

  function thunk (callback) {
    state(callback || noop)
  }

  function run (callback) {
    var stack = [callback]
    state = wait
    fn(done)

    function wait (callback) {
      stack.push(callback)
    }

    function done (err) {
      var args = arguments
      state = isError(err) ? run : finished
      while (stack.length) finished(stack.shift())

      function finished (callback) {
        setTimeout(apply, 0, callback, args)
      }
    }
  }
}

function isError (err) {
  return {}.toString.call(err) === '[object Error]'
}

function noop () {}

function apply (callback, args) {
  callback.apply(null, args)
}
