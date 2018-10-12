module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },
    collectCoverageFrom: [
        'src/**/*.{js,ts,tsx}'
    ],
    testMatch: [
        '**/src/**/*.(test|spec).+(ts|tsx)'
    ],
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': './node_modules/react-app-rewired/scripts/utils/babelTransform.js',
        '^.+\\.css$': './node_modules/react-scripts/config/jest/cssTransform.js',
        '^(?!.*\\.(js|ts|tsx|jsx|mjs|css|json)$)': './node_modules/react-scripts/config/jest/fileTransform.js',
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    rootDir: '.',
    testPathIgnorePatterns: ['node_modules']
  };
