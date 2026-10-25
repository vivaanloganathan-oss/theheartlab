import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-ink">404</p>
      <h1 className="mt-2 font-display text-6xl font-extrabold uppercase">Out of bounds</h1>
      <p className="mt-4 text-lg text-fg-muted">We couldn&apos;t find that page.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/academy" variant="secondary">
          Learning Academy
        </ButtonLink>
      </div>
    </Container>
  );
}
