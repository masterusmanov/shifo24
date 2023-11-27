export enum HttpError {
  USER_ALREADY_SIGNED = 'USER_ALREADY_SIGNED',
  INCORRECT_OTP = 'INCORRECT_OTP',
  TRY_FEW_MINUTES_LATER = 'TRY_FEW_MINUTES_LATER',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  INCORRECT_PHONE = 'INCORRECT_PHONE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  USER_NOT_SIGNED = 'USER_NOT_SIGNED',
  USER_NOT_REGISTERED = 'USER_NOT_REGISTERED',
  USER_INFO_NOT_FILLED = 'USER_INFO_NOT_FILLED',
  OTHER_ROLE_REGISTERED = 'OTHER_ROLE_REGISTERED',
  USER_INFO_ALREADY_FILLED = 'USER_INFO_ALREADY_FILLED',
  ONLY_COMMENT_TO_DOCTOR = 'ONLY_COMMENT_TO_DOCTOR',
  YOU_CANNOT_COMMENT_OWN_PROFILE = 'YOU_CANNOT_COMMENT_OWN_PROFILE',
  YOU_HAVE_ALREADY_COMMENT = 'YOU_HAVE_ALREADY_COMMENT',
  ADMIN_ALREADY_REGISTERED = 'ADMIN_ALREADY_REGISTERED'
}

export enum HttpResponse {
  OPERATION_DONE = 'OPERATION_DONE'
}
