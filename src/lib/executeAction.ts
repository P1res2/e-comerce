import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface Options<T> {
  actionFn: () => Promise<T>;
  successMessage?: string;
  errorMessage?: string;
}

export async function executeAction<T>({
  actionFn,
  successMessage = "The actions was successful",
  errorMessage = "An error has occurred during executing the action",
}: Options<T>): Promise<{ success: boolean; message: string }> {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      throw new Error(error.code);
    }
    if (isRedirectError(error)) {
      throw error;
    }

    throw new Error(errorMessage);
  }
}
