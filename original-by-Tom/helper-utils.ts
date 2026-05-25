import readline from "readline";

export function waitForInput(delayMs: number = 0): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      rl.question("Press Enter to continue...", () => {
        resolve();
        rl.close();
      });
    }, delayMs);
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
