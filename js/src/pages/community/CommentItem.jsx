import Button from "@components/Button";
import { userState } from "@recoil/user/atoms";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

function CommentItem({ data, refetch, postId }) {
  const user = useRecoilValue(userState);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/posts/${postId}/replies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("에러가 발생했습니다!");
      }

      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  const items = data?.item.map((item) => (
    <div key={item._id} className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={
            item.user.profile
              ? item.user.profile.path
                ? `${import.meta.env.VITE_API_SERVER}${item.user.profile.path}`
                : `${import.meta.env.VITE_API_SERVER}${item.user.profile}`
              : `${
                  import.meta.env.VITE_API_SERVER
                }/files/00-sample/XPTwYP2nb.png`
          }
          alt={`${item.user.name}`}
        />
        <Link to="" className="text-orange-400">
          {item.user.name}
        </Link>
        <time className="ml-auto text-gray-500" dateTime="2024.07.07 12:34:56">
          {item.createdAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
        {user._id === item.user._id && (
          <Button
            size="sm"
            bgColor="red"
            onClick={() => {
              handleDelete(item._id);
            }}
          >
            삭제
          </Button>
        )}
      </div>
    </div>
  ));

  return <>{items}</>;
}

export default CommentItem;
