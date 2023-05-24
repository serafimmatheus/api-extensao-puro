export class MyError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
