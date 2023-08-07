import { Dispatch, SetStateAction } from "react";
import { TDropdown } from "types";

export default function SelectDropdownForm({
  dropdown,
  setDropdown,
}: {
  dropdown: TDropdown;
  setDropdown: Dispatch<SetStateAction<TDropdown>>;
}) {
  return (
    <div>
      Select:
      <label htmlFor="radio-participant">
        <input
          type="radio"
          value="participant"
          id="radio-participant"
          name="dropdown"
          checked={dropdown === "participant"}
          onChange={() => setDropdown("participant")}
        />
      </label>
      Participant
      <label htmlFor="radio-summary">
        <input
          type="radio"
          value="summary"
          id="radio-summary"
          name="dropdown"
          checked={dropdown === "summary"}
          onChange={() => setDropdown("summary")}
        />
        Summary
      </label>
    </div>
  );
}
