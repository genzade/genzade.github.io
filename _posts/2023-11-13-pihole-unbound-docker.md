---
layout: post
title: Pihole Unbound Docker
date: 2023-11-13 00:00 +0000
toc: true
---

# Introduction

In this article you will learn all the steps needed to setup pihole with unbound
with docker. Even though I set this up with a raspberry pi, you can run this anywhere.
That's the beauty of docker containerization.

## Prerequisites

First and foremost you need to [setup your raspberry pi](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up/2){:target="\_blank"}.

Once that is setup you will need remote access and [here is a detailed guide](https://www.raspberrypi.com/documentation/computers/remote-access.html){:target="\_blank"}
on how you can achieve this.

Make sure the above steps were done correctly before continuing. Once you have
established a ssh connection to the pi you will need to install docker and docker
compose.

Before coninuing

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

`docker`

```bash
$ curl -sSL https://get.docker.com | sh
$ sudo usermod -aG docker $USER
```

See [this article](https://raspberrytips.com/docker-on-raspberry-pi/){:target="\_blank"} for detailed
explanation.

`docker compose`

```bash
$ sudo apt-get update
$ sudo apt-get install docker-compose-plugin
```

First create a `.env` file to substitute variables for your deployment.

# Pi-hole environment variables

> Vars and descriptions can be viewed in full from the [official pihole container](https://github.com/pi-hole/docker-pi-hole/#environment-variables){:target="\_blank"}:

Example `.env` file in the same directory as your `docker-compose.yaml` file:

```bash
FTLCONF_LOCAL_IPV4=192.168.1.10
TZ=America/Los_Angeles
WEBPASSWORD=QWERTY123456asdfASDF
REV_SERVER=true
REV_SERVER_DOMAIN=local
REV_SERVER_TARGET=192.168.1.1
REV_SERVER_CIDR=192.168.0.0/16
HOSTNAME=pihole
DOMAIN_NAME=pihole.local
PIHOLE_WEBPORT=80
WEBTHEME=default-light
```

Copy the example file to a file called `.env`, do this with;

```bash
$ cp .env.sample .env
```

Change the values as nesessary.

# Run it

You run it with the following command.

```bash
$ docker compose up -d
```

# Test it

From inside your raspberry pi start a bash session in the docker container.

```bash
$ docker exec -it pihole bash
```

And run the following;

```bash
$ dig fail01.dnssec.works @127.0.0.1 -p 5335 # this should fail (no response)
$ dig dnssec.works @127.0.0.1 -p 5335        # this should work and return an IP address
```

Read [this article](https://docs.pi-hole.net/guides/dns/unbound/){:target="\_blank"} for a detailed
explanation of what is going on here.

If all is well update your router log into your router's configuration page and
find the DHCP/DNS settings and set it so that your router is pointing to your
raspberry pi's IP address. Note: make sure you adjust this setting under your
LAN settings and not the WAN.

Log into the admin dashboard of you pihole in a browser and you should start
seeing queries being blocked.

# Github repo

You can check out all the source code for this setup [here](https://github.com/genzade/pihole_unbound){:target="\_blank"}.
