#!/bin/bash
gzip -k -d colibri_stat_db_2025-02-20_13-30.gz
psql -U linic -d colibri_stat_db -f colibri_stat_db_2025-02-20_13-30 -h localhost