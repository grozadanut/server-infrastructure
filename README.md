This the the source code for the infrastructure of the flexbiz.ro server.

The code is structured as follows:
- ansible: folder that contains the main ansible project for the server automation
- scripts: folder that contains scripts that are not automated with ansible or other one-time scripts; for scripts specific to a certain server, other than flexbiz.ro, create a subfolder with the company name and put the scripts there
- swarm-stacks: folder that contains the swarm stacks that need to run on the server; for stacks specific to a certain server, other than flexbiz.ro, create a subfolder with the company name and put the stacks there