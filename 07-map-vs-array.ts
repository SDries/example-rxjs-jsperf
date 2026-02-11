import { faker } from "@faker-js/faker";
import { benchmark, compareStats, createSeparator } from "./perf-utils.ts";

export function createUsers(count: number) {
  const usersArray = [];
  for (let i = 0; i < count; i++) {
    usersArray.push({
      id: i,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 80 }),
    });
  }
  return usersArray;
}

const testConfigs = [
  { arraySize: 100, lookups: 10 },
  { arraySize: 100, lookups: 100 },
  { arraySize: 100, lookups: 1000 },
  { arraySize: 10_000, lookups: 10 },
  { arraySize: 10_000, lookups: 100 },
  { arraySize: 10_000, lookups: 1000 },
  { arraySize: 100_000, lookups: 10 },
  { arraySize: 100_000, lookups: 100 },
  { arraySize: 100_000, lookups: 1000 },
];

const allResults: any[] = [];

for (const config of testConfigs) {
  console.log(
    `\n${"=".repeat(20)}\nArray Size: ${config.arraySize}, Lookups: ${config.lookups}\n${"=".repeat(20)}`,
  );

  allResults.push(createSeparator(config.arraySize, config.lookups));

  const users = createUsers(config.arraySize);
  const randomIds = Array.from({ length: config.lookups }, () =>
    faker.number.int({ min: 0, max: config.arraySize - 1 }),
  );

  // Find users by id in array
  const arrayResult = benchmark("Array.find()", () => {
    for (const id of randomIds) {
      users.find((u) => u.id === id);
    }
  });

  // Convert array to map, create map every test to see the difference
  const mapResult = benchmark("Map (created each iteration)", () => {
    const usersMap = new Map<
      number,
      { id: number; name: string; age: number }
    >();
    for (const user of users) {
      usersMap.set(user.id, user);
    }
    for (const id of randomIds) {
      usersMap.get(id);
    }
  });

  // Create the map only once, then benchmark lookups
  const usersMap = new Map<number, { id: number; name: string; age: number }>();
  for (const user of users) {
    usersMap.set(user.id, user);
  }

  const mapOnceResult = benchmark("Map (created once)", () => {
    for (const id of randomIds) {
      usersMap.get(id);
    }
  });

  allResults.push(arrayResult, mapResult, mapOnceResult);
}

// Print all results at the end
compareStats(allResults);
