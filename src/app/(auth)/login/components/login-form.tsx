"use client";

import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GoogleSignIn } from "@/components/google-sign-in";
import { handleCredentialsLogin } from "@/actions/auth";
import { loginFormSchema, TLoginForm } from "@/schemas/auth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginForm) => {
    const promise = handleCredentialsLogin(data);

    toast.promise(promise, {
      loading: "Entrando...",
      success: (data) => data.message,
      error: (err) => err.message,
    });

    await promise;

    router.push("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <ShoppingBag className="size-6" />
              </div>
              <span className="sr-only">EComerce</span>
            </a>
            <h1 className="text-xl font-bold">Entrar</h1>
            <FieldDescription>
              Não tem uma conta? <a href="/register">Inscrever-se</a>
            </FieldDescription>
          </div>
          <div className="flex flex-col gap-6">
            {/* Field: Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field className="flex flex-col gap-0">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="on"
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* Field: Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Field className="flex flex-col gap-0">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="on"
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </div>

          {/* Submit button */}
          <Field>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <Spinner /> : "Entrar"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldSeparator>Ou</FieldSeparator>
      <GoogleSignIn />
      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, você concorda com nossos{" "}
        <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  );
}
