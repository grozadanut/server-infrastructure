# How to use

If you want to use this ansible playbook you have to first run the script: `scripts/initial-setup.sh`

To make the script executable:
`chmod u+x initial-setup.sh`

Then you can run ansible normally, like so:
`ansible-playbook main.yml --ask-vault-pass`

## Ansible variables

There are 3 type of variables you can define:

1. Host variables - specific to a certain host, they go in 
`host_vars/{{ inventory_hostname }}/vars.yml` or simply `host_vars/{{ inventory_hostname }}.yml`
2. Group variables - specific to a group of hosts, they go in 
`group_vars/{groupname}/vars.yml` or simply `group_vars/{groupname}.yml`
3. Global variables - valid for all hosts, you can set these in `group_vars/all.yml`

Note: `{{ inventory_hostname }}` is the hostname as defined in hosts, eg. `main-server`

## Mandatory variables

Before running the playbook, these variables must be defined:

- `pgbackrest_cipher_pass` - encryption password for the postgresql backup repo
- `restic_repo_pass` - restic repo encryption key, needed to backup `/data` folder; note that 
restic also depends on `s3` credentials as the repo is backed up directly on the remote location
- `s3_endpoint` - endpoint of the s3 bucket where the backups should be stored
- `s3_bucket` - name of the s3 bucket where the backups should be stored
- `s3_key` - keyID of the application key in case of Backblaze B2
- `s3_secret` - applicationKey in case of Backblaze B2
- (optional) `sentry_backup_dsn`: sentry dsn of the project where you want to send backup logs

Database:
- `flexbiz_password` - postgresql password for the user: flexbiz. Used to connect to the host postgres database from docker containers
- `zitadel_user` - postgresql user for the auth database
- `zitadel_password` - postgresql password for the auth database
- `colibri_stat_db_user` - for COLIBRI tenant, database user
- `colibri_stat_db_password` - for COLIBRI tenant, database password
- `xwiki_db_user` - postgresql user for the xwiki database
- `xwiki_db_password` - postgresql password for the xwiki database
- `mediacms_db_user` - postgresql user for the mediacms database
- `mediacms_db_password` - postgresql password for the mediacms database
Data:
- `storagebox_user` - user of the Hetzner storage box; for mounting data as a CIFS share
- `storagebox_password` - password of storage box
- `storagebox_video_url` - url of Hetzner storage box for videos subaccount
- `storagebox_video_user` - user of the Hetzner storage box subaccount; for mounting videos data
- `storagebox_video_password` - password of video subaccount storage box

example: <br>
`env EDITOR=nano ansible-vault create host_vars/main-server/vars.yml` <br>
`pgbackrest_cipher_pass: "pass"` <br>
`env EDITOR=nano ansible-vault edit host_vars/main-server/vars.yml` <br>

# Troubleshooting

1. `ERROR: [087]: archive_mode must be enabled`

You might get the above error the first time you run the playbook on a new installation. For some reason the postgresql service is not reloaded after changing the configuration. The solution is to just reload postgresql, and run the playbook again.

Solution: `systemctl restart postgresql`