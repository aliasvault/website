<div align="center">

<h1>AliasVault</h1>

</div>

Welcome to the AliasVault landing page repository. This project contains the source code for the website deployed at [https://www.aliasvault.com](https://www.aliasvault.com).

For more information about AliasVault, including installation instructions and technical details, please visit the [main repository](https://github.com/aliasvault/aliasvault).

---

This landing page is built using [Next.js](https://nextjs.org), a powerful React framework.


## Development
In order to run the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy with Docker
You can easily deploy the landing page using Docker:
```
docker compose up -d
```

### Updating the Deployment
To update the deployment, pull the latest changes and rebuild the container:
```
git pull
docker compose up -d --build --force-recreate
```