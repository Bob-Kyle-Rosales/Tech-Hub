module.exports = {
  webpackConfig: {
    resolve: {
      extensions: ['.tsx', '.ts', '.js'], // Resolve TypeScript and JavaScript files
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/, // TypeScript files
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader', // Use ts-loader for TypeScript files
          },
        },
      ],
    },
  },
  // Other style guide configuration options
};
