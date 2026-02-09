export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    // Ensure a single copy of React is used in tests
    moduleNameMapper: {
        '^react$': '<rootDir>/node_modules/react',
        '^react-dom$': '<rootDir>/node_modules/react-dom',
        '.*appEnv$': '<rootDir>/src/__mocks__/envMock.js',
        '^pdfjs-dist$': '<rootDir>/src/__mocks__/pdfjsDistMock.js',
        '^pdfjs-dist/.*$': '<rootDir>/src/__mocks__/pdfjsDistMock.js',
    },
    // Transform import.meta syntax
    transformIgnorePatterns: [
        '/node_modules/(?!(until-async|msw|@mswjs|@supabase|pdfjs-dist)/)',
    ],
};
