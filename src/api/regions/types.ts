export type Region = {
  name: string,
};

export type RegionSideData = {
  id: string,
  lastUpdated: number,
  timestamp: number,
};

export type RegionResp = Region & RegionSideData;

export type RegionsResp = RegionResp[];


