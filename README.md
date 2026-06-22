# Rajesh Kumar — Production Portfolio

A full-stack rebuild of the supplied AI Studio portfolio interface, preserving its dark interactive UI while replacing misleading mock behavior with a real API and editable content management.

## Included functionality

- React + TypeScript + Vite + Tailwind CSS v4 frontend matching the supplied visual design.
- Django + Django REST Framework backend.
- Portfolio content served from the REST API and editable through Django Admin.
- Real contact form: validates requests, saves inquiries in the database, and optionally emails an alert through SMTP.
- Portfolio AI assistant: server-side Gemini integration, rate limiting, strict fact-only prompt rules, disclosure text, and a working fallback when no Gemini key is configured.
- Interactive security-allocation and learning-scraper UI demos.
- **The JazzCash/e-commerce payment demo has been removed completely.**
- SQLite database configuration for local use and single-instance deployment, CORS configuration, WhiteNoise static configuration, secure production settings, Docker deployment with persistent SQLite storage, and API tests.

## Project structure

```text
rajesh_portfolio_production/
├── backend/
│   ├── config/                 # Django settings and URL config
│   ├── portfolio_api/          # Models, REST endpoints, Admin, seed data, tests
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/components/         # Preserved/stabilized UI components
│   ├── src/context/            # API-backed portfolio data provider
│   ├── src/api.ts              # Axios API client
│   └── .env.example
└── docker-compose.yml
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health/` | Service health check |
| GET | `/api/portfolio/` | Public portfolio data |
| POST | `/api/contact/` | Store contact inquiry and optionally send notification email |
| POST | `/api/chat/` | Portfolio AI assistant/factual fallback |
| GET | `/admin/` | Content and inquiry management after admin login |

## Local setup on Windows 10 / PowerShell

### 1. Backend setup

Open PowerShell in the project folder:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

The supplied `backend/.env` is already configured for SQLite. Confirm these values before migrating:

```env
SQLITE_DB_PATH=db.sqlite3
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

Do not use `DATABASE_URL` in this SQLite edition. Django creates `backend/db.sqlite3` automatically when you run migrations.

Create tables, load starter portfolio content, and create your admin login:

```powershell
python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser
python manage.py runserver
```

Backend URLs:

- API: `http://127.0.0.1:8000/api/portfolio/`
- Admin: `http://127.0.0.1:8000/admin/`

### 2. Frontend setup

Open a second PowerShell window in the project folder:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Visit `http://localhost:5173`.

## Configure actual contact email delivery

Messages are always saved in the Django database first. During development, the console email backend is safe and does not send mail externally.

To send real notifications, edit `backend/.env`:

```env
DEFAULT_FROM_EMAIL=Portfolio <your-sending-address@example.com>
CONTACT_NOTIFICATION_EMAIL=your-real-email@example.com
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-smtp-user
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
```

Use an email provider app password or transactional email service; do not commit credentials to GitHub.

## Configure the AI assistant

The assistant works without an API key using safe predefined answers. To enable AI answers, add a Gemini API key only in `backend/.env`:

```env
GEMINI_API_KEY=your-server-side-key
GEMINI_MODEL=gemini-2.5-flash
```

The key is never sent to React. The API restricts questions to 800 characters and throttles anonymous usage. For a public deployment, add reverse-proxy rate limits and optionally a CAPTCHA for the chatbot and contact form.

## Update your real portfolio content

After creating a superuser, open `/admin/` and edit:

- Profile, contact information and social links
- Skill categories
- Experience
- Projects and each repository/live-demo link
- Education and certificates
- Received contact messages

The seeded text is starter content. **Verify every public claim, date, employer name, certificate and link before publishing.**

## Run tests and production builds

### Backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py test
python manage.py check --deploy --fail-level WARNING
```

`check --deploy` expects production environment variables; warnings are normal until you set `DJANGO_DEBUG=False`, a secure secret key and HTTPS-related settings.

### Frontend

```powershell
cd frontend
npm run build
```

The optimized frontend files will be created in `frontend/dist/`.

## Single-server deployment option: Docker Compose with SQLite

1. Copy backend environment variables:

```powershell
Copy-Item backend\.env.example backend\.env
```

2. Edit `backend/.env` with a strong secret key, domain, email provider, optional Gemini key, and SQLite production path. Set:

```env
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=your-domain.com,www.your-domain.com
CSRF_TRUSTED_ORIGINS=https://your-domain.com,https://www.your-domain.com
CORS_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
SQLITE_DB_PATH=/app/data/db.sqlite3
```

3. Build and start:

```powershell
docker compose up --build -d
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_portfolio
docker compose exec backend python manage.py createsuperuser
```

4. Place an HTTPS reverse proxy or managed platform TLS certificate in front of the Docker application before public use. Docker stores SQLite in the persistent `sqlite_data` volume; back up that volume regularly.

SQLite is appropriate for this personal portfolio on one server with light traffic. If you later add many concurrent writers or high-volume functionality, migrate the database layer to a managed relational database.

## Recommended public-release checklist

- Edit all seeded facts through Django Admin and add individual GitHub repository links.
- Remove or hide your phone number if you do not want public spam calls.
- Add verified LinkedIn and certificate URLs only after testing them publicly.
- Configure SMTP and submit one real test message.
- Enable HTTPS, set secure environment values, keep a persistent SQLite volume, and back up `db.sqlite3` regularly.
- Add an Open Graph preview image and custom domain before sending to recruiters.

## Important design changes from the supplied file

- Preserved the original dark dashboard-style UI and interactive workbench layout.
- Removed JazzCash/payment UI and all MPIN-related input.
- Replaced the fake contact success behavior with a real database/API workflow.
- Changed sample/demo descriptions so they do not represent simulations as real payments, machine learning, or live scraping.
- Added REST-backed editable data, security settings, accessibility labels, mobile-safe chatbot placement and deployment documentation.
