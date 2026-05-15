export interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
}

export interface Slice<T> {
  content: T[];
  hasNext: boolean;
  nextCursor: Map<string, any>;
}