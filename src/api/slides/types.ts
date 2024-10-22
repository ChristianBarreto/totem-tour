export type Slide = {
  id: string,
  img: string,
  description: string,
  active: boolean,
  order: number,
  duration: number,
}

export type Slides = Slide[];

type SlideSideData = {
  lastUpdated: number,
  timestamp: number,
}

export type SlideResp = Slide & SlideSideData;

export type SlidesResp = SlideResp[];