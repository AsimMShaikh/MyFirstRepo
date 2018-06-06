const webpack = require('webpack');
const path = require('path');
const ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJs = require('uglifyjs-webpack-plugin');

var clientRoot = path.resolve(__dirname);
var clientSrc = path.join(clientRoot, 'client');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

const extractCss = new MiniCssExtractPlugin({
  filename: "css/[name].css",
});

module.exports = {
    context: root('angular'),
    stats: {
      assets: true,
      // Sort assets by a field
      // You can reverse the sort with `!field`.
      //assetsSort: "field",
      // Add information about cached (not built) modules
      cached: true,
      // Show cached assets (setting this to `false` only shows emitted files)
      cachedAssets: true,
      // Add children information
      children: false,
      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: false,
      // Add built modules information to chunk information
      chunkModules: false,
      // Add the origins of chunks and chunk merging info
      chunkOrigins: true,
      // Sort the chunks by a field
      // You can reverse the sort with `!field`. Default is `id`.
      //chunksSort: "field",
      // Context directory for request shortening
      //context: "../src/",
      // `webpack --colors` equivalent
      colors: true,
      // Display the distance from the entry point for each module
      //depth: false,
      // Display the entry points with the corresponding bundles
      entrypoints: false,
      // Add --env information
      env: false,
      // Add errors
      errors: true,
      // Add details to errors (like resolving log)
      errorDetails: true,
      // Exclude assets from being displayed in stats
      // This can be done with a String, a RegExp, a Function getting the assets name
      // and returning a boolean or an Array of the above.
      //excludeAssets: "filter" | /filter/ | (assetName) => ... return true|false |
      //  ["filter"] | [/filter/] | [(assetName) => ... return true|false],
      excludeAssets: [/fonts/,/index/,/vendor/,/scripts/],
      // Exclude modules from being displayed in stats
      // This can be done with a String, a RegExp, a Function getting the modules source
      // and returning a boolean or an Array of the above.
      //excludeModules: "filter" | /filter/ | (moduleSource) => ... return true|false |
      //  ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],
      excludeModules: [/libs/,/node_modules/,/scripts/],
      exclude: [/fonts/,/index/,/vendor/,/scripts/],
      // See excludeModules
      //exclude: "filter" | /filter/ | (moduleSource) => ... return true|false |
      //  ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],
      // Add the hash of the compilation
      //hash: true,
      // Set the maximum number of modules to be shown
      maxModules: 3,
      // Add built modules information
      modules: true,
      // Sort the modules by a field
      // You can reverse the sort with `!field`. Default is `id`.
      //modulesSort: "field",
      // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
      moduleTrace: false,
      // Show performance hint when file size exceeds `performance.maxAssetSize`
      performance: false,
      // Show the exports of the modules
      providedExports: false,
      // Add public path information
      publicPath: false,
      // Add information about the reasons why modules are included
      reasons: false,
      // Add the source code of modules
      //source: true,
      // Add timing information
      timings: true,
      // Show which exports of a module are used
      usedExports: false,
      // Add webpack version information
      version: false,
      // Add warnings
      warnings: true
    },
    entry: {
        app: ['./index.js'],
        vendor: ['./vendor.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../'
                    }
                  },
                  "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../'
                    }
                  },
                  "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      limit: 1000,
                      name: "fonts/[name].[ext]"
                    }
                  }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            angular: path.join(__dirname, "angular/additionals/angular.js"),
            jquery: "jquery/src/jquery",
            'jquery-mousewheel': path.join(__dirname, "angular/additionals/jquery.mousewheel.js")
        },
        extensions: ['.js', '.html', '.css']
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        extractCss
    ],
    target: 'electron-renderer',
    optimization: {
        splitChunks: {
        cacheGroups: {
            commons: {
            test: /([\\/](additionals|styles)[\\/])/,
            name: "vendor",
            chunks: "initial"
            }
        }
        }
    }
};
