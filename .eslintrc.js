module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "@ryan-rushton/eslint-config",
        "@ryan-rushton/eslint-config/react-prettier",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
        "prettier/@typescript-eslint"
    ],
    rules: {
        "react/prop-types": "off",
        "@typescript-eslint/typedef": [
            "error",
            {
                arrowParameter: true,
                memberVariableDeclaration: false,
                parameter: true,
                propertyDeclaration: true
            }
        ]
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".module.scss$"]
            }
        },
        "import/extensions": [".js", ".ts", ".jsx", ".tsx", ".module.scss$"]
    }
};
