# Mysql

## 修改表结构

```sql
ALTER TABLE chihiro_gitlab_detail 
DROP COLUMN gitlab_id,
```

## 建表

```sql
CREATE TABLE 表名 (
  id int(11) NOT NULL AUTO_INCREMENT comment '记录id',
  create_time datetime not null DEFAULT CURRENT_TIMESTAMP comment '行插入时间',  
 update_time datetime not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '行修改时间',
  add_num int(255) NOT NULL comment '增加行数',
  remove_num int(255) NOT NULL comment '删除行数',
  total_num int(255) NOT NULL comment '总变化行数',
  repo_rid int(11) NOT NULL comment '仓库信息id',
  PRIMARY KEY (`id`)
)comment '代码统计数据表';
```

注意：

```sql
`create_time` datetime not null DEFAULT CURRENT_TIMESTAMP comment '行插入时间',  
`update_time` datetime not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '行修改时间',
```

## 增加索引

```shell
ALTER TABLE chihiro_gitlab_detail ADD INDEX idx_group_id (group_id);

# alter table 表名 add index 索引名(列名)
```

## 聚集函数

当有分组时，Select只能是聚集函数、分组字段

```sql
SELECT count(*) AS total,字段A 
FROM 表名
GROUP BY 字段A
```

还有一种用法，SUM(字段B)用来一个组内的字段B求和，但是B字段是性别，即man、woman

我们也可以通过WHEN只统计组内的部分信息

```sql
SELECT SUM(CASE WHEN 字段B='man' THEN 1 ELSE 0 END) AS 字段B
FROM 表名
GROUP BY 字段A
```

