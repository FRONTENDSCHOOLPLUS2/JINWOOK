import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import useDebounce from "@hooks/useDebounce";
import useFetch from "@hooks/useFetch";
import ListItem from "@pages/community/ListItem";
import { userState } from "@recoil/user/atoms";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

function List() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const limit = 10;
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  // 디바운스
  const debouncedKeyword = useDebounce(keyword, 500);

  const { loading, data, error, refetch } = useFetch(
    `/posts?type=${type}&limit=${limit}&page=${page}&keyword=${keyword}`
  );

  useEffect(() => {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setKeyword("");
    refetch();
  }, [type]);

  useEffect(() => {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    refetch();
  }, [debouncedKeyword]);

  useEffect(() => {
    refetch();
  }, [page]);

  let boardTitle = "";

  switch (type) {
    case "info":
      boardTitle = "정보공유";
      break;
    case "post":
      boardTitle = "자유게시판";
      break;
    case "qna":
      boardTitle = "질문게시판";
      break;
    default:
      boardTitle = "정보공유";
  }

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {boardTitle}
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search keyword={keyword} setKeyword={setKeyword} />
        {user && (
          <Button onClick={() => navigate(`/${type}/new`)}>글작성</Button>
        )}
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 게시글이 없을 때 상태 표시 */}
            {data?.item.length === 0 && (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  게시글이 없습니다.
                </td>
              </tr>
            )}

            {/* 로딩 상태 표시 */}
            {loading && (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  로딩중...
                </td>
              </tr>
            )}

            {/* 에러 메세지 출력 */}
            {error && (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  에러 메세지
                </td>
              </tr>
            )}

            {/* 본문 출력 */}
            <ListItem data={data} type={type} />
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <Pagination type={type} totalPages={data?.pagination.totalPages} />
      </section>
    </main>
  );
}

export default List;
