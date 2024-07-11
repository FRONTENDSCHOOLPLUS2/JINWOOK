import CommentNew from "@pages/community/CommentNew";
import useFetch from "@hooks/useFetch";
import CommentItem from "@pages/community/CommentItem";
import { Replies } from "types/community";

function CommentList({ postId }: { postId: number }) {
  const { data, refetch } = useFetch<Replies>(`/posts/${postId}/replies`);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item.length}개</h4>
      {data && <CommentItem data={data} refetch={refetch} postId={postId} />}
      {/* 댓글 입력 */}
      <CommentNew refetch={refetch} postId={postId} />
    </section>
  );
}

export default CommentList;
