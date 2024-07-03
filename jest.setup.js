const failOnConsole = require('jest-fail-on-console')

class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

failOnConsole()

global.IntersectionObserver = IntersectionObserver;