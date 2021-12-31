export type locationType = "food" | "travel";

export interface AddLocationData {
  owner: string;
  visited: string;
  visitedDate: null;
  menus: { title: string; amount: number }[];
  review: string;
  position: { x: string; y: string };
  wanted: string;
  type: locationType;
  foodType: string;
  memo: string;
  amountRange: {
    min: number;
    max: number;
  };
  title: string;
  isWorked: true;
}
