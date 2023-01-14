# Mysql

## 常用SQL语句

```sql
ALTER TABLE chihiro_gitlab_detail 
DROP COLUMN gitlab_id,
ADD UNIQUE INDEX (gitlab_clone_url);
```



```sql
CREATE TABLE chihiro_code_count (
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

推荐使用时间戳（无论在哪个时区，时间戳是一样的，避免Mysql、容器、Node环境下个各个依赖，采用不同时区带来的问题）

```sql
`create_time` datetime not null DEFAULT CURRENT_TIMESTAMP comment '行插入时间',  
`update_time` datetime not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '行修改时间',
```



