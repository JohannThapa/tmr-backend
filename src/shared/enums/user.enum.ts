export enum EUserRole {
  ADMIN = 'ADMIN',
  READER = 'READER',
  CREATOR = 'CREATOR',
}
export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  HOLD = 'HOLD',
  BAN = 'BAN',
  SUSPEND = 'SUSPEND',
  DELETE = 'DELETE',
  FAILED = 'FAILED',
}
export enum EAdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}
export enum ECreatorRole {
  TEACHER = 'TEACHER',
  AUTHOR = 'AUTHOR',
  ORGANIZATION = 'ORGANIZATION',
}
export enum EReaderRole {
  ANONYMOUS = 'ANONYMOUS',
  STUDENT = 'STUDENT',
  READER = 'READER',
  OTHERS = 'OTHERS',
}
