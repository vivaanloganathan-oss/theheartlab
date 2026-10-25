import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Clock } from "lucide-react";
import { Container, PageHero, Section } from "@/components/ui";
import { ModulePlayer } from "@/components/learn/module-player";
import { levelOf, moduleById, modules } from "@/content/academy";

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: PageProps<"/academy/[moduleId]">): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = moduleById[moduleId];
  if (!mod) return {};
  return { title: `${mod.title} — Learning Academy`, description: mod.summary };
}

export default function ModulePage({ params }: PageProps<"/academy/[moduleId]">) {
  return (
    <Suspense fallback={<ModuleSkeleton />}>
      {params.then(({ moduleId }) => (
        <ModuleContent moduleId={moduleId} />
      ))}
    </Suspense>
  );
}

function ModuleSkeleton() {
  return (
    <div aria-label="Loading module">
      <div className="h-72 animate-pulse bg-navy" />
      <Container className="max-w-5xl py-12">
        <div className="h-40 animate-pulse rounded-3xl bg-bg-sunken" />
      </Container>
    </div>
  );
}

function ModuleContent({ moduleId }: { moduleId: string }) {
  const mod = moduleById[moduleId];
  if (!mod) notFound();
  const level = levelOf(moduleId);
  const index = level.modules.indexOf(moduleId) + 1;

  return (
    <>
      <PageHero
        eyebrow={`Level ${level.number} · ${level.name} · Module ${index} of ${level.modules.length}`}
        title={mod.title}
        intro={
          <>
            {mod.summary}
            <span className="mt-2 flex items-center gap-1 text-sm text-white/60">
              <Clock aria-hidden className="size-4" /> About {mod.minutes} minutes
            </span>
          </>
        }
      />
      <Section className="pt-10 sm:pt-12">
        <Container className="max-w-5xl">
          <ModulePlayer moduleId={moduleId} />
        </Container>
      </Section>
    </>
  );
}
