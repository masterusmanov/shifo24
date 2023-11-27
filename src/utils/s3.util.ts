import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomBytes } from 'crypto';
// import sharp from 'sharp';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  private readonly s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  private generateFileName(bytes = 16) {
    return randomBytes(bytes).toString('hex');
  }

  async s3_upload(files) {
    // const fileBuffer = await sharp(file.buffer)
    //   .resize({ height: 1920, width: 1080, fit: 'contain' })
    //   .toBuffer();

    try {
      const uploadedFiles = [];

      for (let i = 0; i < files.length; i++) {
        const imageName =
          this.generateFileName() + `.${files[i].mimetype.split('/')[1]}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          Key: imageName,
          ContentType: files[i].mimetype,
        };

        await this.s3Client.send(new PutObjectCommand(uploadParams));

        uploadedFiles.push(
          `https://shifo-s3.s3.ap-south-1.amazonaws.com/${imageName}`,
        );
      }
      return uploadedFiles;
    } catch (e) {
      console.log(e);
    }
  }
}
