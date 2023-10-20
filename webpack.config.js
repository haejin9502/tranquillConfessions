const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = (env, argv) =>  {
    return {
        mode : 'production',
        entry:{
            index : './src/js/index.js',
            main : './src/js/main.js'
        },
        output : {
            path : path.resolve('./dist'),
            filename : './js/[name].js'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                      from: 'src/img', // 이미지가 있는 디렉토리 경로
                      to: 'images', // 번들된 디렉토리 경로
                    },
                ],
            }),
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ],
        module: {
            rules:[
                {
                    test:/\.s?css$/,
                    use:[
                        'style-loader',
                        { loader: "css-loader", options: { url: false } },
                        'sass-loader', 
                        ]
                }
            ]
        }
    }
}

