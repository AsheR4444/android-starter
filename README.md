
# LDPlayer Automation Scripts

Этот репозиторий предназначен для быстрого развёртывания скриптов, которые выполняют действия внутри эмулятора Android - LDPlayer.

## Возможности

- Запуск сервера Appium
- Остановка сервера Appium
- Запуск указанного профиля LDPlayer
- Установка/удаление приложений Telegram и SuperProxy
- Настройка прокси через SuperProxy

## Установка и настройка

### 1. Установите LDPlayer

Скачайте и установите LDPlayer по ссылке: [https://ldplayer.net/](https://ldplayer.net/).

### 2. Установите зависимости

Перейдите в директорию проекта и выполните команду:

\`\`\`bash
npm i
\`\`\`

### 3. Настройте файл \`data.json\`

Создайте или отредактируйте файл \`data.json\` в корневой директории проекта. Он должен содержать массив с данными профилей в формате:

\`\`\`json
[
    {
        "ip": "IP-адрес прокси",
        "port": "Порт прокси",
        "name": "Имя профиля в LDPlayer",
        "login": "Логин для прокси",
        "password": "Пароль для прокси"
    },
    ...
]
\`\`\`

### 4. Укажите путь до LDPlayer Console

Откройте файл \`src/config/config.ts\` и укажите путь до \`ldconsole.exe\` в переменной \`LD_CONSOLE_PATH\`. Обычно этот файл находится в папке установки LDPlayer.

Пример:

\`\`\`ts
export const LD_CONSOLE_PATH = "C:/Program Files/LDPlayer/LDPlayer4/ldconsole.exe";
\`\`\`

## Инструкция по установке сторонних настроек (ВАЖНО!)

Для более подробной информации по настройке сторонних модулей, воспользуйтесь [этой инструкцией](https://community.bablosoft.com/topic/22694/android-manager-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C-%D0%B4%D0%BB%D1%8F-%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-android-%D1%8D%D0%BC%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80%D0%B0%D0%BC%D0%B8).

## Вопросы

Если у вас есть вопросы, не стесняйтесь задать их. 


## Подпишитесь на мой Telegram-канал

Чтобы быть в курсе обновлений и получать больше полезной информации, подписывайтесь на мой канал в Telegram: [https://t.me/degencoding](https://t.me/degencoding).

![Coding Crypto Degen Club](./image.png)
