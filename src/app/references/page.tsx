import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Callout, Container, PageHero, Section } from "@/components/ui";
import { references } from "@/content/references";
import type { Reference } from "@/content/types";

export const metadata: Metadata = {
  title: "References & Medical Sources",
  description: "The public health and medical sources behind YoungHeartz's educational content.",
};

export default function ReferencesPage() {
  const byOrg = references.reduce<Record<string, Reference[]>>((acc, r) => {
    (acc[r.organization] ??= []).push(r);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="References"
        title="Medical sources"
        intro="Every fact and explanation on YoungHeartz is linked to one or more of the public sources below."
      />
      <Section>
        <Container className="max-w-4xl">
          <Callout tone="info" title="How references are verified">
            Each link was checked on the date shown to confirm it resolves to the named organization&apos;s page. Some
            sites (such as heart.org) block automated checks; those were confirmed through search listings of the official
            domain and should be re-checked manually before launch. Links can change — please{" "}
            <strong>re-verify before each release</strong>.
          </Callout>
          <div className="mt-10 space-y-10">
            {Object.entries(byOrg).map(([org, refs]) => (
              <section key={org} aria-labelledby={`org-${refs[0].id}`}>
                <h2 id={`org-${refs[0].id}`} className="font-display text-2xl font-bold uppercase">
                  {org}
                </h2>
                <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-bg-elev">
                  {refs.map((r) => (
                    <li key={r.id} id={r.id} className="p-4">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 font-semibold underline-offset-2 hover:underline">
                        {r.title}
                        <ExternalLink aria-hidden className="mt-1 size-3.5 shrink-0" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                      <p className="mt-1 break-all text-xs text-fg-muted">{r.url}</p>
                      <p className="mt-1 text-xs text-fg-muted">
                        Link verified {r.verifiedOn}
                        {r.note && <> · {r.note}</>}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
