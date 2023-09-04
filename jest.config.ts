module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './jest.setup.ts'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
