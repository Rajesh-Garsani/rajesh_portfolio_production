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

