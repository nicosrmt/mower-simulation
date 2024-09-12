export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
