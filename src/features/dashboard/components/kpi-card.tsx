import { type LucideIcon } from 'lucide-react'

type KpiCardProps = {
  delta: string
  icon: LucideIcon
  label: string
  value: string
}

export function KpiCard({ delta, icon: Icon, label, value }: KpiCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-accent/50 text-accent-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {delta ? (
          <span className="rounded-full bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
            {delta}
          </span>
        ) : null}
      </div>
      <p className="font-mono text-xl font-semibold tracking-normal text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </article>
  )
}
