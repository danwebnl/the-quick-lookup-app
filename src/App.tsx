import { useEffect, useState, useCallback } from "react";
import data from "./data.json";
import "./App.css";
import SelectDropdownForm from "./components/SelectDropdownForm";
import { IParticipant, ICompetency } from "./interfaces";
import { TCompetency, TDropdown } from "./types";
import { parseData, getParticipantResult, getSummaryResult } from "./utils";

function App() {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [competencies, setCompetencies] = useState<ICompetency[]>([]);
  const [dropdown, setDropdown] = useState<TDropdown>("participant");
  const [selectedParticipant, setSelectedParticipant] = useState<number>(0);
  const [selectedCompetency, setSelectedCompetency] = useState<
    TCompetency | ""
  >("");
  const [selectedSummary, setSelectedSummary] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // extract the lists of participants and competencies
  useEffect(() => {
    const { participants, competencies } = parseData({ data });
    setParticipants(participants);
    setCompetencies(competencies);
  }, []);

  // get the result after using the Participant and Competency select boxes
  const getParticipant = useCallback(() => {
    return getParticipantResult({
      participants,
      selectedParticipant,
      competencies,
      selectedCompetency,
    });
  }, [participants, selectedParticipant, competencies, selectedCompetency]);

  // get the result after using the Summary and Competency select boxes
  const getSummary = useCallback(() => {
    return getSummaryResult({
      competencies,
      selectedCompetency,
      selectedSummary,
    });
  }, [competencies, selectedCompetency, selectedSummary]);

  useEffect(() => {
    let result = "";

    if (
      dropdown === "participant" &&
      selectedParticipant !== 0 &&
      selectedCompetency !== ""
    ) {
      result = getParticipant();
    } else if (
      dropdown === "summary" &&
      selectedSummary !== "" &&
      selectedCompetency !== ""
    ) {
      result = getSummary();
    }
    setResult(result);
  }, [
    selectedParticipant,
    selectedCompetency,
    selectedSummary,
    dropdown,
    getParticipant,
    getSummary,
  ]);

  return (
    <div>
      <h1>The Quick Lookup App</h1>

      <SelectDropdownForm dropdown={dropdown} setDropdown={setDropdown} />

      <div className="forms-wrapper">
        {/* Participants select box */}
        <select
          disabled={dropdown !== "participant"}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedParticipant(Number(event.target.value))
          }
          name="select-participiant"
          data-testid="select-participant"
        >
          <option value="">Select a Participant</option>
          {participants.map(({ id }) => (
            <option value={id} key={`participant-${id}`}>
              {id}
            </option>
          ))}
        </select>

        {/* Summary select box */}
        <select
          disabled={dropdown !== "summary"}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedSummary(event.target.value)
          }
          name="select-summary"
          data-testid="select-summary"
        >
          <option value="">Select a Summary</option>
          <option value="lowest">lowest</option>
          <option value="average">average</option>
          <option value="highest">highest</option>
          <option value="type">type</option>
        </select>
      </div>

      {/* Competencies select box */}
      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedCompetency(event.target.value as TCompetency)
        }
        name="select-competency"
        data-testid="select-competency"
      >
        <option value="">Select a Competency</option>
        {competencies.map(({ name }) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>

      <div className="result" data-testid="result">
        {result && result}
      </div>
    </div>
  );
}

export default App;
