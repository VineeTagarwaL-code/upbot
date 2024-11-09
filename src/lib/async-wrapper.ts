import { standardizeApiError } from "./error";
export type withServerActionAsyncCatcherType<T, R> = (args?: T) => Promise<R>;

function withServerActionAsyncCatcher<T, R>(
  serverAction: withServerActionAsyncCatcherType<T, R>
): withServerActionAsyncCatcherType<T, R> {
  return async (args?: T): Promise<R> => {
    try {
      return await serverAction(args);
    } catch (error) {
      console.log("Error in withServerActionAsyncCatcher", error);
      return standardizeApiError(error) as R;
    }
  };
}

export { withServerActionAsyncCatcher };
