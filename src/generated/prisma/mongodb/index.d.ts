
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
 * Model TrackPoint
 * 
 */
export type TrackPoint = $Result.DefaultSelection<Prisma.$TrackPointPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more TrackPoints
 * const trackPoints = await prisma.trackPoint.findMany()
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
   * // Fetch zero or more TrackPoints
   * const trackPoints = await prisma.trackPoint.findMany()
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
   * `prisma.trackPoint`: Exposes CRUD operations for the **TrackPoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackPoints
    * const trackPoints = await prisma.trackPoint.findMany()
    * ```
    */
  get trackPoint(): Prisma.TrackPointDelegate<ExtArgs, ClientOptions>;
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
    TrackPoint: 'TrackPoint'
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
      modelProps: "trackPoint"
      txIsolationLevel: never
    }
    model: {
      TrackPoint: {
        payload: Prisma.$TrackPointPayload<ExtArgs>
        fields: Prisma.TrackPointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackPointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackPointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>
          }
          findFirst: {
            args: Prisma.TrackPointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackPointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>
          }
          findMany: {
            args: Prisma.TrackPointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>[]
          }
          create: {
            args: Prisma.TrackPointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>
          }
          createMany: {
            args: Prisma.TrackPointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TrackPointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>
          }
          update: {
            args: Prisma.TrackPointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>
          }
          deleteMany: {
            args: Prisma.TrackPointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackPointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TrackPointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPointPayload>
          }
          aggregate: {
            args: Prisma.TrackPointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackPoint>
          }
          groupBy: {
            args: Prisma.TrackPointGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackPointGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TrackPointFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TrackPointAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TrackPointCountArgs<ExtArgs>
            result: $Utils.Optional<TrackPointCountAggregateOutputType> | number
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
    trackPoint?: TrackPointOmit
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
   * Model TrackPoint
   */

  export type AggregateTrackPoint = {
    _count: TrackPointCountAggregateOutputType | null
    _avg: TrackPointAvgAggregateOutputType | null
    _sum: TrackPointSumAggregateOutputType | null
    _min: TrackPointMinAggregateOutputType | null
    _max: TrackPointMaxAggregateOutputType | null
  }

  export type TrackPointAvgAggregateOutputType = {
    userId: number | null
    ridingRecordId: number | null
    lat: number | null
    lon: number | null
    ele: number | null
  }

  export type TrackPointSumAggregateOutputType = {
    userId: bigint | null
    ridingRecordId: bigint | null
    lat: number | null
    lon: number | null
    ele: number | null
  }

  export type TrackPointMinAggregateOutputType = {
    id: string | null
    userId: bigint | null
    ridingRecordId: bigint | null
    lat: number | null
    lon: number | null
    ele: number | null
    timestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackPointMaxAggregateOutputType = {
    id: string | null
    userId: bigint | null
    ridingRecordId: bigint | null
    lat: number | null
    lon: number | null
    ele: number | null
    timestamp: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrackPointCountAggregateOutputType = {
    id: number
    userId: number
    ridingRecordId: number
    lat: number
    lon: number
    ele: number
    timestamp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrackPointAvgAggregateInputType = {
    userId?: true
    ridingRecordId?: true
    lat?: true
    lon?: true
    ele?: true
  }

  export type TrackPointSumAggregateInputType = {
    userId?: true
    ridingRecordId?: true
    lat?: true
    lon?: true
    ele?: true
  }

  export type TrackPointMinAggregateInputType = {
    id?: true
    userId?: true
    ridingRecordId?: true
    lat?: true
    lon?: true
    ele?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackPointMaxAggregateInputType = {
    id?: true
    userId?: true
    ridingRecordId?: true
    lat?: true
    lon?: true
    ele?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrackPointCountAggregateInputType = {
    id?: true
    userId?: true
    ridingRecordId?: true
    lat?: true
    lon?: true
    ele?: true
    timestamp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrackPointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackPoint to aggregate.
     */
    where?: TrackPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackPoints to fetch.
     */
    orderBy?: TrackPointOrderByWithRelationInput | TrackPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackPoints
    **/
    _count?: true | TrackPointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrackPointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrackPointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackPointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackPointMaxAggregateInputType
  }

  export type GetTrackPointAggregateType<T extends TrackPointAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackPoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackPoint[P]>
      : GetScalarType<T[P], AggregateTrackPoint[P]>
  }




  export type TrackPointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackPointWhereInput
    orderBy?: TrackPointOrderByWithAggregationInput | TrackPointOrderByWithAggregationInput[]
    by: TrackPointScalarFieldEnum[] | TrackPointScalarFieldEnum
    having?: TrackPointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackPointCountAggregateInputType | true
    _avg?: TrackPointAvgAggregateInputType
    _sum?: TrackPointSumAggregateInputType
    _min?: TrackPointMinAggregateInputType
    _max?: TrackPointMaxAggregateInputType
  }

  export type TrackPointGroupByOutputType = {
    id: string
    userId: bigint
    ridingRecordId: bigint
    lat: number
    lon: number
    ele: number | null
    timestamp: Date
    createdAt: Date
    updatedAt: Date
    _count: TrackPointCountAggregateOutputType | null
    _avg: TrackPointAvgAggregateOutputType | null
    _sum: TrackPointSumAggregateOutputType | null
    _min: TrackPointMinAggregateOutputType | null
    _max: TrackPointMaxAggregateOutputType | null
  }

  type GetTrackPointGroupByPayload<T extends TrackPointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackPointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackPointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackPointGroupByOutputType[P]>
            : GetScalarType<T[P], TrackPointGroupByOutputType[P]>
        }
      >
    >


  export type TrackPointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ridingRecordId?: boolean
    lat?: boolean
    lon?: boolean
    ele?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trackPoint"]>



  export type TrackPointSelectScalar = {
    id?: boolean
    userId?: boolean
    ridingRecordId?: boolean
    lat?: boolean
    lon?: boolean
    ele?: boolean
    timestamp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrackPointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "ridingRecordId" | "lat" | "lon" | "ele" | "timestamp" | "createdAt" | "updatedAt", ExtArgs["result"]["trackPoint"]>

  export type $TrackPointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackPoint"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: bigint
      ridingRecordId: bigint
      lat: number
      lon: number
      ele: number | null
      timestamp: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trackPoint"]>
    composites: {}
  }

  type TrackPointGetPayload<S extends boolean | null | undefined | TrackPointDefaultArgs> = $Result.GetResult<Prisma.$TrackPointPayload, S>

  type TrackPointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackPointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackPointCountAggregateInputType | true
    }

  export interface TrackPointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackPoint'], meta: { name: 'TrackPoint' } }
    /**
     * Find zero or one TrackPoint that matches the filter.
     * @param {TrackPointFindUniqueArgs} args - Arguments to find a TrackPoint
     * @example
     * // Get one TrackPoint
     * const trackPoint = await prisma.trackPoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackPointFindUniqueArgs>(args: SelectSubset<T, TrackPointFindUniqueArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrackPoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackPointFindUniqueOrThrowArgs} args - Arguments to find a TrackPoint
     * @example
     * // Get one TrackPoint
     * const trackPoint = await prisma.trackPoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackPointFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackPointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackPoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointFindFirstArgs} args - Arguments to find a TrackPoint
     * @example
     * // Get one TrackPoint
     * const trackPoint = await prisma.trackPoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackPointFindFirstArgs>(args?: SelectSubset<T, TrackPointFindFirstArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackPoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointFindFirstOrThrowArgs} args - Arguments to find a TrackPoint
     * @example
     * // Get one TrackPoint
     * const trackPoint = await prisma.trackPoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackPointFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackPointFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackPoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackPoints
     * const trackPoints = await prisma.trackPoint.findMany()
     * 
     * // Get first 10 TrackPoints
     * const trackPoints = await prisma.trackPoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackPointWithIdOnly = await prisma.trackPoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackPointFindManyArgs>(args?: SelectSubset<T, TrackPointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrackPoint.
     * @param {TrackPointCreateArgs} args - Arguments to create a TrackPoint.
     * @example
     * // Create one TrackPoint
     * const TrackPoint = await prisma.trackPoint.create({
     *   data: {
     *     // ... data to create a TrackPoint
     *   }
     * })
     * 
     */
    create<T extends TrackPointCreateArgs>(args: SelectSubset<T, TrackPointCreateArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrackPoints.
     * @param {TrackPointCreateManyArgs} args - Arguments to create many TrackPoints.
     * @example
     * // Create many TrackPoints
     * const trackPoint = await prisma.trackPoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackPointCreateManyArgs>(args?: SelectSubset<T, TrackPointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TrackPoint.
     * @param {TrackPointDeleteArgs} args - Arguments to delete one TrackPoint.
     * @example
     * // Delete one TrackPoint
     * const TrackPoint = await prisma.trackPoint.delete({
     *   where: {
     *     // ... filter to delete one TrackPoint
     *   }
     * })
     * 
     */
    delete<T extends TrackPointDeleteArgs>(args: SelectSubset<T, TrackPointDeleteArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrackPoint.
     * @param {TrackPointUpdateArgs} args - Arguments to update one TrackPoint.
     * @example
     * // Update one TrackPoint
     * const trackPoint = await prisma.trackPoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackPointUpdateArgs>(args: SelectSubset<T, TrackPointUpdateArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrackPoints.
     * @param {TrackPointDeleteManyArgs} args - Arguments to filter TrackPoints to delete.
     * @example
     * // Delete a few TrackPoints
     * const { count } = await prisma.trackPoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackPointDeleteManyArgs>(args?: SelectSubset<T, TrackPointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackPoints
     * const trackPoint = await prisma.trackPoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackPointUpdateManyArgs>(args: SelectSubset<T, TrackPointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TrackPoint.
     * @param {TrackPointUpsertArgs} args - Arguments to update or create a TrackPoint.
     * @example
     * // Update or create a TrackPoint
     * const trackPoint = await prisma.trackPoint.upsert({
     *   create: {
     *     // ... data to create a TrackPoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackPoint we want to update
     *   }
     * })
     */
    upsert<T extends TrackPointUpsertArgs>(args: SelectSubset<T, TrackPointUpsertArgs<ExtArgs>>): Prisma__TrackPointClient<$Result.GetResult<Prisma.$TrackPointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackPoints that matches the filter.
     * @param {TrackPointFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const trackPoint = await prisma.trackPoint.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TrackPointFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a TrackPoint.
     * @param {TrackPointAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const trackPoint = await prisma.trackPoint.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TrackPointAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of TrackPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointCountArgs} args - Arguments to filter TrackPoints to count.
     * @example
     * // Count the number of TrackPoints
     * const count = await prisma.trackPoint.count({
     *   where: {
     *     // ... the filter for the TrackPoints we want to count
     *   }
     * })
    **/
    count<T extends TrackPointCountArgs>(
      args?: Subset<T, TrackPointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackPointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackPointAggregateArgs>(args: Subset<T, TrackPointAggregateArgs>): Prisma.PrismaPromise<GetTrackPointAggregateType<T>>

    /**
     * Group by TrackPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackPointGroupByArgs} args - Group by arguments.
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
      T extends TrackPointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackPointGroupByArgs['orderBy'] }
        : { orderBy?: TrackPointGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackPointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackPointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackPoint model
   */
  readonly fields: TrackPointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackPoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackPointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TrackPoint model
   */
  interface TrackPointFieldRefs {
    readonly id: FieldRef<"TrackPoint", 'String'>
    readonly userId: FieldRef<"TrackPoint", 'BigInt'>
    readonly ridingRecordId: FieldRef<"TrackPoint", 'BigInt'>
    readonly lat: FieldRef<"TrackPoint", 'Float'>
    readonly lon: FieldRef<"TrackPoint", 'Float'>
    readonly ele: FieldRef<"TrackPoint", 'Float'>
    readonly timestamp: FieldRef<"TrackPoint", 'DateTime'>
    readonly createdAt: FieldRef<"TrackPoint", 'DateTime'>
    readonly updatedAt: FieldRef<"TrackPoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrackPoint findUnique
   */
  export type TrackPointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * Filter, which TrackPoint to fetch.
     */
    where: TrackPointWhereUniqueInput
  }

  /**
   * TrackPoint findUniqueOrThrow
   */
  export type TrackPointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * Filter, which TrackPoint to fetch.
     */
    where: TrackPointWhereUniqueInput
  }

  /**
   * TrackPoint findFirst
   */
  export type TrackPointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * Filter, which TrackPoint to fetch.
     */
    where?: TrackPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackPoints to fetch.
     */
    orderBy?: TrackPointOrderByWithRelationInput | TrackPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackPoints.
     */
    cursor?: TrackPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackPoints.
     */
    distinct?: TrackPointScalarFieldEnum | TrackPointScalarFieldEnum[]
  }

  /**
   * TrackPoint findFirstOrThrow
   */
  export type TrackPointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * Filter, which TrackPoint to fetch.
     */
    where?: TrackPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackPoints to fetch.
     */
    orderBy?: TrackPointOrderByWithRelationInput | TrackPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackPoints.
     */
    cursor?: TrackPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackPoints.
     */
    distinct?: TrackPointScalarFieldEnum | TrackPointScalarFieldEnum[]
  }

  /**
   * TrackPoint findMany
   */
  export type TrackPointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * Filter, which TrackPoints to fetch.
     */
    where?: TrackPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackPoints to fetch.
     */
    orderBy?: TrackPointOrderByWithRelationInput | TrackPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackPoints.
     */
    cursor?: TrackPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackPoints.
     */
    skip?: number
    distinct?: TrackPointScalarFieldEnum | TrackPointScalarFieldEnum[]
  }

  /**
   * TrackPoint create
   */
  export type TrackPointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * The data needed to create a TrackPoint.
     */
    data: XOR<TrackPointCreateInput, TrackPointUncheckedCreateInput>
  }

  /**
   * TrackPoint createMany
   */
  export type TrackPointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackPoints.
     */
    data: TrackPointCreateManyInput | TrackPointCreateManyInput[]
  }

  /**
   * TrackPoint update
   */
  export type TrackPointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * The data needed to update a TrackPoint.
     */
    data: XOR<TrackPointUpdateInput, TrackPointUncheckedUpdateInput>
    /**
     * Choose, which TrackPoint to update.
     */
    where: TrackPointWhereUniqueInput
  }

  /**
   * TrackPoint updateMany
   */
  export type TrackPointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackPoints.
     */
    data: XOR<TrackPointUpdateManyMutationInput, TrackPointUncheckedUpdateManyInput>
    /**
     * Filter which TrackPoints to update
     */
    where?: TrackPointWhereInput
    /**
     * Limit how many TrackPoints to update.
     */
    limit?: number
  }

  /**
   * TrackPoint upsert
   */
  export type TrackPointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * The filter to search for the TrackPoint to update in case it exists.
     */
    where: TrackPointWhereUniqueInput
    /**
     * In case the TrackPoint found by the `where` argument doesn't exist, create a new TrackPoint with this data.
     */
    create: XOR<TrackPointCreateInput, TrackPointUncheckedCreateInput>
    /**
     * In case the TrackPoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackPointUpdateInput, TrackPointUncheckedUpdateInput>
  }

  /**
   * TrackPoint delete
   */
  export type TrackPointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
    /**
     * Filter which TrackPoint to delete.
     */
    where: TrackPointWhereUniqueInput
  }

  /**
   * TrackPoint deleteMany
   */
  export type TrackPointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackPoints to delete
     */
    where?: TrackPointWhereInput
    /**
     * Limit how many TrackPoints to delete.
     */
    limit?: number
  }

  /**
   * TrackPoint findRaw
   */
  export type TrackPointFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * TrackPoint aggregateRaw
   */
  export type TrackPointAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * TrackPoint without action
   */
  export type TrackPointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackPoint
     */
    select?: TrackPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackPoint
     */
    omit?: TrackPointOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TrackPointScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    ridingRecordId: 'ridingRecordId',
    lat: 'lat',
    lon: 'lon',
    ele: 'ele',
    timestamp: 'timestamp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrackPointScalarFieldEnum = (typeof TrackPointScalarFieldEnum)[keyof typeof TrackPointScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


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
   * Deep Input Types
   */


  export type TrackPointWhereInput = {
    AND?: TrackPointWhereInput | TrackPointWhereInput[]
    OR?: TrackPointWhereInput[]
    NOT?: TrackPointWhereInput | TrackPointWhereInput[]
    id?: StringFilter<"TrackPoint"> | string
    userId?: BigIntFilter<"TrackPoint"> | bigint | number
    ridingRecordId?: BigIntFilter<"TrackPoint"> | bigint | number
    lat?: FloatFilter<"TrackPoint"> | number
    lon?: FloatFilter<"TrackPoint"> | number
    ele?: FloatNullableFilter<"TrackPoint"> | number | null
    timestamp?: DateTimeFilter<"TrackPoint"> | Date | string
    createdAt?: DateTimeFilter<"TrackPoint"> | Date | string
    updatedAt?: DateTimeFilter<"TrackPoint"> | Date | string
  }

  export type TrackPointOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackPointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackPointWhereInput | TrackPointWhereInput[]
    OR?: TrackPointWhereInput[]
    NOT?: TrackPointWhereInput | TrackPointWhereInput[]
    userId?: BigIntFilter<"TrackPoint"> | bigint | number
    ridingRecordId?: BigIntFilter<"TrackPoint"> | bigint | number
    lat?: FloatFilter<"TrackPoint"> | number
    lon?: FloatFilter<"TrackPoint"> | number
    ele?: FloatNullableFilter<"TrackPoint"> | number | null
    timestamp?: DateTimeFilter<"TrackPoint"> | Date | string
    createdAt?: DateTimeFilter<"TrackPoint"> | Date | string
    updatedAt?: DateTimeFilter<"TrackPoint"> | Date | string
  }, "id">

  export type TrackPointOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrackPointCountOrderByAggregateInput
    _avg?: TrackPointAvgOrderByAggregateInput
    _max?: TrackPointMaxOrderByAggregateInput
    _min?: TrackPointMinOrderByAggregateInput
    _sum?: TrackPointSumOrderByAggregateInput
  }

  export type TrackPointScalarWhereWithAggregatesInput = {
    AND?: TrackPointScalarWhereWithAggregatesInput | TrackPointScalarWhereWithAggregatesInput[]
    OR?: TrackPointScalarWhereWithAggregatesInput[]
    NOT?: TrackPointScalarWhereWithAggregatesInput | TrackPointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackPoint"> | string
    userId?: BigIntWithAggregatesFilter<"TrackPoint"> | bigint | number
    ridingRecordId?: BigIntWithAggregatesFilter<"TrackPoint"> | bigint | number
    lat?: FloatWithAggregatesFilter<"TrackPoint"> | number
    lon?: FloatWithAggregatesFilter<"TrackPoint"> | number
    ele?: FloatNullableWithAggregatesFilter<"TrackPoint"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"TrackPoint"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TrackPoint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrackPoint"> | Date | string
  }

  export type TrackPointCreateInput = {
    id?: string
    userId: bigint | number
    ridingRecordId: bigint | number
    lat: number
    lon: number
    ele?: number | null
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackPointUncheckedCreateInput = {
    id?: string
    userId: bigint | number
    ridingRecordId: bigint | number
    lat: number
    lon: number
    ele?: number | null
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackPointUpdateInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    ridingRecordId?: BigIntFieldUpdateOperationsInput | bigint | number
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    ele?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackPointUncheckedUpdateInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    ridingRecordId?: BigIntFieldUpdateOperationsInput | bigint | number
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    ele?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackPointCreateManyInput = {
    id?: string
    userId: bigint | number
    ridingRecordId: bigint | number
    lat: number
    lon: number
    ele?: number | null
    timestamp: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackPointUpdateManyMutationInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    ridingRecordId?: BigIntFieldUpdateOperationsInput | bigint | number
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    ele?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackPointUncheckedUpdateManyInput = {
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    ridingRecordId?: BigIntFieldUpdateOperationsInput | bigint | number
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    ele?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
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

  export type TrackPointCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackPointAvgOrderByAggregateInput = {
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
  }

  export type TrackPointMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackPointMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrackPointSumOrderByAggregateInput = {
    userId?: SortOrder
    ridingRecordId?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    ele?: SortOrder
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

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
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

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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