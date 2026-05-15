import {
  Html,
  Button,
  Text,
  Container,
  Heading,
} from "@react-email/components"

interface VerifyEmailProps {
  verificationUrl: string
  name: string
}

export function VerifyEmail({ verificationUrl, name }: VerifyEmailProps) {
  return (
    <Html>
      <Container>
        <Heading>Confirme seu email</Heading>
        <Text>Olá {name}, clique no botão abaixo para confirmar seu email.</Text>
        <Button href={verificationUrl}>Confirmar email</Button>
      </Container>
    </Html>
  )
}
