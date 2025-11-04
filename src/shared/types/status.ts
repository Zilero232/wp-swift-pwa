export interface FileStatus {
  name: string;
  description: string;
  exists: boolean;
  url: string | null;
  path: string;
  size: number | null;
  modified: number | null;
}

export interface HttpsStatus {
  enabled: boolean;
  site_url: string;
  message: string;
}

export interface StatusResponse {
  https: HttpsStatus;
  files: FileStatus[];
}
