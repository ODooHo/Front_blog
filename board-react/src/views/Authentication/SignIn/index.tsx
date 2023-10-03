import { Box, Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import { signInApi } from "../../../apis/authApis";
interface Props {
  setAuthView: (authView: boolean) => void;
}

export default function SignIn(props: Props) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  //const [refreshToken, setRefreshToken] = useState<string>("");

  const [cookies, setCookies] = useCookies();
  const { user, setUser } = useUserStore();
  const { setAuthView } = props;

  const signInHandler = async () => {
    if (userEmail.length === 0 || userPassword.length === 0) {
      setEmailError(userEmail.length === 0);
      setPasswordError(userPassword.length === 0);
      setLoginError(true);
      return;
    }

    const data = {
      userEmail,
      userPassword,
    };

    const signInResponse = await signInApi(data);
    console.log(signInResponse)
    if (signInResponse.data == null) {
      setLoginError(true);
      return;
    }

    const { token, tokenExprTime, refreshToken,refreshExprTime ,user} = signInResponse.data;
    const tokenExpires = new Date();
    tokenExpires.setMilliseconds(tokenExpires.getMilliseconds() + tokenExprTime);

    const refreshExpires = new Date();
    refreshExpires.setMilliseconds(refreshExpires.getMilliseconds() + refreshExprTime);

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken',refreshToken);

    setUser(user);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: "50vw", padding: 5 ,borderRadius : "30px"}} >
      <Box>
        <Typography variant="h5">로그인</Typography>
      </Box>
      <Box height={"50vh"}>
        <TextField
          fullWidth
          label="이메일"
          type="email"
          variant="standard"
          error={emailError || loginError}
          helperText={loginError ? "" : ""}
          onChange={(e) => {
            setUserEmail(e.target.value);
            setEmailError(false);
            setLoginError(false);
          }}
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          variant="standard"
          error={passwordError || loginError}
          helperText={
            loginError ? "이메일 또는 비밀번호를 잘못 입력했습니다." : ""
          }
          onChange={(e) => {
            setUserPassword(e.target.value);
            setPasswordError(false);
            setLoginError(false);
          }}
        />
      </Box>
      <Box component="div">
        <Button
          color="inherit"
          sx={{ color: "white", backgroundColor: "black" }}
          fullWidth
          onClick={() => signInHandler()}
          variant="contained"
        >
          로그인
        </Button>
      </Box>
      <Box component="div" display="flex" mt={2}>
        <Typography>신규 사용자이신가요?</Typography>
        <Typography
          fontWeight={800}
          ml={1}
          onClick={() => setAuthView(true)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline", // Add underline effect on hover
            },
          }}
        >
          회원가입
        </Typography>
      </Box>
    </Card>
  );
}
