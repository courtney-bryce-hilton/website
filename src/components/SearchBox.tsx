interface SearchBoxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Shown beside the input and announced politely, e.g. "3 of 40". */
  status?: string;
}

export function SearchBox({
  id,
  value,
  onChange,
  placeholder,
  status = "",
}: SearchBoxProps) {
  return (
    <div className="search">
      <input
        id={id}
        className="search__input"
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="search__count" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
