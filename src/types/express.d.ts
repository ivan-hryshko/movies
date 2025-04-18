/// <reference types="express" />

// Add RequestValidation Interface on to Express's Request Interface.
declare namespace Express {
  interface Request extends Flash {}
  export interface Request {
    user: any
    file: any
  }
}

interface Flash {
  flash(type: string, message: any): void
}

declare module 'express-flash'
