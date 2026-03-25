# Full Stack Open Part 2

## Phonebook Online Application

- Production URL (Fly.io): https://part2-black-snowflake-7309.fly.dev/

## Current Deployment Model

- This project currently uses one Fly.io app: `part2-black-snowflake-7309`.
- The Fly app deploys the backend (`simple phonebook/backend`).
- The frontend is built into `backend/dist` and served by Express in production.
- There is no separate frontend Fly app configured in this repository.

## Project Structure

- Frontend source: `simple phonebook/`
- Backend source: `simple phonebook/backend/`

## Deployment Commands (Fly.io)

Run in `simple phonebook/backend`:

```bash
npm run deploy:full
```

Equivalent manual steps:

```bash
npm run build:ui
npm run deploy
```

Logs:

```bash
npm run logs:prod
```

## Local Development

- Run backend in `simple phonebook/backend` with `npm run dev`.
- Run frontend in `simple phonebook` with `npm run dev`.
- Frontend API uses `VITE_API_URL` when set, otherwise defaults to `/api/persons`.
