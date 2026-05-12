# TP DevOps Ansible S8 — Todos API

Déploiement automatisé d'une stack web complète avec Ansible.

## Membres

- Hafsa Dini
- Vainepuana Lemaire

## Application déployée

Une API REST de gestion de tâches (Todos) construite avec **Node.js/Express** et **MySQL**.

Elle expose 4 endpoints HTTP :
- `GET /todos` — lister toutes les tâches
- `POST /todos` — créer une tâche
- `PUT /todos/:id` — modifier une tâche
- `DELETE /todos/:id` — supprimer une tâche

## Prérequis

- Python 3.12+
- VirtualBox 7.0+
- Vagrant 2.4+
- WSL2 (pour les Windows)

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Hadis010/efrei-ansible-devops.git
cd efrei-ansible-devops

# 2. Activer le virtualenv et installer les dépendances
source venv.sh

# 3. Installer les roles et collections Galaxy
download_galaxy
```

## Lancer le projet

```bash
# Tout déployer en une commande (create + converge + verify + destroy)
molecule test

# Ou par commande
molecule create      # Créer la VM
molecule converge    # Déployer la stack
molecule verify      # Lancer les tests
molecule destroy     # Supprimer la VM
```

## Structure du projet

efrei-ansible-devops/
├── playbook_install.yml       # Playbook principal
├── hosts/
│   ├── hosts_dev              # Inventaire dev
│   └── hosts_staging          # Inventaire staging
├── group_vars/
│   ├── all.yml                # Variables globales
│   ├── devops_dev/            # Variables environnement dev
│   └── devops_staging/        # Variables environnement staging
├── roles/
│   ├── database/              # Installation MySQL
│   ├── runtime/               # Installation Node.js
│   ├── app/                   # Déploiement API Express
│   ├── webserver/             # Configuration Nginx
│   ├── maildev/               # Serveur SMTP de dev
│   ├── postfix/               # Serveur mail de production
│   ├── backup/                # Backup automatisé
│   └── certbot/               # Certificat TLS Let's Encrypt
└── molecule/
└── default/               # Tests Molecule + Testinfra

## Bonus implémentés

- **Ansible Vault** — chiffrement du mot de passe MySQL
- **Multi-environnements** — dev et staging avec variables distinctes
- **Maildev** — serveur SMTP de développement (interface web port 8025)
- **Postfix** — envoi d'emails en production
- **Backup automatisé** — dump MySQL + archive app, rotation 7 jours, cron 1h
- **Certbot** — installation Let's Encrypt avec renouvellement automatique

## Tests

15 tests Testinfra couvrant tous les services :

```bash
molecule verify
# 15 passed
```

## Accès aux services (après molecule converge)

| Service | URL |
|---|---|
| API Todos | http://172.21.80.1/todos |
| Maildev | http://172.21.80.1:8025 |

## Vault

Le mot de passe de la base de données est chiffré avec Ansible Vault.
