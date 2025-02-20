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

Note: `{{ inventory_hostname }}` is the hostname as defined in hosts, eg. `main_server`

## Mandatory variables

Before running the playbook, these variables must be defined:

- `digi_storage_user` - storage.rcs-rds.ro username for remote backup, needed for remote backup of both database and data repos
- `digi_storage_pass` - storage.rcs-rds.ro password for remote backup, needed for remote backup of both database and data repos
- `pgbackrest_cipher_pass` - password for the postgresql backup repo, needed to save snapshots of the database locally
- `restic_repo_pass` - password for the restic backup repo, needed to backup `/data` folder; note that 
restic also depends on `digi_storage` credentials as the repo is backed up directly on the remote location
- `claim_token`: netdata token, needed for Netdata monitoring
- `claim_rooms`: netdata room, needed for Netdata monitoring

Set Netdata Cloud claiming details. To find your `claim_token` and
`claim_room`, go to Netdata Cloud, then click on your Space's name in the top
navigation, then click on `Manage your Space`. Click on the `Nodes` tab in the
panel that appears, which displays a script with `token` and `room` strings.

example: <br>
`env EDITOR=nano ansible-vault create host_vars/main_server/vars.yml` <br>
`pgbackrest_cipher_pass: "pass"` <br>
`env EDITOR=nano ansible-vault edit host_vars/main_server/vars.yml` <br>

# Troubleshooting

1. `ERROR: [087]: archive_mode must be enabled`

You might get the above error the first time you run the playbook on a new installation. For some reason the postgresql service is not reloaded after changing the configuration. The solution is to just reload postgresql, and run the playbook again.

Solution: `systemctl restart postgresql`