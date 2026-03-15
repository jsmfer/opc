/**
 * MySQL 数据库连接配置
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 加载环境变量（默认加载当前目录的.env文件）
dotenv.config();

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'opc_website',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

/**
 * 获取数据库连接
 */
export async function getConnection() {
  return await pool.getConnection();
}

/**
 * 执行 SQL 查询
 */
export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/**
 * 初始化数据库表
 */
export async function initDatabase() {
  const connection = await getConnection();
  try {
    // 创建网站内容表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS website_content (
        id INT PRIMARY KEY AUTO_INCREMENT,
        section_name VARCHAR(50) NOT NULL UNIQUE,
        section_data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_section_name (section_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ 数据库表初始化完成');
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * 检查数据库连接
 */
export async function checkConnection() {
  try {
    const connection = await getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error.message);
    return false;
  }
}

export { pool };
export default pool;
