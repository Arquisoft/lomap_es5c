export default {
    transformIgnorePatterns: [
        'node_modules/(?!(fetch)/)',
        'node_modules/(?!(monaco-editor)/)',
        '^.+\\.module.(css||sass||scss)$',
    ]
}