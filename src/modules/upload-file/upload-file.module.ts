import { ConflictException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';

@Module({
  imports: [
    MulterModule.register({
      // dest: './upload',
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
      fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpge|png|gif)$/))
          cb(new ConflictException('Format not allowed'), false);
        cb(null, true);
      },
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload');
        },
        filename: function (req, file, cb) {
          let filenameParts = file.originalname.split('.');
          filenameParts = filenameParts.slice(0, filenameParts.length - 1);
          const filename = filenameParts.join('.');

          if (file.mimetype) {
            const ext = file.mimetype.split('/')[1];
            cb(null, filename + '-' + Date.now() + '.' + ext);
          } else {
            cb(null, filename + '-' + Date.now());
          }
        },
      }),
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
