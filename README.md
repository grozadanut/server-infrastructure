This the the source code for the infrastructure of the flexbiz.ro server.

The code is structured as follows:
- ansible: folder that contains the main ansible project for the server automation
- scripts: folder that contains scripts that are not automated with ansible or other one-time scripts; for scripts specific to a certain server, other than flexbiz.ro, create a subfolder with the company name and put the scripts there

# Documentation
## Infrastructure

- OS: Debian
- Automation: Ansible
- Database: postgres
- Db backup: pgbackrest
- File backup: restic
- File cloud sync/copy: rclone
- Containerization: docker

![infrastructure](infrastructure_v2.jpg)

## Default folder structure

### Database

- `/var/lib/pgbackrest` - postgresql database local backup location
- `DigiStorage:/pgbackrest/{{ inventory_hostname }}` - postgresql database remote backup location

### Data

- `/data/coolify` - coolify config data such as compose files and traefik proxy config
- `/data/app` - application data, see details in the dedicated section below
- `/data/tenant` - tenant data, see details in the dedicated section below
- `DigiStorage:/restic/{{ inventory_hostname }}` - remote backup of `/data` folder

Note: `{{ inventory_hostname }}` is the hostname as defined in hosts, eg. `main_server`

#### Application data

- `/data/app/{appName}`

Contains data specific to a certain application, eg. Moqui, Wordpress etc. 
Generally this would contain config files applicable to the whole application, not to a 
specific tenant, but it could also contain non critical data of the tenants(for example 
mysql database for shared apps).
For critical tenant data either store it in a Postgresql database per tenant, or flat files 
in `/data/tenant/{tenantId}`.

Examples:
- `/data/app/moqui` - config files, scripts etc.
- `/data/app/mysql` - mysql database
- `/data/app/wordpress` - wordpress public content

#### Tenant data

- `/data/tenant/{tenantId}/files` - special folder for storing tenant files that are not hosted in Nextcloud
- `/data/tenant/{tenantId}/{appName}` - application data specific to a certain tenant

Examples:
- `/data/tenant/flexbiz/wordpress` - wordpress site of flexbiz tenant