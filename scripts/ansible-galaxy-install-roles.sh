#!/bin/bash

ansible-galaxy install -r ../ansible/requirements.yml
ansible-galaxy collection install community.docker