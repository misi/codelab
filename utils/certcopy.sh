#!/bin/bash
sudo cp /etc/letsencrypt/live/`hostname -f`/{cert.pem,privkey.pem} .
