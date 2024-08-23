import { test, expect } from 'bun:test'
import { edenTreaty } from '@elysiajs/eden'
import type { Portfolio } from '..'

const api = edenTreaty<Portfolio>("http://localhost:3000");

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
