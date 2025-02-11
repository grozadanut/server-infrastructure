#!/bin/bash
#Purpose = Check db backups were performed daily
cd /mnt/D/linicserver_backup_safe
DATE=$(date +"%Y-%m-%d")
FILENAME="colibri_stat_db_${DATE}*"
if compgen -G "$FILENAME" > /dev/null; then
   echo "OK"
else
   LINICR="colibri_stat_db FAILED!!!"
   php /home/linicserver/web2sms.php "+407xxx" "${LINICR}"
fi
