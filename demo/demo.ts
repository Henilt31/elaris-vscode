/**
 * Elaris Theme - TypeScript Demo
 * Clean daylight syntax testing: interfaces, generics, async pipeline, classes.
 */

export interface DaybreakConfig {
  readonly workspaceId: string;
  refreshIntervalMs: number;
  environment: 'development' | 'staging' | 'production';
  enableTelemetry?: boolean;
}

export type PipelineResult<T> = {
  data: T | null;
  timestamp: number;
  durationMs: number;
  isSuccess: boolean;
};

export class FocusMetricsCollector {
  private static instance: FocusMetricsCollector;
  private readonly sessionStart: number;

  private constructor() {
    this.sessionStart = Date.now();
  }

  public static getInstance(): FocusMetricsCollector {
    if (!FocusMetricsCollector.instance) {
      FocusMetricsCollector.instance = new FocusMetricsCollector();
    }
    return FocusMetricsCollector.instance;
  }

  public trackEvent(name: string, metadata: Record<string, unknown>): void {
    const elapsed = Date.now() - this.sessionStart;
    console.log(`[Elaris Focus] ${name} after ${elapsed}ms`, metadata);
  }
}

export async function processDaylightQueue<T extends { id: string }>(
  queue: ReadonlyArray<T>,
  config: DaybreakConfig
): Promise<PipelineResult<T[]>> {
  const collector = FocusMetricsCollector.getInstance();
  const start = Date.now();

  try {
    collector.trackEvent('queue_init', {
      totalItems: queue.length,
      env: config.environment,
    });

    const validated = await Promise.all(
      queue.map(async (item) => {
        return item.id.trim().length > 0 ? { ...item } : null;
      })
    );

    const activeItems = validated.filter((entry): entry is T => entry !== null);

    return {
      data: activeItems,
      timestamp: Date.now(),
      durationMs: Date.now() - start,
      isSuccess: true,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown pipeline error';
    console.error('[Elaris Error] Queue execution failed:', message);
    return {
      data: null,
      timestamp: Date.now(),
      durationMs: Date.now() - start,
      isSuccess: false,
    };
  }
}
