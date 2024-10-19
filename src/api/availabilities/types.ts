export type Availability = {
  active: boolean,
  date: string,
  productId: string,
  availability: number,
  booked: number,
  remaining: number,
  id: string,
}

export type Availabilities = Availability[];
