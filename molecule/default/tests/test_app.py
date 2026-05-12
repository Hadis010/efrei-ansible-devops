def test_mysql_running(host):
    mysql = host.service("mysql")
    assert mysql.is_running
    assert mysql.is_enabled

def test_nodejs_installed(host):
    node = host.run("node --version")
    assert node.rc == 0

def test_todos_api_running(host):
    service = host.service("todos-api")
    assert service.is_running
    assert service.is_enabled

def test_todos_api_responds(host):
    response = host.run("curl -s http://localhost:3000/todos")
    assert response.rc == 0

def test_nginx_running(host):
    nginx = host.service("nginx")
    assert nginx.is_running
    assert nginx.is_enabled

def test_nginx_proxy(host):
    response = host.run("curl -s http://localhost:80/todos")
    assert response.rc == 0

def test_maildev_running(host):
    service = host.service("maildev")
    assert service.is_running
    assert service.is_enabled

def test_maildev_smtp_port(host):
    port = host.socket("tcp://0.0.0.0:1025")
    assert port.is_listening

def test_maildev_web_port(host):
    port = host.socket("tcp://0.0.0.0:1080")
    assert port.is_listening

def test_postfix_running(host):
    service = host.service("postfix")
    assert service.is_running
    assert service.is_enabled

def test_postfix_smtp_port(host):
    port = host.socket("tcp://127.0.0.1:25")
    assert port.is_listening

def test_backup_directory_exists(host):
    d = host.file("/var/backups/todos")
    assert d.exists
    assert d.is_directory

def test_backup_script_exists(host):
    f = host.file("/usr/local/bin/todos-backup.sh")
    assert f.exists
    assert f.mode == 0o750

def test_backup_cron_exists(host):
    cron = host.run("crontab -l -u root")
    assert "todos-backup" in cron.stdout

def test_certbot_installed(host):
    certbot = host.run("certbot --version")
    assert certbot.rc == 0
