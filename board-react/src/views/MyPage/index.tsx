import { useState } from "react";
import Main from "./Main";
import WriteBoard from "./WriteBoard";
import PatchUser from "./PatchUser";
import BoardDetail from "../BoardMain/BoardDetail";
import ProfileChange from "./ProfileChange";
import BoardEdit from "../BoardMain/BoardEdit";

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState("Main"); // 초기 페이지를 'boardMain'으로 설정합니다
  const [currentBoardId, setCurrentBoardId] = useState<number>(1); // 선택된 게시물의 ID를 상태로 관리

  const handleWriteBoardClick = () => {
    setCurrentPage("WriteBoard");
  };
  const handlePatchUserClick = () => {
    setCurrentPage("PathUser");
  };

  const handleEditClick = (boardId: number) => {
    setCurrentPage("Edit");
    setCurrentBoardId(boardId);
  };

  const handleProfileClick = () => {
    setCurrentPage("Profile");
  };

  const handleMainClick = () => {
    setCurrentPage("Main");
  };

  const handleDetailClick = (boardId: number) => {
    setCurrentBoardId(boardId); // 선택한 게시물의 ID를 상태로 관리
    setCurrentPage("Detail"); // 페이지 전환을 Detail 페이지로 설정
  };

  return (
    <>
      {currentPage === "Main" ? (
        <Main
          onWriteBoardClick={handleWriteBoardClick}
          onPatchUserClick={handlePatchUserClick}
          onProfileClick={handleProfileClick}
          onDetailClick={handleDetailClick}
          currentPage={currentPage}
        />
      ) : currentPage === "WriteBoard" ? (
        <WriteBoard onMainClick={handleMainClick} currentPage={currentPage} />
      ) : currentPage === "Detail" ? (
        <BoardDetail
          onMainClick={handleMainClick}
          onEditClick={handleEditClick}
          currentPage={currentPage}
          boardNumber={currentBoardId}
        />
      ) : currentPage === "Edit" ? (
        <BoardEdit
          onMainClick={handleMainClick}
          onDetailClick={handleDetailClick}
          currentPage={currentPage}
          boardNumber={currentBoardId}
        />
      ) : currentPage === "Profile" ? (
        <ProfileChange
          onMainClick={handleMainClick}
          currentPage={currentPage}
        />
      ) : (
        <PatchUser onMainClick={handleMainClick} currentPage={currentPage} />
      )}
    </>
  );
}
