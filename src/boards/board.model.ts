export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus; //공개글과 비공개글 나눠주는것 이두개지의 상태만 나올수 있게 하기위해
  //enumeration을 이용
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
