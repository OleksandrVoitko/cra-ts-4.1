import { FC, ChangeEvent } from "react";
interface FilterProps {
  filter: string;
  onChange: (e: ChangeEvent) => void;
}
export const Filter: FC<FilterProps> = ({ filter, onChange }) => {
  return (
    <>
      <label className="form-label" htmlFor="inputFilter">
        Find contacts by name:
      </label>
      <input
        name="filter"
        type="text"
        className="form-control"
        id="inputFilter"
        required
        value={filter}
        onChange={onChange}
      />
    </>
  );
};
