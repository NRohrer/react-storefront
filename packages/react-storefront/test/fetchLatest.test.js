/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import { fetchLatest, StaleResponseError } from '../src/fetchLatest'

describe('fetchLatest', () => {
  it('should throw an error when a response is received out of order', () => {
    let delay = 500

    let mockFetch = () => {
      return new Promise((resolve, reject) => {
        if (delay) {
          delay = null
          setTimeout(() => resolve(true), delay)
        } else {
          resolve(true)
        }
      })
    }

    const fetch = fetchLatest(mockFetch)
    expect.assertions(2)

    return Promise.all([
      fetch().catch(e => expect(StaleResponseError.is(e)).toBe(true)),
      expect(fetch()).resolves.toBe(true)
    ])
  })

  it('should succeed when requests come back in order', async () => {
    let mockFetch = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 100)
      })
    }

    const fetch = fetchLatest(mockFetch)

    expect(await fetch()).toBe(true)
    expect(await fetch()).toBe(true)
  })

  it('should export StaleResponseError', () => {
    expect(StaleResponseError).toBeDefined()
  })
})
