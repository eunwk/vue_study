const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode : "development", // 배포시 production
    devtool: 'eval', // 개발시 eval (웹펙 빌드 속도 빠름), 배포시 hidden-source-map
    resolve: {
        // resolve의 extensions 에 등록을 하면 vue 파일에서 다른파일 import 시 해당 확장자를 생략 할 수 있다.
        // 예
        // import NumberBaseball from './NumberBaseball.vue'
        // import NumberBaseball from './NumberBaseball'
        extensions: ['.vue', '.js'],
    },
    entry: {
        // app: '.main.js',   // 여기에서 키값(app) : 만들어진 js 파일들이 최종적으로 app.js로 합쳐진다.
        app: path.join(__dirname, 'main.js'),
    },   
    
    module: {
        // 특정 확장자의 파일을 만났을 때, 해당하는 파일을 읽을 수 있도록 loader를 연결
        rules: [{
               test: /\.vue$/,
               use: 'vue-loader',
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ],
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ], 
    output: {
        filename : 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dest', // dev-server 사용할 때 추가
       // filename : '[name].js' 위 app.js 라고 쓴것과 동일함.
    },
    // devServer: {
    //     contentBase: './'
    // }
};