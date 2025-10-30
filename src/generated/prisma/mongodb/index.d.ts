
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model GeoPoint
 * 
 */
export type GeoPoint = $Result.DefaultSelection<Prisma.$GeoPointPayload>
/**
 * Model RidingRecord
 * 
 */
export type RidingRecord = $Result.DefaultSelection<Prisma.$RidingRecordPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RidingRecordStatus: {
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED'
};

export type RidingRecordStatus = (typeof RidingRecordStatus)[keyof typeof RidingRecordStatus]

}

export type RidingRecordStatus = $Enums.RidingRecordStatus

export const RidingRecordStatus: typeof $Enums.RidingRecordStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RidingRecords
 * const ridingRecords = await prisma.ridingRecord.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RidingRecords
   * const ridingRecords = await prisma.ridingRecord.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.ridingRecord`: Exposes CRUD operations for the **RidingRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RidingRecords
    * const ridingRecords = await prisma.ridingRecord.findMany()
    * ```
    */
  get ridingRecord(): Prisma.RidingRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RidingRecord: 'RidingRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "ridingRecord"
      txIsolationLevel: never
    }
    model: {
      RidingRecord: {
        payload: Prisma.$RidingRecordPayload<ExtArgs>
        fields: Prisma.RidingRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RidingRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RidingRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>
          }
          findFirst: {
            args: Prisma.RidingRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RidingRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>
          }
          findMany: {
            args: Prisma.RidingRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>[]
          }
          create: {
            args: Prisma.RidingRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>
          }
          createMany: {
            args: Prisma.RidingRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RidingRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>
          }
          update: {
            args: Prisma.RidingRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>
          }
          deleteMany: {
            args: Prisma.RidingRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RidingRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RidingRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RidingRecordPayload>
          }
          aggregate: {
            args: Prisma.RidingRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRidingRecord>
          }
          groupBy: {
            args: Prisma.RidingRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<RidingRecordGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.RidingRecordFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.RidingRecordAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.RidingRecordCountArgs<ExtArgs>
            result: $Utils.Optional<RidingRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    ridingRecord?: RidingRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model GeoPoint
   */





  export type GeoPointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    type?: boolean
    coordinates?: boolean
    timestamp?: boolean
    name?: boolean
  }, ExtArgs["result"]["geoPoint"]>



  export type GeoPointSelectScalar = {
    type?: boolean
    coordinates?: boolean
    timestamp?: boolean
    name?: boolean
  }

  export type GeoPointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"type" | "coordinates" | "timestamp" | "name", ExtArgs["result"]["geoPoint"]>

  export type $GeoPointPayload = {
    name: "GeoPoint"
    objects: {}
    scalars: {
      type: string
      coordinates: number[]
      timestamp: Date | null
      name: string | null
    }
    composites: {}
  }

  type GeoPointGetPayload<S extends boolean | null | undefined | GeoPointDefaultArgs> = $Result.GetResult<Prisma.$GeoPointPayload, S>





  /**
   * Fields of the GeoPoint model
   */
  interface GeoPointFieldRefs {
    readonly type: FieldRef<"GeoPoint", 'String'>
    readonly coordinates: FieldRef<"GeoPoint", 'Float[]'>
    readonly timestamp: FieldRef<"GeoPoint", 'DateTime'>
    readonly name: FieldRef<"GeoPoint", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GeoPoint without action
   */
  export type GeoPointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeoPoint
     */
    select?: GeoPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GeoPoint
     */
    omit?: GeoPointOmit<ExtArgs> | null
  }


  /**
   * Model RidingRecord
   */

  export type AggregateRidingRecord = {
    _count: RidingRecordCountAggregateOutputType | null
    _min: RidingRecordMinAggregateOutputType | null
    _max: RidingRecordMaxAggregateOutputType | null
  }

  export type RidingRecordMinAggregateOutputType = {
    id: string | null
    recordOwnerId: string | null
    teamId: string | null
    status: $Enums.RidingRecordStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RidingRecordMaxAggregateOutputType = {
    id: string | null
    recordOwnerId: string | null
    teamId: string | null
    status: $Enums.RidingRecordStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RidingRecordCountAggregateOutputType = {
    id: number
    recordOwnerId: number
    participants: number
    teamId: number
    departToArrival: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RidingRecordMinAggregateInputType = {
    id?: true
    recordOwnerId?: true
    teamId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RidingRecordMaxAggregateInputType = {
    id?: true
    recordOwnerId?: true
    teamId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RidingRecordCountAggregateInputType = {
    id?: true
    recordOwnerId?: true
    participants?: true
    teamId?: true
    departToArrival?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RidingRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RidingRecord to aggregate.
     */
    where?: RidingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RidingRecords to fetch.
     */
    orderBy?: RidingRecordOrderByWithRelationInput | RidingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RidingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RidingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RidingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RidingRecords
    **/
    _count?: true | RidingRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RidingRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RidingRecordMaxAggregateInputType
  }

  export type GetRidingRecordAggregateType<T extends RidingRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateRidingRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRidingRecord[P]>
      : GetScalarType<T[P], AggregateRidingRecord[P]>
  }




  export type RidingRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RidingRecordWhereInput
    orderBy?: RidingRecordOrderByWithAggregationInput | RidingRecordOrderByWithAggregationInput[]
    by: RidingRecordScalarFieldEnum[] | RidingRecordScalarFieldEnum
    having?: RidingRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RidingRecordCountAggregateInputType | true
    _min?: RidingRecordMinAggregateInputType
    _max?: RidingRecordMaxAggregateInputType
  }

  export type RidingRecordGroupByOutputType = {
    id: string
    recordOwnerId: string
    participants: string[]
    teamId: string | null
    departToArrival: string[]
    status: $Enums.RidingRecordStatus
    createdAt: Date
    updatedAt: Date
    _count: RidingRecordCountAggregateOutputType | null
    _min: RidingRecordMinAggregateOutputType | null
    _max: RidingRecordMaxAggregateOutputType | null
  }

  type GetRidingRecordGroupByPayload<T extends RidingRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RidingRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RidingRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RidingRecordGroupByOutputType[P]>
            : GetScalarType<T[P], RidingRecordGroupByOutputType[P]>
        }
      >
    >


  export type RidingRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    route?: boolean | GeoPointDefaultArgs<ExtArgs>
    recordOwnerId?: boolean
    participants?: boolean
    teamId?: boolean
    departToArrival?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ridingRecord"]>



  export type RidingRecordSelectScalar = {
    id?: boolean
    recordOwnerId?: boolean
    participants?: boolean
    teamId?: boolean
    departToArrival?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RidingRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "route" | "recordOwnerId" | "participants" | "teamId" | "departToArrival" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["ridingRecord"]>
  export type RidingRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RidingRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RidingRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      recordOwnerId: string
      participants: string[]
      teamId: string | null
      departToArrival: string[]
      status: $Enums.RidingRecordStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ridingRecord"]>
    composites: {
      route: Prisma.$GeoPointPayload[]
    }
  }

  type RidingRecordGetPayload<S extends boolean | null | undefined | RidingRecordDefaultArgs> = $Result.GetResult<Prisma.$RidingRecordPayload, S>

  type RidingRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RidingRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RidingRecordCountAggregateInputType | true
    }

  export interface RidingRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RidingRecord'], meta: { name: 'RidingRecord' } }
    /**
     * Find zero or one RidingRecord that matches the filter.
     * @param {RidingRecordFindUniqueArgs} args - Arguments to find a RidingRecord
     * @example
     * // Get one RidingRecord
     * const ridingRecord = await prisma.ridingRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RidingRecordFindUniqueArgs>(args: SelectSubset<T, RidingRecordFindUniqueArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RidingRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RidingRecordFindUniqueOrThrowArgs} args - Arguments to find a RidingRecord
     * @example
     * // Get one RidingRecord
     * const ridingRecord = await prisma.ridingRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RidingRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, RidingRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RidingRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordFindFirstArgs} args - Arguments to find a RidingRecord
     * @example
     * // Get one RidingRecord
     * const ridingRecord = await prisma.ridingRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RidingRecordFindFirstArgs>(args?: SelectSubset<T, RidingRecordFindFirstArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RidingRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordFindFirstOrThrowArgs} args - Arguments to find a RidingRecord
     * @example
     * // Get one RidingRecord
     * const ridingRecord = await prisma.ridingRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RidingRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, RidingRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RidingRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RidingRecords
     * const ridingRecords = await prisma.ridingRecord.findMany()
     * 
     * // Get first 10 RidingRecords
     * const ridingRecords = await prisma.ridingRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ridingRecordWithIdOnly = await prisma.ridingRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RidingRecordFindManyArgs>(args?: SelectSubset<T, RidingRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RidingRecord.
     * @param {RidingRecordCreateArgs} args - Arguments to create a RidingRecord.
     * @example
     * // Create one RidingRecord
     * const RidingRecord = await prisma.ridingRecord.create({
     *   data: {
     *     // ... data to create a RidingRecord
     *   }
     * })
     * 
     */
    create<T extends RidingRecordCreateArgs>(args: SelectSubset<T, RidingRecordCreateArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RidingRecords.
     * @param {RidingRecordCreateManyArgs} args - Arguments to create many RidingRecords.
     * @example
     * // Create many RidingRecords
     * const ridingRecord = await prisma.ridingRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RidingRecordCreateManyArgs>(args?: SelectSubset<T, RidingRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RidingRecord.
     * @param {RidingRecordDeleteArgs} args - Arguments to delete one RidingRecord.
     * @example
     * // Delete one RidingRecord
     * const RidingRecord = await prisma.ridingRecord.delete({
     *   where: {
     *     // ... filter to delete one RidingRecord
     *   }
     * })
     * 
     */
    delete<T extends RidingRecordDeleteArgs>(args: SelectSubset<T, RidingRecordDeleteArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RidingRecord.
     * @param {RidingRecordUpdateArgs} args - Arguments to update one RidingRecord.
     * @example
     * // Update one RidingRecord
     * const ridingRecord = await prisma.ridingRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RidingRecordUpdateArgs>(args: SelectSubset<T, RidingRecordUpdateArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RidingRecords.
     * @param {RidingRecordDeleteManyArgs} args - Arguments to filter RidingRecords to delete.
     * @example
     * // Delete a few RidingRecords
     * const { count } = await prisma.ridingRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RidingRecordDeleteManyArgs>(args?: SelectSubset<T, RidingRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RidingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RidingRecords
     * const ridingRecord = await prisma.ridingRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RidingRecordUpdateManyArgs>(args: SelectSubset<T, RidingRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RidingRecord.
     * @param {RidingRecordUpsertArgs} args - Arguments to update or create a RidingRecord.
     * @example
     * // Update or create a RidingRecord
     * const ridingRecord = await prisma.ridingRecord.upsert({
     *   create: {
     *     // ... data to create a RidingRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RidingRecord we want to update
     *   }
     * })
     */
    upsert<T extends RidingRecordUpsertArgs>(args: SelectSubset<T, RidingRecordUpsertArgs<ExtArgs>>): Prisma__RidingRecordClient<$Result.GetResult<Prisma.$RidingRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RidingRecords that matches the filter.
     * @param {RidingRecordFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const ridingRecord = await prisma.ridingRecord.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: RidingRecordFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a RidingRecord.
     * @param {RidingRecordAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const ridingRecord = await prisma.ridingRecord.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: RidingRecordAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of RidingRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordCountArgs} args - Arguments to filter RidingRecords to count.
     * @example
     * // Count the number of RidingRecords
     * const count = await prisma.ridingRecord.count({
     *   where: {
     *     // ... the filter for the RidingRecords we want to count
     *   }
     * })
    **/
    count<T extends RidingRecordCountArgs>(
      args?: Subset<T, RidingRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RidingRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RidingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RidingRecordAggregateArgs>(args: Subset<T, RidingRecordAggregateArgs>): Prisma.PrismaPromise<GetRidingRecordAggregateType<T>>

    /**
     * Group by RidingRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RidingRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RidingRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RidingRecordGroupByArgs['orderBy'] }
        : { orderBy?: RidingRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RidingRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRidingRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RidingRecord model
   */
  readonly fields: RidingRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RidingRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RidingRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RidingRecord model
   */
  interface RidingRecordFieldRefs {
    readonly id: FieldRef<"RidingRecord", 'String'>
    readonly recordOwnerId: FieldRef<"RidingRecord", 'String'>
    readonly participants: FieldRef<"RidingRecord", 'String[]'>
    readonly teamId: FieldRef<"RidingRecord", 'String'>
    readonly departToArrival: FieldRef<"RidingRecord", 'String[]'>
    readonly status: FieldRef<"RidingRecord", 'RidingRecordStatus'>
    readonly createdAt: FieldRef<"RidingRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"RidingRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RidingRecord findUnique
   */
  export type RidingRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * Filter, which RidingRecord to fetch.
     */
    where: RidingRecordWhereUniqueInput
  }

  /**
   * RidingRecord findUniqueOrThrow
   */
  export type RidingRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * Filter, which RidingRecord to fetch.
     */
    where: RidingRecordWhereUniqueInput
  }

  /**
   * RidingRecord findFirst
   */
  export type RidingRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * Filter, which RidingRecord to fetch.
     */
    where?: RidingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RidingRecords to fetch.
     */
    orderBy?: RidingRecordOrderByWithRelationInput | RidingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RidingRecords.
     */
    cursor?: RidingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RidingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RidingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RidingRecords.
     */
    distinct?: RidingRecordScalarFieldEnum | RidingRecordScalarFieldEnum[]
  }

  /**
   * RidingRecord findFirstOrThrow
   */
  export type RidingRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * Filter, which RidingRecord to fetch.
     */
    where?: RidingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RidingRecords to fetch.
     */
    orderBy?: RidingRecordOrderByWithRelationInput | RidingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RidingRecords.
     */
    cursor?: RidingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RidingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RidingRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RidingRecords.
     */
    distinct?: RidingRecordScalarFieldEnum | RidingRecordScalarFieldEnum[]
  }

  /**
   * RidingRecord findMany
   */
  export type RidingRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * Filter, which RidingRecords to fetch.
     */
    where?: RidingRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RidingRecords to fetch.
     */
    orderBy?: RidingRecordOrderByWithRelationInput | RidingRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RidingRecords.
     */
    cursor?: RidingRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RidingRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RidingRecords.
     */
    skip?: number
    distinct?: RidingRecordScalarFieldEnum | RidingRecordScalarFieldEnum[]
  }

  /**
   * RidingRecord create
   */
  export type RidingRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a RidingRecord.
     */
    data: XOR<RidingRecordCreateInput, RidingRecordUncheckedCreateInput>
  }

  /**
   * RidingRecord createMany
   */
  export type RidingRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RidingRecords.
     */
    data: RidingRecordCreateManyInput | RidingRecordCreateManyInput[]
  }

  /**
   * RidingRecord update
   */
  export type RidingRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a RidingRecord.
     */
    data: XOR<RidingRecordUpdateInput, RidingRecordUncheckedUpdateInput>
    /**
     * Choose, which RidingRecord to update.
     */
    where: RidingRecordWhereUniqueInput
  }

  /**
   * RidingRecord updateMany
   */
  export type RidingRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RidingRecords.
     */
    data: XOR<RidingRecordUpdateManyMutationInput, RidingRecordUncheckedUpdateManyInput>
    /**
     * Filter which RidingRecords to update
     */
    where?: RidingRecordWhereInput
    /**
     * Limit how many RidingRecords to update.
     */
    limit?: number
  }

  /**
   * RidingRecord upsert
   */
  export type RidingRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the RidingRecord to update in case it exists.
     */
    where: RidingRecordWhereUniqueInput
    /**
     * In case the RidingRecord found by the `where` argument doesn't exist, create a new RidingRecord with this data.
     */
    create: XOR<RidingRecordCreateInput, RidingRecordUncheckedCreateInput>
    /**
     * In case the RidingRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RidingRecordUpdateInput, RidingRecordUncheckedUpdateInput>
  }

  /**
   * RidingRecord delete
   */
  export type RidingRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
    /**
     * Filter which RidingRecord to delete.
     */
    where: RidingRecordWhereUniqueInput
  }

  /**
   * RidingRecord deleteMany
   */
  export type RidingRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RidingRecords to delete
     */
    where?: RidingRecordWhereInput
    /**
     * Limit how many RidingRecords to delete.
     */
    limit?: number
  }

  /**
   * RidingRecord findRaw
   */
  export type RidingRecordFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * RidingRecord aggregateRaw
   */
  export type RidingRecordAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * RidingRecord without action
   */
  export type RidingRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RidingRecord
     */
    select?: RidingRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RidingRecord
     */
    omit?: RidingRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RidingRecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const RidingRecordScalarFieldEnum: {
    id: 'id',
    recordOwnerId: 'recordOwnerId',
    participants: 'participants',
    teamId: 'teamId',
    departToArrival: 'departToArrival',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RidingRecordScalarFieldEnum = (typeof RidingRecordScalarFieldEnum)[keyof typeof RidingRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'RidingRecordStatus'
   */
  export type EnumRidingRecordStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RidingRecordStatus'>
    


  /**
   * Reference to a field of type 'RidingRecordStatus[]'
   */
  export type ListEnumRidingRecordStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RidingRecordStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type RidingRecordWhereInput = {
    AND?: RidingRecordWhereInput | RidingRecordWhereInput[]
    OR?: RidingRecordWhereInput[]
    NOT?: RidingRecordWhereInput | RidingRecordWhereInput[]
    id?: StringFilter<"RidingRecord"> | string
    route?: GeoPointCompositeListFilter | GeoPointObjectEqualityInput[]
    recordOwnerId?: StringFilter<"RidingRecord"> | string
    participants?: StringNullableListFilter<"RidingRecord">
    teamId?: StringNullableFilter<"RidingRecord"> | string | null
    departToArrival?: StringNullableListFilter<"RidingRecord">
    status?: EnumRidingRecordStatusFilter<"RidingRecord"> | $Enums.RidingRecordStatus
    createdAt?: DateTimeFilter<"RidingRecord"> | Date | string
    updatedAt?: DateTimeFilter<"RidingRecord"> | Date | string
  }

  export type RidingRecordOrderByWithRelationInput = {
    id?: SortOrder
    route?: GeoPointOrderByCompositeAggregateInput
    recordOwnerId?: SortOrder
    participants?: SortOrder
    teamId?: SortOrder
    departToArrival?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RidingRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RidingRecordWhereInput | RidingRecordWhereInput[]
    OR?: RidingRecordWhereInput[]
    NOT?: RidingRecordWhereInput | RidingRecordWhereInput[]
    route?: GeoPointCompositeListFilter | GeoPointObjectEqualityInput[]
    recordOwnerId?: StringFilter<"RidingRecord"> | string
    participants?: StringNullableListFilter<"RidingRecord">
    teamId?: StringNullableFilter<"RidingRecord"> | string | null
    departToArrival?: StringNullableListFilter<"RidingRecord">
    status?: EnumRidingRecordStatusFilter<"RidingRecord"> | $Enums.RidingRecordStatus
    createdAt?: DateTimeFilter<"RidingRecord"> | Date | string
    updatedAt?: DateTimeFilter<"RidingRecord"> | Date | string
  }, "id">

  export type RidingRecordOrderByWithAggregationInput = {
    id?: SortOrder
    recordOwnerId?: SortOrder
    participants?: SortOrder
    teamId?: SortOrder
    departToArrival?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RidingRecordCountOrderByAggregateInput
    _max?: RidingRecordMaxOrderByAggregateInput
    _min?: RidingRecordMinOrderByAggregateInput
  }

  export type RidingRecordScalarWhereWithAggregatesInput = {
    AND?: RidingRecordScalarWhereWithAggregatesInput | RidingRecordScalarWhereWithAggregatesInput[]
    OR?: RidingRecordScalarWhereWithAggregatesInput[]
    NOT?: RidingRecordScalarWhereWithAggregatesInput | RidingRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RidingRecord"> | string
    recordOwnerId?: StringWithAggregatesFilter<"RidingRecord"> | string
    participants?: StringNullableListFilter<"RidingRecord">
    teamId?: StringNullableWithAggregatesFilter<"RidingRecord"> | string | null
    departToArrival?: StringNullableListFilter<"RidingRecord">
    status?: EnumRidingRecordStatusWithAggregatesFilter<"RidingRecord"> | $Enums.RidingRecordStatus
    createdAt?: DateTimeWithAggregatesFilter<"RidingRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RidingRecord"> | Date | string
  }

  export type RidingRecordCreateInput = {
    id?: string
    route?: XOR<GeoPointListCreateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId: string
    participants?: RidingRecordCreateparticipantsInput | string[]
    teamId?: string | null
    departToArrival?: RidingRecordCreatedepartToArrivalInput | string[]
    status?: $Enums.RidingRecordStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RidingRecordUncheckedCreateInput = {
    id?: string
    route?: XOR<GeoPointListCreateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId: string
    participants?: RidingRecordCreateparticipantsInput | string[]
    teamId?: string | null
    departToArrival?: RidingRecordCreatedepartToArrivalInput | string[]
    status?: $Enums.RidingRecordStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RidingRecordUpdateInput = {
    route?: XOR<GeoPointListUpdateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId?: StringFieldUpdateOperationsInput | string
    participants?: RidingRecordUpdateparticipantsInput | string[]
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    departToArrival?: RidingRecordUpdatedepartToArrivalInput | string[]
    status?: EnumRidingRecordStatusFieldUpdateOperationsInput | $Enums.RidingRecordStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RidingRecordUncheckedUpdateInput = {
    route?: XOR<GeoPointListUpdateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId?: StringFieldUpdateOperationsInput | string
    participants?: RidingRecordUpdateparticipantsInput | string[]
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    departToArrival?: RidingRecordUpdatedepartToArrivalInput | string[]
    status?: EnumRidingRecordStatusFieldUpdateOperationsInput | $Enums.RidingRecordStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RidingRecordCreateManyInput = {
    id?: string
    route?: XOR<GeoPointListCreateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId: string
    participants?: RidingRecordCreateparticipantsInput | string[]
    teamId?: string | null
    departToArrival?: RidingRecordCreatedepartToArrivalInput | string[]
    status?: $Enums.RidingRecordStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RidingRecordUpdateManyMutationInput = {
    route?: XOR<GeoPointListUpdateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId?: StringFieldUpdateOperationsInput | string
    participants?: RidingRecordUpdateparticipantsInput | string[]
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    departToArrival?: RidingRecordUpdatedepartToArrivalInput | string[]
    status?: EnumRidingRecordStatusFieldUpdateOperationsInput | $Enums.RidingRecordStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RidingRecordUncheckedUpdateManyInput = {
    route?: XOR<GeoPointListUpdateEnvelopeInput, GeoPointCreateInput> | GeoPointCreateInput[]
    recordOwnerId?: StringFieldUpdateOperationsInput | string
    participants?: RidingRecordUpdateparticipantsInput | string[]
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    departToArrival?: RidingRecordUpdatedepartToArrivalInput | string[]
    status?: EnumRidingRecordStatusFieldUpdateOperationsInput | $Enums.RidingRecordStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type GeoPointCompositeListFilter = {
    equals?: GeoPointObjectEqualityInput[]
    every?: GeoPointWhereInput
    some?: GeoPointWhereInput
    none?: GeoPointWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type GeoPointObjectEqualityInput = {
    type: string
    coordinates?: number[]
    timestamp?: Date | string | null
    name?: string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type EnumRidingRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RidingRecordStatus | EnumRidingRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRidingRecordStatusFilter<$PrismaModel> | $Enums.RidingRecordStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GeoPointOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type RidingRecordCountOrderByAggregateInput = {
    id?: SortOrder
    recordOwnerId?: SortOrder
    participants?: SortOrder
    teamId?: SortOrder
    departToArrival?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RidingRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    recordOwnerId?: SortOrder
    teamId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RidingRecordMinOrderByAggregateInput = {
    id?: SortOrder
    recordOwnerId?: SortOrder
    teamId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumRidingRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RidingRecordStatus | EnumRidingRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRidingRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RidingRecordStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRidingRecordStatusFilter<$PrismaModel>
    _max?: NestedEnumRidingRecordStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GeoPointListCreateEnvelopeInput = {
    set?: GeoPointCreateInput | GeoPointCreateInput[]
  }

  export type GeoPointCreateInput = {
    type: string
    coordinates?: GeoPointCreatecoordinatesInput | number[]
    timestamp?: Date | string | null
    name?: string | null
  }

  export type RidingRecordCreateparticipantsInput = {
    set: string[]
  }

  export type RidingRecordCreatedepartToArrivalInput = {
    set: string[]
  }

  export type GeoPointListUpdateEnvelopeInput = {
    set?: GeoPointCreateInput | GeoPointCreateInput[]
    push?: GeoPointCreateInput | GeoPointCreateInput[]
    updateMany?: GeoPointUpdateManyInput
    deleteMany?: GeoPointDeleteManyInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type RidingRecordUpdateparticipantsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type RidingRecordUpdatedepartToArrivalInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumRidingRecordStatusFieldUpdateOperationsInput = {
    set?: $Enums.RidingRecordStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type GeoPointWhereInput = {
    AND?: GeoPointWhereInput | GeoPointWhereInput[]
    OR?: GeoPointWhereInput[]
    NOT?: GeoPointWhereInput | GeoPointWhereInput[]
    type?: StringFilter<"GeoPoint"> | string
    coordinates?: FloatNullableListFilter<"GeoPoint">
    timestamp?: DateTimeNullableFilter<"GeoPoint"> | Date | string | null
    name?: StringNullableFilter<"GeoPoint"> | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedEnumRidingRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RidingRecordStatus | EnumRidingRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRidingRecordStatusFilter<$PrismaModel> | $Enums.RidingRecordStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumRidingRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RidingRecordStatus | EnumRidingRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RidingRecordStatus[] | ListEnumRidingRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRidingRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RidingRecordStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRidingRecordStatusFilter<$PrismaModel>
    _max?: NestedEnumRidingRecordStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GeoPointCreatecoordinatesInput = {
    set: number[]
  }

  export type GeoPointUpdateManyInput = {
    where: GeoPointWhereInput
    data: GeoPointUpdateInput
  }

  export type GeoPointDeleteManyInput = {
    where: GeoPointWhereInput
  }

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    has?: number | FloatFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type GeoPointUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    coordinates?: GeoPointUpdatecoordinatesInput | number[]
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type GeoPointUpdatecoordinatesInput = {
    set?: number[]
    push?: number | number[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}