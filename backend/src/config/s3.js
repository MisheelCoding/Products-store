import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.YANDEX_REGION,
  endpoint: process.env.YANDEX_ENDPOINT,
  credentials: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY,
    secretAccessKey: process.env.YANDEX_SECRET_KEY,
  },
});
