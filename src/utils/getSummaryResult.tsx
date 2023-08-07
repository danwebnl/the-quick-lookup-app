import data from "../data.json";
import { ICompetency } from "interfaces";
import { TCompetency, TLevel } from "types";

export default function getParticipantResult({
  competencies,
  selectedCompetency,
  selectedSummary,
}: {
  competencies: ICompetency[];
  selectedCompetency: TCompetency | "";
  selectedSummary: string;
}) {
  const competency = competencies.find(
    ({ name }) => name === selectedCompetency
  );
  const values = data
    .map((item) => item[selectedCompetency as TCompetency])
    .filter((n) => n);

  switch (selectedSummary) {
    case "type": {
      return `The type of ${selectedCompetency} is '${competency?.type}'`;
    }

    case "lowest": {
      if (competency?.type === "score") {
        const numberValues = values as number[];
        const res = Math.min(...numberValues);
        return `The lowest score for ${selectedCompetency} is ${res}`;
      }

      return `The lowest level for ${selectedCompetency} is ${
        values.sort()[0]
      }`;
    }

    case "average": {
      if (competency?.type === "score") {
        const numberValues = values as number[];
        const sum = numberValues.reduce((acc, curr) => acc + Number(curr), 0);
        const average = (sum / numberValues.length).toFixed(1);

        return `The average score for ${selectedCompetency} is ${average}`;
      }

      // for a competency of type 'level'
      const levels: { [key: string]: number } = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
      };
      const stringValues = values as TLevel[];

      const valuesConverted = stringValues.map((value) => levels[value]);
      const sum = valuesConverted.reduce((acc, curr) => acc + Number(curr), 0);
      const average = Math.round(sum / valuesConverted.length);
      const averageLevel = Object.keys(levels).find(
        (key) => levels[key] === average
      );

      return `The average level for ${selectedCompetency} is ${averageLevel}`;
    }

    case "highest": {
      if (competency?.type === "score") {
        const numberValues = values as number[];
        const res = Math.max(...numberValues);
        return `The highest score for ${selectedCompetency} is ${res}`;
      }

      return `The highest level for ${selectedCompetency} is ${
        values.sort()[values.length - 1]
      }`;
    }

    default:
      return "";
  }
}
