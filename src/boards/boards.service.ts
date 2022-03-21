import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';

import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  //prvaite 를 사용하는 이유: 다른 컴포넌트에서 보드라는 배열 값을 수정을 할수 있는데,
  //그거를 차단하기 위함이다.
  //모든 게시물을 가져온다.
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find(); //boards배열에 들어있는 모든 값을 return(getallboards 함수 호출시)
  }
  
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    // if (!board) {
    //   throw new NotFoundException(`can't create`);
    // }
    await this.boardRepository.save(board);
    return board;
  }

  //게시물 생성
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(), //유니크한 값을 게시판의 아이디로 줄수 있다.
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    // if (!found) {
    //   throw new NotFoundException(`can't find`);
    // }
    return found;
  }

  // getBoardById(id: string): Board {
  //   const foundById = this.boards.find((board) => board.id === id);
  //   if (!foundById) {
  //     throw new NotFoundException(`Can't find Board with id${id}`);
  //   }
  //   return foundById;
  // }
  //return 값을 주지 않을때 void 활용

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    //삭제되지 않는경우
    if (result.affected === 0) {
      throw new NotFoundException(`cant'fin board with ${id}`);
    }

    console.log(result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
