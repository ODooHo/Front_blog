import { useEffect, useState } from "react";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { Board } from "../../../interfaces";
import { useCookies } from "react-cookie";
import { MyPageApi } from "../../../apis/userApis";
import { getImageApi, getProfileApi } from "../../../apis/fileApis";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
// 인터페이스를 정의합니다.

interface MainProps {
  onWriteBoardClick: () => void;
  onPatchUserClick: () => void;
  onProfileClick: () => void;
  onDetailClick: (boardId: number) => void;
  currentPage: string;
}

export default function Main({
  onWriteBoardClick,
  onPatchUserClick,
  onProfileClick,
  onDetailClick,
  currentPage,
}: MainProps) {
  // authView : true - signUp / false - signIn
  const [boardData, setBoardData] = useState<Board[]>([]); // 인터페이스를 적용하여 배열의 요소를 정확히 타입화합니다.
  const [userNickname, setUserNickname] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [cookies] = useCookies();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await MyPageApi(token, refreshToken);
        const Nickname = response.data.userNickname;
        const Profile = response.data.userProfile;
        const data = response.data.userBoard;
        const Email = response.data.userEmail;
        if (data) {
          setUserEmail(userEmail);
          setBoardData(data);
          setUserNickname(Nickname);
          setUserProfile(Profile);

          // 프로필 이미지를 가져와서 상태에 저장합니다.
          const profileImageUrl = await getProfileApi(
            token,
            refreshToken,
            Email
          );
          setProfileImageUrl(profileImageUrl);
        } else {
          setUserEmail("");
          setBoardData([]);
          setUserNickname("");
          setUserProfile("");
        }
      } catch (error) {
        console.error("게시글 가져오기 실패:", error);
        setBoardData([]);
      }
    }
    fetchData();
  }, [cookies.token]);

  const defaultImage = "default-image.png";

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Box
          marginTop="65px"
          marginBottom="10px"
          display="flex"
          sx={{ backgroundColor: "white" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            marginBottom="20px"
            marginLeft="30px"
          >
            <Box
              width={100}
              height={100}
              borderRadius="50%"
              overflow="hidden"
              mx={1} // 수정: 이미지 좌우 여백을 위해 mx를 사용합니다.
              marginRight="18px"
            >
              <img
                src={profileImageUrl || defaultImage}
                width="100%"
                height="100%"
              />
            </Box>
            <Typography variant="h5">{userNickname}</Typography>
            <IconButton color="inherit" onClick={onPatchUserClick}>
              <EditIcon />
            </IconButton>
          </Box>
          <IconButton color="inherit" onClick={onProfileClick}>
            <PersonIcon />
          </IconButton>
        </Box>

        <Box width="100vw">
          <Card
            elevation={0}
            sx={{
              height: "200vh",
              padding: 5,
              marginBottom: "10px",
              backgroundColor: "#FAFAFA",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginLeft="10px"
              marginRight="10px"
            >
              <Typography variant="h5" sx={{ flex: 1 }}>
                내 게시물
              </Typography>
              <Button
                variant="contained"
                color="inherit"
                sx={{
                  flex: "none",
                  width: "300px",
                  height: "50px",
                  marginRight: "10%",
                  backgroundColor: "white",
                }}
                onClick={() => onWriteBoardClick()}
              >
                <EditIcon sx={{ width: "40px" }} />
                글쓰기
              </Button>
            </Box>

            <Box
              width={"50vw"}
              height={"70vh"}
              display="flex"
              flexDirection="column"
              borderRadius={"30px"}
              padding={3}
            >
              <Box flex="1" overflow="auto">
                {boardData.length === 0 ? (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    게시물이 없습니다.
                  </Typography>
                ) : (
                  boardData.map((board) => (
                    <div key={board.boardNumber}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="inherit"
                        sx={{
                          my: 2,
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                          padding: 2,
                          backgroundColor: 'white',
                        }}
                        onClick={() => onDetailClick(board.boardNumber)}
                      >
                        <Box
                          display="flex"
                          width="100%"
                          justifyContent="flex-start"
                        >
                          <Box display="flex" alignItems="flex-start">
                            <Box
                              width={35}
                              height={35}
                              borderRadius="50%"
                              overflow="hidden"
                              mr={1} // 이미지와 닉네임 사이의 간격을 설정합니다.
                            >
                              <img
                                src={profileImageUrl || defaultImage}
                                width="100%"
                                height="100%"
                              />
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start"
                            >
                              <Typography
                                variant="body1"
                                gutterBottom
                                marginBottom="2px"
                              >
                                {board.boardWriterNickname}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                marginBottom="3px"
                              >
                                {board.boardWriteDate}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.2rem", // 원하는 글꼴 크기 설정 (예: 1.2rem)
                          }}
                        >
                          {board.boardTitle}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mt: 1 ,textAlign: "left"}}
                        >
                          {board.boardContent.slice(0, 80)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          조회수: {board.boardClickCount} 좋아요:{" "}
                          {board.boardLikeCount} 댓글: {board.boardCommentCount}
                        </Typography>
                      </Button>
                    </div>
                  ))
                )}
                <></>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}
