If you want to use this ansible playbook you have to first run the script: `scripts/initial-setup.sh`

Then you can run ansible normally, like so:
`ansible-playbook main.yml -K --ask-vault-pass`

## Mandatory variables

Before running the playbook, these variables must be defined:

1. Host variables

For each database host:
- pgbackrest_cipher_pass

example: 
ansible-vault create host_vars/main_server.yml
pgbackrest_cipher_pass: "pass"
ansible-vault edit host_vars/main_server.yml

2. Group variables

For database group:
- digi_storage_user
- digi_storage_pass

example: 
ansible-vault create group_vars/database/vars.yml
digi_storage_user: "email@domain.com"
digi_storage_pass: "hardpass"

3. Global variables

You can set these in group_vars/all.yml

Set Netdata Cloud claiming details. To find your `claim_token` and
`claim_room`, go to Netdata Cloud, then click on your Space's name in the top
navigation, then click on `Manage your Space`. Click on the `Nodes` tab in the
panel that appears, which displays a script with `token` and `room` strings.
- claim_token: netdata_token
- claim_rooms: netdata_room

