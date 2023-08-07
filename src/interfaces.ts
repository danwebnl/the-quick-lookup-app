import { TCompetency } from "./types";

export interface IDataItem {
  Participant: string | null;
  Total: string | null;
  [x: string]: string | number | null;
}

export interface IParticipant {
  id: number;
  name: string;
}

export interface ICompetency {
  name: TCompetency;
  type: "score" | "level";
}
