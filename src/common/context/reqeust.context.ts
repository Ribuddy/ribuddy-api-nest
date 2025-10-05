/**
 * Request 마다 가지고 있는 Context를 가지고 있는 Class 입니다.
 *
 * 현재는 traceId를 관리하는 용도로 사용합니다.
 */
export class RequestContext {
  private readonly traceId: string;
  private userId: bigint | null = null;

  constructor(traceId: string) {
    this.traceId = traceId;
  }

  public getTraceId(): string {
    return this.traceId;
  }

  public setUserId(userId: bigint) {
    this.userId = userId;
  }

  public getUserId(): bigint | null {
    return this.userId;
  }
}
