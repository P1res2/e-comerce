import { CredentialsSignin } from "next-auth"

export class LoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message)
    this.code = message
  }
}
