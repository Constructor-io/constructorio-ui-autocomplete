import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { apiExtractor } from 'rollup-plugin-api-extractor';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false
        }
      }),
      apiExtractor({
        configFile: './api-extractor.json',
        configuration: {
          projectFolder: '.',
          compiler: {
            tsconfigFilePath: './tsconfig.apidocs.json'
          }
        }
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      postcss(),
      terser()
    ]
  }
];
