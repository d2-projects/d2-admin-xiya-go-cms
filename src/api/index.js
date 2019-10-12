const files = require.context('./modules', false, /\.js$/)
export default files.keys().map(key => files(key).default)
