import {
  Body,
  Controller,
  Post,
  Response,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadFileService } from 'src/modules/upload-file/upload-file.service';

@Controller('api/v1/uploads')
@ApiTags('Uploads')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}
  //** ------------------------------ UPLOAD FILE  ------------------------------**//
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    description: 'Upload one file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File upload successfully',
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFileService.uploadFile(file);
  }
  //** ------------------------------ UPLOAD MULTIPLE FILES  ------------------------------**//
  @Post('upload-files')
  @ApiOperation({
    description: 'Upload multiple files at once',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Files upload successfully',
  })
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadFileService.uploadFiles(files);
  }
  //** ------------------------------ DOWNLOAD FILE  ------------------------------**//
  @Post('download')
  @ApiOperation({
    description: 'Download one file',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        filename: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Files download successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Files not exists',
  })
  downloadFiles(@Response() res, @Body() body: any) {
    return this.uploadFileService.downloadFiles(res, body.filename);
  }
}
