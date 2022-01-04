export type locationType = "food" | "travel";

export interface AddLocationData {
  owner: string;
  visited: boolean;
  visitedDate?: string;
  menus?: { title: string; amount: number }[];
  review?: string;
  position: { x: string; y: string };
  wanted: string;
  type: locationType;
  foodType?: string;
  memo: string;
  amountRange: {
    min: number;
    max: number;
  };
  title: string;
  isWorked: boolean;
  place_url?: string;
}
