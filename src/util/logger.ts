// デファクトのロガーパッケージwinstonを利用
import winston from 'winston'
const format = winston.format

const logger = winston.createLogger({
    // ログレベルを'info'に設定
    level:'info',
    // 下記は動作モードによりログレベルを切り替える例
    // level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    
    // ログのフォーマットのデフォルトはjson形式で日時表示も無しのため、
    // 一般的なCUIぽいフォーマット（日時付き）に設定
    format: format.combine(
        format.timestamp({format:'YYYY/MM/DD HH:mm:ss'}),
        format.cli(),
        format.printf(log => `[${log.timestamp}] ${log.level} ${log.message}`)
    ),
    // transportsとはログの出力先の指定（コンソール、ファイル、HTTP、Streamから選択できる）
    transports:[
        new winston.transports.Console()
    ]
})
export default logger