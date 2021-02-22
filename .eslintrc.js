/* eslint-disable */

module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'serviceworker': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {

        // Possible Errors
        'for-direction': [
            'error'
        ],
        'getter-return': [
            'warn'
        ],
        'no-compare-neg-zero': [
            'error'
        ],
        'no-cond-assign': [
            'error'
        ],
        'no-constant-condition': [
            'error'
        ],
        'no-dupe-args': [
            'error'
        ],
        'no-dupe-else-if': [
            'error'
        ],
        'no-dupe-keys': [
            'error'
        ],
        'no-duplicate-case': [
            'error'
        ],
        'no-empty': [
            'error'
        ],
        'no-ex-assign': [
            'error'
        ],
        'no-extra-boolean-cast': [
            'warn'
        ],
        'no-extra-semi': [
            'error'
        ],
        'no-setter-return': [
            'error'
        ],
        'no-template-curly-in-string': [
            'error'
        ],
        'no-unreachable': [
            'warn'
        ],
        'no-unreachable-loop': [
            'warn'
        ],
        'no-unsafe-finally': [
            'warn'
        ],
        'use-isnan': [
            'error'
        ],
        'valid-typeof': [
            'error'
        ],

        // Best Practices
        'accessor-pairs': [
            'warn'
        ],
        'array-callback-return': [
            'warn'
        ],
        'block-scoped-var': [
            'warn'
        ],
        'consistent-return': [
            'warn'
        ],
        'curly': [
            'warn'
        ],
        'default-case-last': [
            'error'
        ],
        'default-param-last': [
            'error'
        ],
        'dot-location': [
            'error',
            'property'
        ],
        'eqeqeq': [
            'error',
            'smart'
        ],
        'grouped-accessor-pairs': [
            'warn',
            'getBeforeSet'
        ],
        'no-case-declarations': [
            'warn'
        ],
        'no-constructor-return': [
            'warn'
        ],
        'no-else-return': [
            'warn'
        ],
        'no-empty-function': [
            'warn'
        ],
        'no-eq-null': [
            'error'
        ],
        'no-eval': [
            'warn'
        ],
        'no-extra-label': [
            'warn'
        ],
        'no-floating-decimal': [
            'error'
        ],
        'no-implied-eval': [
            'warn'
        ],
        'no-invalid-this': [
            'warn'
        ],
        'no-loop-func': [
            'warn'
        ],
        'no-magic-numbers': [
            'warn'
        ],
        'no-multi-spaces': [
            'error'
        ],
        'no-octal': [
            'error'
        ],
        'no-param-reassign': [
            'error'
        ],
        'no-redeclare': [
            'error'
        ],
        'no-return-assign': [
            'warn'
        ],
        'no-self-assign': [
            'error'
        ],
        'no-self-compare': [
            'error'
        ],
        'no-unmodified-loop-condition': [
            'warn'
        ],
        'no-unused-labels': [
            'error'
        ],
        'yoda': [
            'warn'
        ],

        // Variables
        'init-declarations': [
            'warn',
            'always'
        ],
        'no-label-var': [
            'warn'
        ],
        'no-unused-vars': [
            'error'
        ],
        'no-use-before-define': [
            'warn'
        ],

        // Stylistic Issues
        'array-bracket-newline': [
            'warn',
            'consistent'
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'array-element-newline': [
            'warn',
            'consistent'
        ],
        'block-spacing': [
            'warn'
        ],
        'brace-style': [
            'warn'
        ],
        'camelcase': [
            'warn'
        ],
        'comma-dangle': [
            'warn',
            'never'
        ],
        'comma-spacing': [
            'warn'
        ],
        'comma-style': [
            'warn',
            'last'
        ],
        'computed-property-spacing': [
            'warn',
            'never'
        ],
        'func-call-spacing': [
            'warn',
            'never'
        ],
        'function-call-argument-newline': [
            'warn',
            'consistent'
        ],
        'function-paren-newline': [
            'warn',
            'consistent'
        ],
        'implicit-arrow-linebreak': [
            'warn',
            'beside'
        ],
        'key-spacing': [
            'warn',
            {
                'beforeColon': false
            }
        ],
        'keyword-spacing': [
            'warn'
        ],
        'linebreak-style': [
            'warn',
            'unix'
        ],
        'lines-between-class-members': [
            'warn',
            'always'
        ],
        'no-lonely-if': [
            'warn'
        ],
        'no-multiple-empty-lines': [
            'warn',
            {
                'max': 3
            }
        ],
        'no-nested-ternary': [
            'warn'
        ],
        'no-unneeded-ternary': [
            'warn'
        ],
        'no-whitespace-before-property': [
            'warn'
        ],
        'operator-linebreak': [
            'warn',
            'after'
        ],
        'quote-props': [
            'warn',
            'as-needed'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'semi-spacing': [
            'warn'
        ],
        'semi-style': [
            'warn',
            'last'
        ],
        // 'sort-keys': [
        //     'warn'
        // ],
        // 'sort-vars': [
        //     'warn'
        // ],
        'space-before-blocks': [
            'warn'
        ],
        'space-before-function-paren': [
            'warn',
            'never'
        ],
        'space-in-parens': [
            'warn',
            'never'
        ],
        'space-infix-ops': [
            'warn'
        ],
        'space-unary-ops': [
            'warn'
        ],
        'template-tag-spacing': [
            'warn',
            'always'
        ],


        // ECMAScript 6
        'arrow-body-style': [
            'warn',
            'as-needed'
        ],
        'arrow-parens': [
            'error',
            'always'
        ],
        'arrow-spacing': [
            'error'
        ],
        'no-const-assign': [
            'error'
        ],
        'no-duplicate-imports': [
            'warn'
        ],
        'no-useless-computed-key': [
            'warn'
        ],
        'no-useless-constructor': [
            'warn'
        ],
        'no-useless-rename': [
            'warn'
        ],
        'prefer-arrow-callback': [
            'warn'
        ],
        'prefer-const': [
            'warn'
        ],
        'prefer-numeric-literals': [
            'warn'
        ],
        'prefer-template': [
            'warn'
        ],
        'rest-spread-spacing': [
            'error',
            'never'
        ],
        // 'sort-imports': [
        //     'error'
        // ],
        'template-curly-spacing': [
            'error'
        ],
        'yield-star-spacing': [
            'error',
            'before'
        ],


        // 'require-jsdoc': [
        //     'warn',
        //     {
        //         'require': {
        //             'FunctionDeclaration': true,
        //             'MethodDefinition': true,
        //             'ClassDeclaration': true,
        //             'ArrowFunctionExpression': true,
        //             'FunctionExpression': true
        //         }
        //     }
        // ]
    }
};
