import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-map-vs-array',
  imports: [],
  templateUrl: './map-vs-array.html',
  styleUrl: './map-vs-array.scss',
})
export class MapVsArray {
  private createUsers(count: number): User[] {
    const usersArray: User[] = [];
    for (let i = 0; i < count; i++) {
      usersArray.push({
        id: i,
        name: `User_${i}`,
        age: Math.floor(Math.random() * 62) + 18,
      });
    }
    return usersArray;
  }

  private generateRandomIds(count: number, max: number): number[] {
    return Array.from({ length: count }, () =>
      Math.floor(Math.random() * max),
    );
  }

  private benchmark(
    name: string,
    fn: () => void,
    iterations: number = 1000,
  ): { name: string; time: number } {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    const end = performance.now();
    const time = end - start;
    console.log(`  ⏱️  ${name}: ${time.toFixed(2)}ms`);
    return { name, time };
  }

  example1() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 1: Array.find() Lookups');
    console.log('='.repeat(60));

    const testConfigs = [
      { arraySize: 100, lookups: 100 },
      { arraySize: 1000, lookups: 100 },
      { arraySize: 10000, lookups: 100 },
    ];

    for (const config of testConfigs) {
      console.log(
        `\nArray Size: ${config.arraySize}, Lookups: ${config.lookups}`,
      );
      const users = this.createUsers(config.arraySize);
      const randomIds = this.generateRandomIds(
        config.lookups,
        config.arraySize,
      );

      this.benchmark('Array.find()', () => {
        for (const id of randomIds) {
          users.find((u) => u.id === id);
        }
      });
    }
  }

  example2() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 2: Map (Created Each Iteration)');
    console.log('='.repeat(60));

    const testConfigs = [
      { arraySize: 100, lookups: 100 },
      { arraySize: 1000, lookups: 100 },
      { arraySize: 10000, lookups: 100 },
    ];

    for (const config of testConfigs) {
      console.log(
        `\nArray Size: ${config.arraySize}, Lookups: ${config.lookups}`,
      );
      const users = this.createUsers(config.arraySize);
      const randomIds = this.generateRandomIds(
        config.lookups,
        config.arraySize,
      );

      this.benchmark('Map (created each iteration)', () => {
        const usersMap = new Map<number, User>();
        for (const user of users) {
          usersMap.set(user.id, user);
        }
        for (const id of randomIds) {
          usersMap.get(id);
        }
      });
    }
  }

  example3() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 3: Map (Created Once)');
    console.log('='.repeat(60));

    const testConfigs = [
      { arraySize: 100, lookups: 100 },
      { arraySize: 1000, lookups: 100 },
      { arraySize: 10000, lookups: 100 },
    ];

    for (const config of testConfigs) {
      console.log(
        `\nArray Size: ${config.arraySize}, Lookups: ${config.lookups}`,
      );
      const users = this.createUsers(config.arraySize);
      const randomIds = this.generateRandomIds(
        config.lookups,
        config.arraySize,
      );

      const usersMap = new Map<number, User>();
      for (const user of users) {
        usersMap.set(user.id, user);
      }

      this.benchmark('Map (created once)', () => {
        for (const id of randomIds) {
          usersMap.get(id);
        }
      });
    }
  }

  example4() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 4: Performance Comparison - All Approaches');
    console.log('='.repeat(60));

    const testConfig = { arraySize: 10000, lookups: 1000 };
    const users = this.createUsers(testConfig.arraySize);
    const randomIds = this.generateRandomIds(
      testConfig.lookups,
      testConfig.arraySize,
    );

    console.log(
      `\nComparing approaches with Array Size: ${testConfig.arraySize}, Lookups: ${testConfig.lookups}\n`,
    );

    const results: { name: string; time: number }[] = [];

    results.push(
      this.benchmark('Array.find()', () => {
        for (const id of randomIds) {
          users.find((u) => u.id === id);
        }
      }),
    );

    results.push(
      this.benchmark('Map (created each iteration)', () => {
        const usersMap = new Map<number, User>();
        for (const user of users) {
          usersMap.set(user.id, user);
        }
        for (const id of randomIds) {
          usersMap.get(id);
        }
      }),
    );

    const usersMap = new Map<number, User>();
    for (const user of users) {
      usersMap.set(user.id, user);
    }

    results.push(
      this.benchmark('Map (created once)', () => {
        for (const id of randomIds) {
          usersMap.get(id);
        }
      }),
    );

    console.log('\n📊 Summary:');
    results.sort((a, b) => a.time - b.time);
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.name}: ${result.time.toFixed(2)}ms`);
    });
  }
}
