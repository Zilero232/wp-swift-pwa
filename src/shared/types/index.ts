export interface APIResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}
