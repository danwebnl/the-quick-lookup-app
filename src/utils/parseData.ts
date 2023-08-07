import { IDataItem, IParticipant, ICompetency } from "interfaces";
import { TCompetency } from "types";

export default function parseData({ data }: { data: IDataItem[] }) {
  const participants: IParticipant[] = [];
  const competencies: ICompetency[] = [];

  data.map((item: IDataItem) => {
    Object.keys(item).map((prop) => {
      prop === "Participant" &&
        item[prop] !== null &&
        participants.push({
          id: participants.length + 1,
          name: item[prop] as string,
        });

      prop !== "Participant" &&
        item[prop] !== null &&
        competencies.findIndex(({ name }) => name === prop) === -1 &&
        competencies.push({
          name: prop as TCompetency,
          type:
            typeof item[prop] === "number" || prop === "Total"
              ? "score"
              : "level",
        });
    });
  });

  return { participants, competencies };
}
