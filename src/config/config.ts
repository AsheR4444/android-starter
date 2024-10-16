import 'dotenv/config'
import path from 'path';

import { AppInfoType } from '../types';

// TG data
const APP_ID = process.env.APP_ID;
const API_HASH = process.env.API_HASH;


const ROOT_DIR = path.resolve();
const APK_DIR = path.join(ROOT_DIR, 'src', 'apps');
const SESSIONS_DIR = path.join(ROOT_DIR, 'src', 'sessions');

const APPS_INFO: AppInfoType = {
    telegram: {
        id: 'org.telegram.messenger.web',
        appDir: path.join(APK_DIR, 'Telegram.apk')
    },
    superProxy: {
        id: 'com.scheler.superproxy',
        appDir: path.join(APK_DIR, 'SuperProxy.apk')
    }
} as const

const LD_CONSOLE_PATH = 'D:\\LDPlayer\\LDPlayer9\\ldconsole.exe'


export { ROOT_DIR, APK_DIR, APPS_INFO, SESSIONS_DIR, APP_ID, API_HASH, LD_CONSOLE_PATH }
