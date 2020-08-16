// see https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es5.d.ts
// implementation of some often used/ Typescript's type system, see es5.d.ts

// keyof: TS2.1
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#:~:text=%20TypeScript%202.1%20%201%20keyof%20and%20Lookup,Rest.%20Similarly%2C%20you%20can%20merge%20several...%20More%20
// in: JavaScript keyword to check whether the object has target property. For Typescript, 'in' could use to iterate all items in a Union type or act like a type guard.
//  https://stackoverflow.com/questions/50214731/what-does-the-in-keyword-do-in-typescript

// 1. Omit type helper
// construct a type with properties in T except for those in K
// introduced in TS3.5
type $Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 2. Pick type helper
// fromt T, pick a set of properties whoses keys are in the Union K
type $Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 3. Partial type helper
// Mapped types
type $Partial<T> = {
  [P in keyof T]?: T[P];
};

// 4. Readonly type helper
// Mapped types
type $ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

// 5. Record type helper
type $Record<K extends keyof any, T> = {
  [P in K]: T;
};

// 6. Exclude type helper
type $Exclude<T, U> = T extends U ? never : U;

// Custom helpers
type $NullAndUndefined<T> = {
  [P in keyof T]: T[P] | null | undefined;
};
