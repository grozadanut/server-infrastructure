# How to use

If you want to use this ansible playbook you have to first run the script: `scripts/initial-setup.sh`

To make the script executable:
`chmod u+x initial-setup.sh`

Then you can run ansible normally, like so:
`ansible-playbook main.yml -K --ask-vault-pass`

## Mandatory variables

Before running the playbook, these variables must be defined:

1. Host variables

For each database host:
- `pgbackrest_cipher_pass`

example: <br>
ansible-vault create host_vars/main_server/vars.yml <br>
pgbackrest_cipher_pass: "pass" <br>
ansible-vault edit host_vars/main_server/vars.yml <br>

2. Group variables

For database group(group_vars/database/vars.yml):
- `digi_storage_user`
- `digi_storage_pass`

For data group(group_vars/data/vars.yml):
- `digi_storage_user`
- `digi_storage_pass`
- `restic_repo_pass`

For manager group(group_vars/manager/vars.yml):
- `enable_https` - whether to enable https through Let's Encrypt, enable this if you have a valid domain; default false
- `certbot_email` - email for Let's Encrypt registration
- `mysql_pass` - used in the stack file

3. Global variables

You can set these in group_vars/all.yml

Set Netdata Cloud claiming details. To find your `claim_token` and
`claim_room`, go to Netdata Cloud, then click on your Space's name in the top
navigation, then click on `Manage your Space`. Click on the `Nodes` tab in the
panel that appears, which displays a script with `token` and `room` strings.
- `claim_token`: netdata token
- `claim_rooms`: netdata room

## Default folder structure

### DB server(1)

- `/var/lib/pgbackrest` - postgresql database local backup location
- `DigiStorage:/pgbackrest/flexbiz` - postgresql database remote backup location

### Data server(1-n)

- `/opt/seaweedfs/{{ domain }}/volume` - seaweedfs volumes
- `/opt/seaweedfs/{{ domain }}/filer` - seaweedfs file metadata
- `DigiStorage:/restic/main_server` - remote backup of `/opt/seaweedfs` folder

Note: default domain is `flexbiz.ro`

### Manager server(1-3)

- `/opt/seaweedfs/{{ domain }}/master` - seaweedfs master data

Note: Currently if the manager and data server are on 2 separate machines, 
the seaweedfs master data is not backed up on a remote location.

### Worker server(1-n)

Theoretically this should be stateless, as it's used only to run docker containers.

If containers need persistent storage, they can use bind mounts to mount a subfolder inside `/mnt`(see parent README.md for folder structure). The host provides persistent storage in `/mnt` through `seaweedfs mount` command. The actual data is stored in the data server.

# Troubleshooting

1. `ERROR: [087]: archive_mode must be enabled`

You might get the above error the first time you run the playbook on a new installation. For some reason the postgresql service is not reloaded after changing the configuration. The solution is to just reload postgresql, and run the playbook again.

Solution: `systemctl restart postgresql`