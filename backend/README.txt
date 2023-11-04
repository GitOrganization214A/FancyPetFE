Django后端项目

超级用户：214a
密码：fancy


需要在本地建立MySQL数据库
名称：fancypet
用户：214a
密码：fancy

-- 创建新的数据库
CREATE DATABASE fancypet;

-- 创建新的用户
CREATE USER '214a'@'localhost' IDENTIFIED BY 'fancy';

-- 给新用户授权访问新数据库的权限
GRANT ALL PRIVILEGES ON fancypet.* TO '214a'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;