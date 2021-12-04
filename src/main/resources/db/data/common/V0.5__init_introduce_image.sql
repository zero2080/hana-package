ALTER TABLE `file`
    modify `target_id` VARCHAR(36) default null;
INSERT INTO `file` (`id`, `target`, `target_id`, `type`, `sort_order`)
VALUES ('aaaaaa01-aaaa-aaaa-aaaa-aaaaaaaaaa00', 3, null, 'png', 0),
       ('aaaaaa01-aaaa-aaaa-aaaa-aaaaaaaaaa01', 4, null, 'png', 0);