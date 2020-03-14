-- 查询出版社
SELECT
 *
FROM
 question_dictionary
WHERE
 CHARACTER_LENGTH(node) = 6
AND node_type = 21
AND node LIKE '102%';
-- 年级
SELECT
 *
FROM
 question_dictionary
WHERE
 node LIKE '102115%'
and CHARACTER_LENGTH(node) = 9
AND node_type = 21;
-- 目录
SELECT
 *
FROM
 question_dictionary
WHERE
 node LIKE '102115101%'
and CHARACTER_LENGTH(node) = 12
AND node_type = 21;
-- 章节
SELECT
 *
FROM
 question_dictionary
WHERE
 node LIKE '102115101101%'
and CHARACTER_LENGTH(node) = 15
AND node_type = 21;

-- {nodeName: "1忆读书", node: "101105101101101"}