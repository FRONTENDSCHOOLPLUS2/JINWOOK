import Submit from "@components/Submit";
import { useRef } from "react";

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
}

function Search({ keyword, setKeyword }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current) {
          setKeyword(inputRef.current.value);
        }
      }}
    >
      <input
        ref={inputRef}
        id="search"
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Submit>검색</Submit>
    </form>
  );
}

export default Search;
