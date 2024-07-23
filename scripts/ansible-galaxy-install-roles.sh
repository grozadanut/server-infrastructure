#!/bin/bash

ansible-galaxy install -r ../ansible/requirements.yml
ansible-galaxy install --force git+https://github.com/grozadanut/ansible-role-seaweedfs.git,main