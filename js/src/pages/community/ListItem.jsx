import { useNavigate } from "react-router-dom";

function ListItem({ data, type }) {
  const navigate = useNavigate();

  const items = data?.item.map((item) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
    >
      <td className="p-2 text-center">{item._id}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/${type}/${item._id}`)}
      >
        {item.title}
      </td>
      <td className="p-2 text-center truncate">{item.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">
        {item.repliesCount}
      </td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {item.createdAt}
      </td>
    </tr>
  ));

  return <>{items}</>;
}

export default ListItem;
