import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { PatchUserApi } from "../../../apis/userApis";

interface PatchUserProps {
  onMainClick: () => void;
  currentPage: string;
}

export default function PatchUser({
  onMainClick,
  currentPage,
}: PatchUserProps) {
  const [userNickname, setUserNickname] = useState<string>("");
  const [userProfile] = useState<File | null>(null);
  const [cookies] = useCookies();
  const token = localStorage.getItem('token');;
  const refreshToken = localStorage.getItem('refreshToken');;

  const patchUserHandler = async () => {
    const data = {
      userNickname,
      userProfile,
    };


    const patchUserResponse = await PatchUserApi(token,refreshToken,data);
    if (!patchUserResponse) {
      alert("프로필 수정에 실패했습니다.");
      return;
    }

    alert("프로필 변경에 성공했습니다!");

    onMainClick();
  };

  return (
    <>
      <Box marginTop={"50px"} padding={5}>
        <Typography variant="h5" marginBottom={"10px"}>
          닉네임 변경
        </Typography>
        <Card>
          <CardContent>
            <TextField
              label="닉네임"
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
            />
            <Box marginTop={"10px"}></Box>
          </CardContent>
        </Card>
      </Box>
      <Button
        variant="contained"
        color="inherit"
        sx={{ margin: "10px", backgroundColor: "#000000", color: "#ffffff" }}
        onClick={patchUserHandler}
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
