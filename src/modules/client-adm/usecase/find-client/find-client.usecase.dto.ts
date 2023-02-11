export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
