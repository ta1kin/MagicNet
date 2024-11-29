export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly responseData: Record<string, unknown>,
    message: string = ''
  ) {
    super(message)
    this.name = 'CustomError'
  }
}

export const EMAIL_NOT_VERIFIED = new CustomError(
  401,
  { error: 'Email isn\'t verified.', status: 'Verify email error!' },
  'Email isn\'t verified.'
)

export const INVALID_CREDENTIALS = new CustomError(
  401,
  { error: 'Email or password is incorrect.', status: 'Auth error!' },
  'Email or password is incorrect.'
)

export const DATABASE_ERROR = new CustomError(
  500,
  { error: 'Server problems, try again later.', status: 'Internal Server Error' },
  'Database operation failed.'
)

export const REDIS_ERROR = new CustomError(
  503,
  { error: 'Redis crashed!', status: 'Service Unavailable' },
  'Redis service unavailable.'
)

export const TOKEN_EXPIRED = new CustomError(
  401,
  { error: 'Token expired.', status: 'Unauthorized' },
  'Access token has expired.'
)

export const TOKEN_INVALID = new CustomError(
  401,
  { error: 'Invalid token.', status: 'Unauthorized' },
  'Provided token is invalid.'
)

export const USER_NOT_FOUND = new CustomError(
  404,
  { error: 'User not found.', status: 'Not Found' },
  'Requested user does not exist.'
)

export const EMAIL_EXISTS = new CustomError(
  409,
  { error: 'Email already exists.', status: 'Conflict' },
  'This email address is already registered.'
)
