import data from "../data.json";
import { TCompetency } from "types";
import { IParticipant, ICompetency } from "interfaces";

export default function getParticipantResult({
  participants,
  selectedParticipant,
  competencies,
  selectedCompetency,
}: {
  participants: IParticipant[];
  selectedParticipant: number;
  competencies: ICompetency[];
  selectedCompetency: TCompetency | "";
}) {
  const participant = participants.find(({ id }) => id === selectedParticipant);

  const participantFullData =
    participant && data.find((item) => item.Participant === participant.name);
  if (!participantFullData) {
    return "There was an error related to the participant data";
  }

  const competency = competencies.find(
    ({ name }) => name === selectedCompetency
  );

  const competencyValue =
    participantFullData[selectedCompetency as TCompetency];

  if (!competencyValue) {
    return `${participantFullData.Participant} has no ${competency?.type} for ${selectedCompetency}`;
  }
  return `${participantFullData.Participant} has a ${competency?.type} of ${competencyValue} for ${selectedCompetency}`;
}
