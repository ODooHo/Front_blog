import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { profileUploadApi } from "../../../apis/fileApis";

interface PatchUserProps {
  onMainClick: () => void;
  currentPage: string;
}

export default function ProfileChange({
  onMainClick,
  currentPage,
}: PatchUserProps) {
  const [userProfile, setUserProfile] = useState<File | null>(null);
  const [cookies] = useCookies();
  const token = localStorage.getItem('token');;
  const refreshToken = localStorage.getItem('refreshToken');;

  const ProfileChangeHandler = async () => {
    const data = new FormData();
    if (userProfile) {
      data.append("file", userProfile);
    }


    const patchUserResponse = await profileUploadApi(token, refreshToken, data);
    const result = patchUserResponse.data;

    console.log(result);
    if (!patchUserResponse) {
      alert("프로필 수정에 실패했습니다.");
      return;
    }


    alert("프로필 변경에 성공했습니다!");

    onMainClick();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setUserProfile(file || null);
    console.log(file);
  };

  return (
    <>
      <Box marginTop={"50px"} padding={5}>
        <Typography variant="h5" marginBottom={"10px"}>
          프로필 변경
        </Typography>
        <Card>
          <CardContent>
            <Button variant="contained" component="label">
              사진 첨부
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Button
        variant="contained"
        color="inherit"
        sx={{ margin: "10px", backgroundColor: "#000000", color: "#ffffff" }}
        onClick={ProfileChangeHandler}
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
