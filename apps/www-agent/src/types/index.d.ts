export type APIErrorType = {
  message: string;
  statusCode: number;
}

export type AuthAtom = {
  token: string;
}

export type Property = {
  id: string,
  name: string,
  boughtFrom: string,
  price: number,
  location: string,
  image: string,
  legalDoc: string,
  tenantStatus: boolean,
  createdAt: string,
  rentDueDate: string,
  rentCollected: 0
}