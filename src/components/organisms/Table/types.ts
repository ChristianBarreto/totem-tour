import { ReactNode } from "react";

export type Filter = [string, string]

export type Sort = any;

export type TableHeaderItem = {
  name: string,
  value: string,
  component?: ReactNode
}

export interface AnyObject {
  [key: string]: never  
}