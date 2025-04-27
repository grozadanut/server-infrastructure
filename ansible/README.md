# How to use

If you want to use this ansible playbook you have to first run the script: `scripts/initial-setup.sh`

To make the script executable:
`chmod u+x initial-setup.sh`

Then you can run ansible normally, like so:
`ansible-playbook main.yml -K --ask-vault-pass`

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

- `digi_storage_user` - storage.rcs-rds.ro username for remote backup, needed for remote backup of database
- `digi_storage_pass` - storage.rcs-rds.ro password for remote backup, needed for remote backup of database.
NOTE that this password should be obscured as per rclone koofr(aka Digi Storage) requirements, see https://rclone.org/commands/rclone_obscure/
- `pgbackrest_cipher_pass` - password for the postgresql backup repo, needed to save snapshots of the database locally
- `restic_repo_pass` - restic repo encryption key, needed to backup `/data` folder; note that 
restic also depends on `s3` credentials as the repo is backed up directly on the remote location
- `s3_endpoint` - endpoint of the s3 bucket where the backups should be stored
- `s3_bucket` - name of the s3 bucket where the backups should be stored
- `s3_key` - keyID of the application key in case of Backblaze B2
- `s3_secret` - applicationKey in case of Backblaze B2
- (optional) `claim_token`: netdata token, needed for Netdata monitoring
- (optional) `claim_rooms`: netdata room, needed for Netdata monitoring
- (optional) `sentry_backup_dsn`: sentry dsn of the project where you want to send backup logs

Set Netdata Cloud claiming details. To find your `claim_token` and
`claim_room`, go to Netdata Cloud, then click on your Space's name in the top
navigation, then click on `Manage your Space`. Click on the `Nodes` tab in the
panel that appears, which displays a script with `token` and `room` strings.

example: <br>
`env EDITOR=nano ansible-vault create host_vars/main-server/vars.yml` <br>
`pgbackrest_cipher_pass: "pass"` <br>
`env EDITOR=nano ansible-vault edit host_vars/main-server/vars.yml` <br>

# Troubleshooting

1. `ERROR: [087]: archive_mode must be enabled`

You might get the above error the first time you run the playbook on a new installation. For some reason the postgresql service is not reloaded after changing the configuration. The solution is to just reload postgresql, and run the playbook again.

Solution: `systemctl restart postgresql`