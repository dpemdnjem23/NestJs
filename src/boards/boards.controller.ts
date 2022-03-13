
import { Controller,Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import {Board} from './board.model'

@Controller('boards')
export class BoardsController {
    constructor(private boardService:BoardsService){}


    //GET POST PUT DELETE 가 았는데 request중
    //컨트롤러에서는~ @(데코레이터)를 이용해 받아준다.
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }
  

    
}
