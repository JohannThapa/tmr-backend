export enum EPaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export enum EPaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  ESEWA = 'ESEWA',
  KHALTI = 'KHALTI',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PHONE_PAY = 'PHONE_PAY',
}

export enum ESubscriptionType {
  MONTHLY = 'MONTHLY',
  COURSE = 'COURSE',
}

export enum ETransactionType {
  MATERIAL_PURCHASE = 'MATERIAL_PURCHASE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  TRIAL = 'TRIAL',
  FREE = 'FREE',
}
