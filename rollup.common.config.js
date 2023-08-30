import htmlTemplate from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';

export default {
    input: 'src/js/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        scss({
            insert: true,
            sourcemap: true,
        }),
        htmlTemplate({
            template: 'src/index.html',
            target: 'index.html',
        })
    ]
}