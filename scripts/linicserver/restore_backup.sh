#!/bin/bash
scp gdany@colibriserver.go.ro:/mnt/D/linicserver_backup_safe/colibri_stat_db_2025-02-20_13-30.gz /home/danut
gzip -k -d colibri_stat_db_2025-02-20_13-30.gz
psql -U linic -d colibri_stat_db -f colibri_stat_db_2025-02-20_13-30 -h localhost