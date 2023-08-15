import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
  } from "@mui/material";
  import  { useEffect, useState } from "react";
  import { useUserStore } from "../../../stores";
  import { useCookies } from "react-cookie";
  import { BoardApi, boardEditApi } from "../../../apis/boardApis";
import { Board } from "../../../interfaces";
  
  interface BoardEditProps {
    onMainClick:() => void;
    onDetailClick: (boardId:number) => void;
    currentPage: string;
    boardNumber : number;
  }
  export default function BoardEdit({
    onMainClick,
    onDetailClick,
    currentPage,
    boardNumber
  }: BoardEditProps) {
    const [boardData, setBoardData] = useState<Board | undefined>(undefined);
    const [boardTitle, setBoardTitle] = useState<string>("");
    const [boardContent, setBoardContent] = useState<string>("");

    const { user } = useUserStore();
    const [cookies] = useCookies();
    const token = localStorage.getItem('token');;
    const refreshToken = localStorage.getItem('refreshToken');;    

    useEffect(() => {
      async function fetchBoardData() {
        try {
          const response =await BoardApi(token, refreshToken,boardNumber);
          const data = response.data;
          setBoardData(data);
          setBoardTitle(data.boardTitle);
          setBoardContent(data.boardContent);
        } catch (error) {
          console.error("게시글 가져오기 실패:", error);
        }
      }
      fetchBoardData();
    }, [boardNumber, cookies.token]);
  
    const registerHandler = async () => {
        const token = localStorage.getItem('token');;
        const data = {
            boardTitle,
            boardContent,
            boardWriteDate : new Date().toISOString(),
        }
      
      const response = await boardEditApi(token, refreshToken, boardNumber,data);
  
  
      if (!response) {
        alert("게시글 수정에 실패했습니다.");
        return;
      }
  
      alert("게시글 작성에 성공했습니다!");
  
      onDetailClick(boardNumber);
      
    };
  
  
  
    return (
      <>
        <Card sx={{ padding: 5, marginTop: "50px" }}>
          <CardContent>
            <Typography variant="h5" marginBottom={"10px"}>게시물 수정</Typography>
            <TextField
              label="제목"
              fullWidth
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
            <Box marginTop="10px">
            <TextField
              label="내용"
              fullWidth
              multiline
              rows={6}
              value={boardContent}
              onChange={(e) => setBoardContent(e.target.value)}
            />
            </Box>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color="inherit"
          sx={{ margin: "10px", backgroundColor: "#000000", color: "#ffffff" }}
          onClick={registerHandler}
        >
          작성 완료
        </Button>
  
        <Button
          variant="contained"
          color="inherit"
          sx={{ margin: "10px", backgroundColor: "#ffffff", color: "#000000" }}
          onClick={onMainClick}
        >
          취소
        </Button>
      </>
    );
  }
  