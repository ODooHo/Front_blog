import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Board } from "../../../interfaces";
import { useCookies } from "react-cookie";
import { SearchBoardApi } from "../../../apis/searchApis";
import PopularSearch from "../PolularSearch";
import { Grid } from "@mui/material";
import { getProfileApi } from "../../../apis/fileApis";

interface SearchMainProps {
  onDetailClick: (boardId: number) => void;
  currentPage: string;
  boardNumber: number;
}

export default function SearchMain({
  onDetailClick,
  currentPage,
  boardNumber,
}: SearchMainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Board[]>([]);
  const [cookies] = useCookies();
  const [profileImages, setProfileImages] = useState<{
    [key: number]: string | null;
  }>({});
  const token = localStorage.getItem('token');;
  const refreshToken = localStorage.getItem('refreshToken');;

  useEffect(() => {
    async function fetchImages() {
      try {
        // Fetch profile images for all boards
        const imagePromises = searchResults.map(async (board) => {
          const imageUrl = await getProfileApi(
            token,
            refreshToken,
            board.boardWriterProfile,
          );
          return { [board.boardNumber]: imageUrl };
        });

        // Wait for all image promises to resolve
        const imageResults = await Promise.all(imagePromises);

        // Combine all image URLs into a single object
        const images = imageResults.reduce((acc, image) => {
          return { ...acc, ...image };
        }, {});

        setProfileImages(images);
      } catch (error) {
        console.error("Error fetching profile images:", error);
      }
    }

    fetchImages();
  }, [searchResults, cookies.token]);

  const handleSearch = async () => {
    const token = localStorage.getItem('token');;
    const data = {
      popularTerm: searchQuery,
    };
    try {
      const response = await SearchBoardApi(token, refreshToken, data);
      const responseData = response.data;
      setSearchResults(responseData);
      if (!response) {
        console.error("검색 실패!");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("검색 실패!", error);
      setSearchResults([]);
    }
  };

  const handleSearchClick = async (searchTerm: string) => {

    const data = {
      popularTerm: searchTerm,
    };
    try {
      // 검색 결과를 가져오는 API를 호출하고, 검색어를 파라미터로 전달합니다.
      const response = await SearchBoardApi(token, refreshToken, data);
      const searchData = response.data;
      setSearchResults(searchData); // 예시: 검색 결과를 state에 저장하는 경우
      if (!response) {
        console.error("검색 실패!");
        setSearchResults([]);
      }
      // 예시: 검색 결과를 이동하는 로직
      // onDetailClick 함수를 호출하여 해당 검색 결과를 보여주는 페이지로 이동합니다.
      // onDetailClick(searchData.boardId);
    } catch (error) {
      console.error("검색 실패:", error);
      setSearchResults([]);
    }
  };
  const defaultImage = "default-image.png"

  return (
    <>
      <Box marginTop="50px" sx={{ padding: 2}}>
        <Card elevation={0} sx={{backgroundColor : "#FAFAFA"}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              검색
            </Typography>
            <TextField
              fullWidth
              onChange={(e) => setSearchQuery(e.target.value)}
              label="검색어를 입력하세요"
              variant="outlined"
              sx={{ mb: 2, mt: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              검색
            </Button>
            {searchResults.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Card
                      elevation={0}
                      sx={{
                        minWidth: 300,
                        maxWidth: "40vw",
                        padding: 5,
                        marginTop: "100px",
                        marginLeft: "30px",
                        backgroundColor:"#FAFAFA"
                      }}
                    >
                      <Box
                        height={"50vh"}
                        display="flex"
                        flexDirection="column"
                      >
                        <Box flex="1" overflow="auto">
                          {searchResults.map((board) => (
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
                                  backgroundColor:"white",
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
                                        src={
                                          profileImages[board.boardNumber] ||
                                          defaultImage
                                        }
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
                                        marginBottom="3px"
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
                                  {board.boardLikeCount} 댓글:{" "}
                                  {board.boardCommentCount}
                                </Typography>
                              </Button>
                            </div>
                          ))}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <PopularSearch onSearchClick={handleSearchClick} />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Box display="flex" justifyContent={"space-between"}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    검색 결과가 없습니다.
                  </Typography>
                  <PopularSearch onSearchClick={handleSearchClick} />
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
