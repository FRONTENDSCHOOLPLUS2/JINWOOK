import Submit from "@components/Submit";
import { useRef } from "react";

function Search({ keyword, setKeyword }) {
  const inputRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setKeyword(inputRef.current.value);
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
