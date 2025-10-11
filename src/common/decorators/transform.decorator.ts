import { Transform, TransformFnParams } from 'class-transformer';

/**
 * DTO의 문자열 속성을 bigint로 변환하는 커스텀 데코레이터입니다.
 * 값이 undefined, null인 경우 변환하지 않습니다.
 * each: true 옵션을 지원합니다.
 */
export function TransformToBigint(options?: {
  each?: boolean;
}): (target: any, key: string) => void {
  return Transform(({ value }: TransformFnParams) => {
    if (value === null || value === undefined) {
      return value;
    }

    if (options?.each && Array.isArray(value)) {
      return value.map((v) => {
        if (v === null || v === undefined) return v;
        try {
          return BigInt(v);
        } catch {
          return v;
        }
      });
    }

    try {
      // console.log('Transforming to BigInt:', value);
      return BigInt(value);
    } catch {
      return value;
    }
  });
}
