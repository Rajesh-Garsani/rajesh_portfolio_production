# Deployment Checklist — SQLite Edition

## Before first public deployment

- [ ] Change `DJANGO_SECRET_KEY` to a long random secret.
- [ ] Set `DJANGO_DEBUG=False`.
- [ ] Configure final `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`.
- [ ] Set `SQLITE_DB_PATH` to a persistent location such as `/app/data/db.sqlite3` in Docker.
- [ ] Confirm the server/host preserves the SQLite file across restarts and deployments.
- [ ] Create a recurring backup of the SQLite database file or Docker `sqlite_data` volume.
- [ ] Configure HTTPS/TLS at the host or reverse proxy.
- [ ] Configure SMTP and submit a real contact-message test.
- [ ] Revoke any exposed Gemini key and add a new key only in `backend/.env`, or leave the assistant in fallback mode.
- [ ] Confirm throttling and add CAPTCHA if traffic or spam requires it.
- [ ] Verify every profile claim, date, URL and contact detail in Django Admin.
- [ ] Set real GitHub repository and live-demo links for each project.

## Common deployment commands

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py seed_portfolio
python manage.py test
```

## SQLite scope

SQLite is suitable for a personal portfolio running as one backend instance with low write traffic. Do not run multiple backend containers against the same SQLite file. If the application later receives frequent concurrent writes, migrate to a server database before scaling.
