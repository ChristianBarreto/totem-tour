export type Totem = {
  id: string,
  nickName: string,
  locationDescription: string,
  responsiblePerson: string,
  posId: string,
  cityOrder: string,
  showTestProduct: boolean,
  regionId: string,
  cityId: string,
  lastPing?: number | null,
  lastUpdated: string,
  timestamp: string,
}

export type TotemParams = {
  orderBy: {
    timestamp?: string,
    name?: string;  
  }
}