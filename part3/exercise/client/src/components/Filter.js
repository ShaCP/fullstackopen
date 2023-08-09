import LabeledInput from "./LabeledInput";

const Filter = ({ filter, setFilter }) => {
  return (
    <LabeledInput
      label="filter for"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default Filter;
