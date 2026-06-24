<div align="center">

<h1>AliasVault</h1>

</div>

Welcome to the AliasVault landing page repository. This project contains the source code for the website deployed at [https://www.aliasvault.com](https://www.aliasvault.com).

For more information about AliasVault, including installation instructions and technical details, please visit the [main repository](https://github.com/aliasvault/aliasvault).

---

The site is built with [Next.js](https://nextjs.org) and uses [Payload CMS](https://payloadcms.com).

## First-time setup

```bash
git clone <repo-url>
cd website
cp .env.example .env
```

Then edit `.env` and set a `PAYLOAD_SECRET` (required), generate one with:

```bash
openssl rand -hex 32
```

## Run with Docker (recommended)

```bash
docker compose up -d --build
```

The site is served at [http://localhost:3000](http://localhost:3000). The CMS database and uploaded media live in `./data`, which is mounted into the container so the content persists across rebuilds.

To update an existing deployment:

```bash
git pull
docker compose up -d --build --force-recreate
```

## Run locally (development)

```bash
npm install
npm run dev
```

Open [http://localhost:3100](http://localhost:3100). Edit files under `src/` and the page auto-updates.
