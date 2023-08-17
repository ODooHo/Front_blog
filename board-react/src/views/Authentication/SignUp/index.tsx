import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { signUpApi } from "../../../apis/authApis";

interface Props {
  setAuthView: (authView: boolean) => void;
}

export default function SignUp(props: Props) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userPasswordCheck, setUserPasswordCheck] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userAddressDetail, setUserAddressDetail] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<{
    userEmail?: string;
    userPassword?: string;
    userPasswordCheck?: string;
    userNickname?: string;
    userPhoneNumber?: string;
    userAddress?: string;
    userAddressDetail?: string;
  }>({});

  const { setAuthView } = props;

  const signUpHandler = async () => {
    const data = {
      userEmail,
      userPassword,
      userPasswordCheck,
      userNickname,
      userPhoneNumber,
      userAddress,
      userAddressDetail,
      userProfile: "default.jpg",
    };
    setErrorMessages({});

    let isValid = true;
    const newErrorMessages: typeof errorMessages = {};

    if (!userEmail) {
      newErrorMessages.userEmail = "이메일을 입력하세요.";
      isValid = false;
    }

    if (!userPassword) {
      newErrorMessages.userPassword = "비밀번호를 입력하세요.";
      isValid = false;
    }

    if (!userPasswordCheck) {
      newErrorMessages.userPasswordCheck = "비밀번호 확인을 입력하세요.";
      isValid = false;
    } else if (userPassword !== userPasswordCheck) {
      newErrorMessages.userPasswordCheck = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (!userNickname) {
      newErrorMessages.userNickname = "닉네임을 입력하세요.";
      isValid = false;
    }

    if (!userPhoneNumber) {
      newErrorMessages.userPhoneNumber= "휴대폰 번호를 입력하세요.";
      isValid = false;
    }

    if (!userAddress) {
      newErrorMessages.userAddress = "주소를 입력하세요.";
      isValid = false;
    }

    if (!userAddressDetail) {
      newErrorMessages.userAddressDetail = "상세주소를 입력하세요.";
      isValid = false;
    }


    if (!isValid) {
      setErrorMessages(newErrorMessages);
      return;
    }

    const signUpResponse = await signUpApi(data);
    if (!signUpResponse) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    if (signUpResponse.message === "Email already exist!"){
      newErrorMessages.userEmail = "이미 존재하는 이메일입니다."
      isValid = false;
    }else if(signUpResponse.message === "Nickname already exist!"){
      newErrorMessages.userNickname = "이미 존재하는 닉네임입니다."
      isValid = false;
    }

    if(!isValid) {
      setErrorMessages(newErrorMessages);
      return;      
    }

    alert("회원가입에 성공했습니다.");
    setAuthView(false);
  };

  return (
    <Card
      sx={{ minWidth: 275, maxWidth: "50vw", padding: 5, borderRadius: "30px" }}
    >
      <Box>
        <Typography variant="h5">회원가입</Typography>
      </Box>
      <Box height={"50vh"}>
        <TextField
          fullWidth
          label="이메일 주소"
          type="email"
          variant="standard"
          onChange={(e) => setUserEmail(e.target.value)}
          error={Boolean(errorMessages.userEmail)}
          helperText={errorMessages.userEmail}
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          variant="standard"
          onChange={(e) => setUserPassword(e.target.value)}
          error={Boolean(errorMessages.userPassword)}
          helperText={errorMessages.userPassword}
        />
        <TextField
          fullWidth
          label="비밀번호 확인"
          type="password"
          variant="standard"
          onChange={(e) => setUserPasswordCheck(e.target.value)}
          error={Boolean(errorMessages.userPasswordCheck)}
          helperText={errorMessages.userPasswordCheck}
        />
        <TextField
          fullWidth
          label="닉네임"
          variant="standard"
          onChange={(e) => setUserNickname(e.target.value)}
          error={Boolean(errorMessages.userNickname)}
          helperText={errorMessages.userNickname}
        />
        <TextField
          fullWidth
          label="휴대폰 번호"
          variant="standard"
          onChange={(e) => setUserPhoneNumber(e.target.value)}
          error={Boolean(errorMessages.userPhoneNumber)}
          helperText={errorMessages.userPhoneNumber}
        />
        <TextField
          fullWidth
          label="주소"
          variant="standard"
          onChange={(e) => setUserAddress(e.target.value)}
          error={Boolean(errorMessages.userAddress)}
          helperText={errorMessages.userAddress}
        />
        <TextField
          fullWidth
          label="상세 주소"
          variant="standard"
          onChange={(e) => setUserAddressDetail(e.target.value)}
          error={Boolean(errorMessages.userAddressDetail)}
          helperText={errorMessages.userAddressDetail}
        />
      </Box>
      <Box component="div">
        <Button fullWidth onClick={() => signUpHandler()} variant="contained" color="inherit" sx={{ color: "white", backgroundColor: "black" }}>
          회원가입
        </Button>
      </Box>
      <Box component="div" display="flex" mt={2}>
        <Typography>이미 계정이 있으신가요?</Typography>
        <Typography
          fontWeight={800}
          ml={1}
          onClick={() => setAuthView(false)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline", // Add underline effect on hover
            },
          }}
        >
          로그인
        </Typography>
      </Box>
    </Card>
  );
}
