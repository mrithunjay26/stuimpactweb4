// next.config.js
module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.html$/,
            use: 'raw-loader',
            exclude: /node_modules/,
        });
        return config;
    },
    eslint: {
    ignoreDuringBuilds: true,
  },
};
