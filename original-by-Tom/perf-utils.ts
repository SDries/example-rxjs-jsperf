import { performance } from "perf_hooks";

export interface Stats {
  min: number;
  max: number;
  avg: number;
  median: number;
  times: number[];
}

export interface BenchmarkResult {
  name: string;
  stats?: Stats;
  isSeparator?: boolean;
}

export interface BenchmarkOptions {
  iterations?: number;
  logRuns?: boolean;
}

function calculateStats(times: number[]): Stats {
  const min = Math.min(...times);
  const max = Math.max(...times);
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const sorted = [...times].sort((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
  return { min, max, avg, median, times };
}

export function benchmark(
  name: string,
  fn: () => void,
  options: BenchmarkOptions = {},
): BenchmarkResult {
  const { iterations = 100, logRuns = true } = options;
  const times: number[] = [];

  if (logRuns) {
    console.log(`\n${name} runs:`);
  }

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    const duration = end - start;
    times.push(duration);

    if (logRuns) {
      console.log(`  Run ${i + 1}: ${duration.toFixed(3)}ms`);
    }
  }

  return { name, stats: calculateStats(times) };
}

export function createSeparator(
  arraySize: number,
  lookups: number,
): BenchmarkResult {
  return {
    name: `Array Size: ${arraySize}, Lookups: ${lookups}`,
    isSeparator: true,
  };
}

export function compareStats(results: BenchmarkResult[]) {
  // Calculate column widths
  const nameWidth = Math.max(
    "Test".length,
    ...results.filter((r) => !r.isSeparator).map((r) => r.name.length),
  );
  const numWidth = 12;

  // Header
  const header = [
    "Test".padEnd(nameWidth),
    "Min (ms)".padStart(numWidth),
    "Max (ms)".padStart(numWidth),
    "Median (ms)".padStart(numWidth),
  ].join(" | ");

  const separator = "-".repeat(header.length);

  console.log("\n" + separator);
  console.log(header);
  console.log(separator);

  // Rows
  for (const result of results) {
    if (result.isSeparator) {
      const textWidth = result.name.length + 2; // 2 for spaces around text
      const remainingWidth = header.length - textWidth;
      const sideWidth = Math.floor(remainingWidth / 2);
      const hasExtra = remainingWidth % 2 === 1;
      const sepLine = "=".repeat(sideWidth);
      const extra = hasExtra ? "=" : "";
      console.log(`${sepLine} ${result.name} ${sepLine}${extra}`);
    } else {
      const { name, stats } = result;
      const row = [
        name.padEnd(nameWidth),
        stats!.min.toFixed(3).padStart(numWidth),
        stats!.max.toFixed(3).padStart(numWidth),
        stats!.median.toFixed(3).padStart(numWidth),
      ].join(" | ");
      console.log(row);
    }
  }

  console.log(separator);
}
