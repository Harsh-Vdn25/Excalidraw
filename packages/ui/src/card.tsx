import { JSX, ReactNode } from "react";

export function Card({
  className = "",
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      href={`${href}?utm_source=drawflow&utm_medium=homepage`}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-lg transition-shadow ${className}`}
    >
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
        {title} <span className="text-slate-400">→</span>
      </h3>
      <div className="text-slate-600 dark:text-slate-400 text-sm">{children}</div>
    </a>
  );
}