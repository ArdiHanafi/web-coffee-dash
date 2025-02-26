export const ActionResponse = (status: boolean, message: string) => ({
  success: status,
  message,
  responseObject: undefined,
});

export const ActionResponseWithType = <T>(
  status: boolean,
  message: string,
  responseObject: T
) => ({
  success: status,
  message,
  responseObject,
});