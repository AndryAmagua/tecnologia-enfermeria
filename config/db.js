const mysql = require('mysql2/promise');

export default async function openDB() {
    try {
        return await mysql.createConnection({
            host: 'bmn00vx6aq2ykjebktqi-mysql.services.clever-cloud.com',
            user: 'uc9wjdgmpayb7ldb',
            password: '3A4HYwJGkpCupQmrv2kK',
            database: 'bmn00vx6aq2ykjebktqi',
            port: '3306',
            connectTimeout: 30000,
        })
    } catch {
        return ({ estado: false })
    }

}

