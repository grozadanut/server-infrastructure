If you want to use this ansible playbook you have to first run the script: `scripts/initial-setup.sh`

Then you can run ansible normally, like so:
`ansible-playbook run.yml -K --ask-vault-pass`

## Mandatory variables

Before running the playbook, these variables must be defined:

1. Host variables

For each database host:
- pgbackrest-cipher-pass

example: 
ansible-vault create host_vars/main_server.yml
pgbackrest-cipher-pass: "pass"
ansible-vault edit host_vars/main_server.yml