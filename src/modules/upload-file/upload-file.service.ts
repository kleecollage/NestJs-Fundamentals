import { ConflictException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class UploadFileService {
  constructor() {}

  uploadFile(file: Express.Multer.File) {
    if (file) {
      const response = {
        originalName: file.originalname,
        filename: file.filename,
      };
      return response;
    }
    return null;
  }

  uploadFiles(files: Express.Multer.File[]) {
    const responses = [];
    for (const file of files) {
      const fileUpload = this.uploadFile(file);
      if (fileUpload) responses.push(fileUpload);
    }
    return responses;
  }

  downloadFiles(res, filename: string) {
    if (existsSync('./upload/' + filename))
      return res.download('./upload/' + filename);
    throw new ConflictException(`File: ${filename} not exists`);
  }
}
