// The new operator lets developers create an instance of a user-defined object type or of one of the built-in object types that has a constructor function. The new keyword does the following things:

// 1. Creates a blank, plain JavaScript object;
// 2. Links (sets the constructor of) this object to another object;
// 3. Passes the newly created object from Step 1 as the this context;
// 4. Returns this if the function doesn't return its own object.

/**
 *
 * @param {Function} constr
 */
const $new = function (constr) {
  // 1 + 2:  create an empty object and link prototype
  let obj = Object.create(constr.prototype);
  // 3. setup this context and create the object
  let result = constr.apply(obj, Array.prototype.slice.bind(arguments, 1));
  // 4. return this
  return result instanceof Object ? result : obj;
};

export { $new };
