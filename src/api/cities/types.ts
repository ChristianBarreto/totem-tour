export type City = {
  id: string,
  name: string,
  imgUrl: string,
  active: boolean,
  regionId: string,
  regionName: string,
};

export type CitySideData = {
  id: string,
  lastUpdated: number,
  timestamp: number,
}

export type CityResp = City & CitySideData;

export type CitiesResp = CityResp[];