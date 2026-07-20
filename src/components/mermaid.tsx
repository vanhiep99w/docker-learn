'use client';

import { useTheme } from 'fumadocs-ui/provider/base';
import mermaid from 'mermaid';
import { useEffect, useId, useState } from 'react';

type MermaidProps = {
  chart: string;
};

type RenderState = {
  key: string;
  svg?: string;
  error?: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const { resolvedTheme } = useTheme();
  const reactId = useId();
  const renderKey = `${resolvedTheme ?? 'light'}:${chart}`;
  const [renderState, setRenderState] = useState<RenderState>({ key: '' });

  useEffect(() => {
    let cancelled = false;
    const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      fontFamily: 'inherit',
    });

    void mermaid
      .render(diagramId, chart)
      .then(({ svg: renderedSvg }) => {
        if (!cancelled) setRenderState({ key: renderKey, svg: renderedSvg });
      })
      .catch((reason: unknown) => {
        if (cancelled) return;

        setRenderState({
          key: renderKey,
          error:
            reason instanceof Error ? reason.message : 'Không thể render sơ đồ.',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [chart, reactId, renderKey, resolvedTheme]);

  const currentState = renderState.key === renderKey ? renderState : undefined;

  if (currentState?.error) {
    return (
      <figure className="my-6 overflow-hidden rounded-xl border border-red-500/30 bg-red-500/5">
        <figcaption className="border-b border-red-500/20 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          Mermaid không thể render sơ đồ: {currentState.error}
        </figcaption>
        <pre className="overflow-x-auto p-4 text-sm">
          <code>{chart}</code>
        </pre>
      </figure>
    );
  }

  return (
    <figure
      aria-label="Sơ đồ Mermaid"
      className="my-6 min-h-40 overflow-x-auto rounded-xl border bg-fd-card p-4 md:p-6"
    >
      {currentState?.svg ? (
        <div
          className="mx-auto flex min-w-max justify-center [&_svg]:h-auto [&_svg]:max-w-none"
          dangerouslySetInnerHTML={{ __html: currentState.svg }}
        />
      ) : (
        <div
          aria-live="polite"
          className="flex min-h-32 items-center justify-center text-sm text-fd-muted-foreground"
        >
          Đang tải sơ đồ…
        </div>
      )}
    </figure>
  );
}
