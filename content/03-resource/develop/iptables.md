---
title: iptables
date: 2020-12-21 21:12:20
category: develop
tags: []
draft: true
---

```bash
sudo iptables -A PREROUTING -t nat -i eth0     -p tcp --dport 80 REDIRECT --to-port 8080;
sudo iptables -t nat -L;
sudo apt install iptables-presistent; # yes
sudo bash -c "iptables-save > /etc/iptables/rules.v4";
sudo bash -c "iptables-restore < /etc/iptables.conf"; # startup script에 등록
```
