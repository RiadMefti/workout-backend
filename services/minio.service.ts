// src/config/minio.config.ts
import { Client } from "minio";

class MinioService {
  private static instance: MinioService;
  private client: Client;

  private constructor() {
    this.client = new Client({
      endPoint: (process.env.MINIO_API_URL || "").replace("https://", ""),
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY || "",
      secretKey: process.env.MINIO_SECRET_KEY || "",
    });
  }

  public static getInstance(): MinioService {
    if (!MinioService.instance) {
      MinioService.instance = new MinioService();
    }
    return MinioService.instance;
  }

  public getClient(): Client {
    return this.client;
  }

  public async testConnection(): Promise<void> {
    try {
      const bucketName = process.env.MINIO_BUCKET || "community";
      await this.client.bucketExists(bucketName);
      console.log("Successfully connected to MinIO");
    } catch (error) {
      console.error("MinIO connection test failed:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const minioService = MinioService.getInstance();
export const minioClient = minioService.getClient();
