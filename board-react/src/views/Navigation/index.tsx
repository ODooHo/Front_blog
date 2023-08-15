import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CatchingPokemonRoundedIcon from "@mui/icons-material/CatchingPokemonRounded";
import { useUserStore } from "../../stores";
import { useCookies } from "react-cookie";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "@mui/material";

interface NavigationProps {
  onMyPageClick: () => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  currentPage: string;
}

export default function Navigation({
  onMyPageClick,
  onHomeClick,
  onSearchClick,
  currentPage,
}: NavigationProps) {
  const { user, removeUser } = useUserStore();
  const [cookies, setCookies] = useCookies();
  const [isRotated, setIsRotated] = useState(false);

  const logOutHandler = () => {
    setCookies("token", "");
    setCookies("refreshToken", "");
    removeUser();
  };


  const handleButtonClick = () => {
    setIsRotated(!isRotated);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{backgroundColor : "#ffffff"}}
      >
        <Toolbar>
          <IconButton
            color="error"
            onClick={handleButtonClick}
            style={{
              transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease", // Adding transition for smooth animation
            }}
          >
            <CatchingPokemonRoundedIcon />
          </IconButton>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 ,color : "black" }}>
            Blog
          </Typography>
          {user ? (
            <>
              <IconButton

                onClick={() =>
                  currentPage === "search" ? onHomeClick() : onSearchClick()
                } // 검색 아이콘 클릭에 따라 페이지 이동
              >
                {currentPage === "search" ? <></> : <SearchIcon />}
              </IconButton>
              <Button
                href="#text-buttons"
                onClick={() => logOutHandler()}
              >
                로그아웃
              </Button>
              <Button
                href="#text-buttons"
                onClick={() =>
                  currentPage === "boardMain" ? onMyPageClick() : onHomeClick()
                } // 버튼 클릭에 따라 해당 함수 호출
              >
                {currentPage === "boardMain" ? "마이페이지" : "홈으로"}{" "}
              </Button>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
