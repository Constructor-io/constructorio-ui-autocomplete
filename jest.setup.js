const failOnConsole = require('jest-fail-on-console')
require('whatwg-fetch')

class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

failOnConsole()

global.IntersectionObserver = IntersectionObserver;