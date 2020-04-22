const path = require('path')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 4000
  },
  env: {
    baseUrl: process.env.BASE_URL || '/api'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css', 'element-ui/lib/theme-chalk/index.css', './assets/styles/index.scss'],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    './static/icons'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // 配置选项
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: `http://localhost:3000`,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  // 开发环境配置
  dev: {

  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push()
      }

      config.resolve.alias.api = path.resolve(__dirname, 'api')
      config.resolve.alias.components = path.resolve(__dirname, 'components')
      config.resolve.alias.assets = path.resolve(__dirname, 'assets')
      config.resolve.alias.utils = path.resolve(__dirname, 'utils')
      config.resolve.alias.layouts = path.resolve(__dirname, 'layouts')
      config.resolve.alias.router = path.resolve(__dirname, 'router')
      config.resolve.alias.pages = path.resolve(__dirname, 'pages')
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxAsyncRequests: 7,
        cacheGroups: {
          vuetify: {
            test: /node_modules[\\/]vuetify/,
            chunks: 'all',
            priority: 20,
            name: true
          },
          elementui: {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          }
        }
      }
    }
  }
}
