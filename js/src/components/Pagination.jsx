import { Link, useSearchParams } from "react-router-dom";

function Pagination({ type, totalPages }) {
  const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const links = arr.map((item) => {
    let selected = false;
    if (item === Number(page)) selected = true;

    return (
      <li
        key={item}
        className={`${
          selected ? "font-bold text-blue-700" : "text-base text-gray-700"
        } text-lg`}
      >
        <Link to={`/${type}?page=${item}`}>{item}</Link>
      </li>
    );
  });

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">{links}</ul>
    </div>
  );
}

export default Pagination;
