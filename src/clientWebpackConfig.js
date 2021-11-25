const commonWebpackConfig = require('./commonWebpackConfig')
const { inliningCss } = require('@rails/webpacker')

const configureClient = () => {
  const clientConfig = commonWebpackConfig()

  //plugins
  if (inliningCss ) {
    const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
    clientConfig.plugins.push(
      new ReactRefreshWebpackPlugin({
        overlay:{
          sockPort: devServer.port
        }
      })
    )
  }

  // server-bundle is special and should ONLY be built by the serverConfig
  // In case this entry is not deleted, a very strange "window" not found
  // error shows referring to window["webpackJsonp"]. That is because the
  // client config is going to try to load chunks.
  delete clientConfig.entry['server-bundle']

  return clientConfig
}

module.exports = configureClient
