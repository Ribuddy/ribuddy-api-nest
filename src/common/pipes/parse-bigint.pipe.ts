import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**
 * 경로 매개변수나 쿼리 문자열을 'bigint' 타입으로 변환하고 검증합니다.
 * 유효한 숫자 형식이 아닐 경우 BadRequestException을 발생시킵니다.
 */
@Injectable()
export class ParseBigIntPipe implements PipeTransform<string, bigint> {
  transform(value: string, metadata: ArgumentMetadata): bigint {
    try {
      // 1. BigInt() 생성자를 사용해 변환을 시도합니다.
      const bigIntValue = BigInt(value);
      return bigIntValue;
    } catch (error) {
      // 2. 변환에 실패하면 (예: "abc", "12.3") 에러를 던집니다.
      throw new BadRequestException(`Validation failed: '${value}' cannot be parsed as a BigInt.`);
    }
  }
}
