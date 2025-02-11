set hour=%time:~0,2%
if "%hour:~0,1%" == " " set hour=0%hour:~1,1%
set min=%time:~3,2%
if "%min:~0,1%" == " " set min=0%min:~1,1%

set dateformat=%date:~6,4%-%date:~3,2%-%date:~0,2%_%hour%-%min%
SET PGPASSWORD=[pass]
SET LINICSERVERPASS=[pass]

"C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" -U postgres -Z6 colibri_stat_db > D:\work\backup\colibri_stat_db_%dateformat%.gz
"C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" -U postgres -Z6 cloud-anaf-connector > D:\work\backup\cloud-anaf-connector_%dateformat%.gz
"C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" -U postgres -Z6 cloud-product-synchronizer > D:\work\backup\cloud-product-synchronizer_%dateformat%.gz
"C:\Program Files\PostgreSQL\10\bin\pg_dump.exe" -U postgres -Z6 moqui > D:\work\backup\moqui_%dateformat%.gz

D:
cd D:\work\PuTTY
set from1=D:\work\backup\colibri_stat_db_%dateformat%.gz
set from2=D:\work\backup\cloud-anaf-connector_%dateformat%.gz
set from3=D:\work\backup\cloud-product-synchronizer_%dateformat%.gz
set from4=D:\work\backup\moqui_%dateformat%.gz
pscp -pw %LINICSERVERPASS% %from1% linicserver@colibriserver.go.ro:/mnt/D/linicserver_backup_safe/
pscp -pw %LINICSERVERPASS% %from2% linicserver@colibriserver.go.ro:/mnt/D/linicserver_backup_safe/
pscp -pw %LINICSERVERPASS% %from3% linicserver@colibriserver.go.ro:/mnt/D/linicserver_backup_safe/
pscp -pw %LINICSERVERPASS% %from4% linicserver@colibriserver.go.ro:/mnt/D/linicserver_backup_safe/
