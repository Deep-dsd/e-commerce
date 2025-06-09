import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  
  // Specify where to look for tests
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/*.(test|spec).[jt]s?(x)',
    '<rootDir>/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/**/*.(test|spec).[jt]s?(x)'
  ],
  
  // Module name mapping for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Directories to search for modules
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // File extensions Jest will process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Don't specify transform - Next.js handles this
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Ignore patterns
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  
  // Clear mocks between tests
  clearMocks: true,
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)