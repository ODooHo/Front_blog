export interface Board {
    boardNumber: number;
    boardTitle: string;
    boardContent: string;
    boardImage: string;
    boardVideo: string;
    boardFile: string;
    boardWriterEmail: string;
    boardWriterProfile: string;
    boardWriterNickname: string;
    boardWriteDate: string;
    boardClickCount: number;
    boardLikeCount: number;
    boardCommentCount: number;
  }

  export interface BoardItemProps {
    board: Board;
    onClick: () => void; 
  }


  export interface Comment{
    commentId : number;
    boardNumber: number;
    userEmail : string;
    commentUserProfile: string;
    commentUserNickname: string;
    commentWriteDate: string;
    commentContent: string;
  }

  export interface Liky{
    likyId : number;
    boardNumber : number;
    userEmail : string;
    likeUserProfile : string;
    likeUserNickname : string;
  }

  export interface PopularSearchList{
    popularTerm : string;
    popularSearchCount : number;
  }