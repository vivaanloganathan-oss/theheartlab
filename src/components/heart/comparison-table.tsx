import { cx } from "@/components/ui";

interface Row {
  aspect: string;
  typical: string;
  condition: string;
}

/**
 * Two-column comparison: a table on larger screens, stacked cards on phones
 * (so neither column is hidden off-screen).
 */
export function ComparisonTable({ conditionLabel, rows, caption }: { conditionLabel: string; rows: Row[]; caption: string }) {
  const typicalCls = "text-emerald-700 dark:text-emerald-300";
  return (
    <>
      <div className="hidden overflow-hidden rounded-3xl border border-line bg-bg-elev sm:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-4">
                <span className="sr-only">Aspect</span>
              </th>
              <th scope="col" className={cx("p-4 font-display text-lg font-bold uppercase", typicalCls)}>
                Typical heart
              </th>
              <th scope="col" className="p-4 font-display text-lg font-bold uppercase text-cyan-ink">
                {conditionLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.aspect} className="border-b border-line last:border-0">
                <th scope="row" className="w-40 p-4 align-top font-bold">
                  {r.aspect}
                </th>
                <td className="p-4 align-top text-fg-muted">{r.typical}</td>
                <td className="p-4 align-top text-fg-muted">{r.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 sm:hidden" aria-label={caption}>
        {rows.map((r) => (
          <li key={r.aspect} className="rounded-2xl border border-line bg-bg-elev p-4">
            <h4 className="font-display text-lg font-bold uppercase">{r.aspect}</h4>
            <dl className="mt-2 space-y-2 text-sm">
              <div className="border-l-4 border-emerald-500 pl-3">
                <dt className={cx("text-xs font-bold uppercase tracking-wider", typicalCls)}>Typical heart</dt>
                <dd className="text-fg-muted">{r.typical}</dd>
              </div>
              <div className="border-l-4 border-cyan pl-3">
                <dt className="text-xs font-bold uppercase tracking-wider text-cyan-ink">{conditionLabel}</dt>
                <dd className="text-fg-muted">{r.condition}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
