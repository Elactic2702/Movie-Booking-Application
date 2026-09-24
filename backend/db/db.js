const { Pool } = require("pg");
const dns = require("dns");
const dotenv = require("dotenv");

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000
});

pool.on("connect", () => {
    console.log("PostgreSQL connected");
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL error:", error);
});

module.exports = pool;