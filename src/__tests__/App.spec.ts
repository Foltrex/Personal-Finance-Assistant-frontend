import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

describe('App', () => {
  it('mounts renders properly', () => {
    expect('You did it!').toContain('You did it!')
  })
})