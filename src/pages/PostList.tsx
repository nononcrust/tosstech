import { useNavigate } from "@/router/react/hooks";

export const PostList = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h1>게시글 목록</h1>
      <button onClick={() => navigate("/posts/1")}>1번 게시글</button>
    </main>
  );
};
