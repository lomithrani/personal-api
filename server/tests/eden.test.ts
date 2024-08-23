import { test, expect, describe, beforeAll, afterAll } from 'bun:test'
import { edenTreaty } from '@elysiajs/eden'
import type { Portfolio } from '..'
import { Subprocess } from 'bun';

let appInstance: Subprocess<"ignore", "inherit", "inherit"> | undefined = undefined;

const api = edenTreaty<Portfolio>("http://localhost:3000");

describe("edenTreaty", () => {
  beforeAll(async () => {
    appInstance = Bun.spawn({
      cmd: ['bun', 'run', 'index.ts'],
      env: process.env,
      stdout: 'inherit',
      stderr: 'inherit',
    });
    await Bun.sleep(10000);

  });

  afterAll(() => {
    if (appInstance) {
      appInstance.kill();
    }
  });

  test("edenTreaty should have correct methods", async () => {
    expect(api).toBeDefined()
    expect(api.login.post).toBeDefined()
    expect(api.domain[':name'].get).toBeDefined()
  })

  test("edentTreaty should return correct responses", async () => {
    const mySelfDomainResponse = await api.domain['louis.gentil'].get()
    expect(mySelfDomainResponse).toBeDefined()
    expect(mySelfDomainResponse.status).toBe(200)
    expect(mySelfDomainResponse.data).toBeDefined()
    expect(mySelfDomainResponse.data).toBeObject()
  })

})


