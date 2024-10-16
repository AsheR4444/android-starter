type AccountData = {
    ip: string
    port: number
    login: string
    password: string
    name: string
}

type ProxyType = {
    protocol: 'http' | 'socks5'
    ip: string
    port: string
    login?: string
    password?: string
}

enum AppsNames {
    telegram = "telegram",
    superProxy = "superProxy"
}

type AppInfoType = {
    [key in AppsNames]: {
        id: string,
        appDir: string
    }
}

export type { AccountData, ProxyType, AppInfoType }