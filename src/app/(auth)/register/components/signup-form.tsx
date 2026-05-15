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
import { handleSignup } from "@/actions/auth";
import { signupFormSchema, TSignupForm } from "@/schemas/auth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TSignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TSignupForm) => {
    const promise = handleSignup(data);

    toast.promise(promise, {
      loading: "Criando...",
      success: (data) => data.message,
      error: (err) => err.message,
    });

    await promise;

    router.push("/login");
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
            <h1 className="text-xl font-bold">Criar uma conta</h1>
            <FieldDescription>
              Já tem uma conta? <a href="/login">Entrar</a>
            </FieldDescription>
          </div>

          <div className="flex flex-col gap-6">
            {/* Field: Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Field className="flex flex-col gap-0">
                  <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                  <Input {...field} id="name" autoComplete="name" />
                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
                </Field>
              )}
            />

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
                    autoComplete="email"
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
                    type="password"
                    autoComplete="new-password"
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
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? <Spinner /> : "Criar conta"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldSeparator>Ou</FieldSeparator>

      <GoogleSignIn />

      <FieldDescription className="px-6 text-center text-xs">
        Ao clicar em continuar, você concorda com nossos{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Termos de Serviço
        </a>{" "}
        e{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Política de Privacidade
        </a>
        .
      </FieldDescription>
    </div>
  );
}
