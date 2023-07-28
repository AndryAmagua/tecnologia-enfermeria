const mysql = require('mysql2/promise');

export default async function openDB() {
    try {
        return await mysql.createConnection({
            host: 'be26w4plswpemwnfdvv9-mysql.services.clever-cloud.com',
            user: 'utbtofituivibr58',
            password: 'NJAhQvAMiqdJ2uMGBuoZ',
            database: 'be26w4plswpemwnfdvv9',
            port: '3306',
            connectTimeout: 30000,
        })
    } catch {
        return ({ estado: false })
    }

}

