import { Box } from "@mui/material";
import { useState } from "react";
import SearchMain from "./SearchMain";
import BoardDetail from "../BoardMain/BoardDetail";

export default function Search() {
  const [currentPage, setCurrentPage] = useState("SearchMain"); // 초기 페이지를 'boardMain'으로 설정합니다
  const [currentBoardId, setCurrentBoardId] = useState<number>(1); // 선택된 게시물의 ID를 상태로 관리

  const handleMainClick = () => {
    setCurrentPage("SearchMain");
  };

  const handleEditClick = (boardId: number) => {
    setCurrentPage("Edit");
    setCurrentBoardId(boardId);
  };

  const handleDetailClick = (boardId: number) => {
    setCurrentBoardId(boardId); // 선택한 게시물의 ID를 상태로 관리
    setCurrentPage("Detail"); // 페이지 전환을 Detail 페이지로 설정
  };

  return (
    <>
      {currentPage === "SearchMain" ? (
        <Box>
          <SearchMain
            onDetailClick={handleDetailClick}
            currentPage={currentPage}
            boardNumber={currentBoardId}
          />
        </Box>
      ) : (
        <BoardDetail
          onMainClick={handleMainClick}
          onEditClick={handleEditClick}
          currentPage={currentPage}
          boardNumber={currentBoardId}
        />
      )}
    </>
  );
}
