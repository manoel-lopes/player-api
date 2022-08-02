export interface HttpRequest {
  body: any
}

export interface HttpResponse {
  status?(code: number): { json(body?: unknown): unknown }
  data?: unknown
}
