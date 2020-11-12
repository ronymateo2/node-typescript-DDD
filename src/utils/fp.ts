export class Right<T> {
  public static of<TVal>(val: TVal) {
    return new Right(val);
  }
  private _value: T;

  public constructor(val: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return Right.of(<TMap>fn(this._value));
  }

  public fold(f: Function, g: Function) {
    return g(this._value);
  }
}

export class Left<T> {
  public static of<TVal>(val: TVal) {
    return new Left(val);
  }

  private _value: T;

  public constructor(val: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return Left.of(this._value);
  }

  public fold(f: Function, g: Function) {
    return f(this._value);
  }
}

export type Either<T1, T2> = Left<T2> | Right<T1>;

export const tryCatchAsync = async <TResult>(f: () => Promise<TResult>) => {
  try {
    return Right.of(await f());
  } catch (error) {
    return Left.of(error as Error);
  }
};
