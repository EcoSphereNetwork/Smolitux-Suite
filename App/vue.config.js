module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'electron/preload.js',
      nodeIntegration: true,
      builderOptions: {
        appId: 'com.smolitux.suite',
        productName: 'Smolitux Suite',
        copyright: 'Copyright © 2024 Smolitux',
        directories: {
          output: 'dist_electron'
        },
        mac: {
          target: ['dmg', 'zip'],
          category: 'public.app-category.productivity',
          icon: 'public/icons/icon.icns'
        },
        win: {
          target: ['nsis', 'zip'],
          icon: 'public/icons/icon.ico',
          publisherName: 'Smolitux'
        },
        linux: {
          target: ['AppImage', 'deb'],
          icon: 'public/icons',
          category: 'Utility'
        },
        extraFiles: [
          {
            from: 'extra-resources/',
            to: 'resources/',
            filter: ['**/*']
          }
        ]
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions,
          preserveWhitespace: false
        };
        return options;
      });
  }
};
