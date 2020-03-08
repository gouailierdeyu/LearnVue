const webpack=require('webpack');
module.exports={
    publicPath: '/view/account',
    devServer:{
      port:82,
      proxy:{
          '/': {
              //target: 'http://localhost/',
              target: 'https://canerme.cn/', //对应自己的接口
              changeOrigin: true,
              ws: true
          }
      }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
                Popper: ['popper.js', 'default']
            })
        ],
        performance: {
            hints: false

        }
    }
};