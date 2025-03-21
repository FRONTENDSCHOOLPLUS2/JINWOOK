import Button from "@components/Button";
import useFetch from "@hooks/useFetch";
import useMutation from "@hooks/useMutation";
import CommentList from "@pages/community/CommentList";
import { userState } from "@recoil/user/atoms";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PostDetail } from "types/community";

function Detail() {
  const navigate = useNavigate();
  const { type, _id } = useParams();
  const { data } = useFetch<PostDetail>(`/posts/${_id}`);
  const { send } = useMutation(`/posts/${_id}`, {
    method: "DELETE",
  });
  const user = useRecoilValue(userState);

  const handleDelete = async () => {
    try {
      await send({
        headers: {
          Authorization: `Bearer ${user.token.accessToken}`,
        },
      });

      navigate(`/${type}`);
    } catch (err) {
      if (err instanceof TypeError) {
        console.error("네트워크 에러");
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  console.log(data);

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 : {data?.item.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {data?.item.user.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data?.item.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(-1)}>목록</Button>
          {user?._id === data?.item.user._id && (
            <>
              <Button
                bgColor="gray"
                onClick={() => navigate(`/${type}/${_id}/edit`)}
              >
                수정
              </Button>
              <Button bgColor="red" onClick={handleDelete}>
                삭제
              </Button>
            </>
          )}
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList postId={Number(_id)} />
    </main>
  );
}

export default Detail;
