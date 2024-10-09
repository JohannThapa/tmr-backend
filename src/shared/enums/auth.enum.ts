export enum EAdmin {
  SUPER_ADMIN = 'super admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum EUser {
  STUDENT = 'student',
  TUTOR = 'tutor',
  AUTHOR = 'author',
  ANONYMOUS = 'anonymous',
}

export enum EAuthTokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export enum EAuthenticationProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}
