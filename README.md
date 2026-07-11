# Notes App

A minimal REST API for creating, listing, and deleting notes. Built with **Node.js**, **Express**, and **MongoDB**.

This is the application at the center of a larger end-to-end DevOps pipeline project, used to learn and demonstrate:

- **Docker** — containerizing the app
- **Kubernetes** — deploying and running it
- **Jenkins** — building, testing, and publishing the image
- **Terraform** — provisioning the infrastructure it runs on
- **Ansible** — configuring servers/nodes
- **Argo CD** — GitOps-based deployment to Kubernetes

## API endpoints

| Method | Endpoint      | Description        |
|--------|---------------|---------------------|
| GET    | `/health`     | Health check        |
| GET    | `/notes`      | List all notes      |
| GET    | `/notes/:id`  | Get a single note   |
| POST   | `/notes`      | Create a note       |
| PUT    | `/notes/:id`  | Update a note       |
| DELETE | `/notes/:id`  | Delete a note       |

### Example request

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "First note", "content": "Learning DevOps one tool at a time"}'
```

## Running locally (without Docker)

```bash
npm install
cp .env.example .env
# make sure a local MongoDB instance is running on port 27017
npm run dev
```

If you want to work directly inside the backend folder, run the same commands from there:

```bash
cd backend
npm install
cp .env.example .env
# make sure a local MongoDB instance is running on port 27017
npm run dev
```

## Running with Docker Compose (recommended)

This spins up both the app and MongoDB together:

```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`.

To stop and remove containers:

```bash
docker compose down
```

To also wipe the database volume:

```bash
docker compose down -v
```

## Project structure

```
notes-api/
├── backend/
│   ├── models/
│   │   └── Note.js     # Mongoose schema
│   ├── routes/
│   │   └── notes.js    # CRUD route handlers
│   ├── server.js       # App entry point
│   ├── Dockerfile
│   ├── .env.example
│   └── .dockerignore
├── frontend/
│   └── .gitkeep
├── docker-compose.yml
└── README.md
```

## Next steps in the pipeline

1. ✅ App built and containerized (this step)
2. ⬜ Deploy to Kubernetes (Deployment, Service, ConfigMap, PersistentVolumeClaim for MongoDB)
3. ⬜ Set up Jenkins pipeline to build/test/push the Docker image
4. ⬜ Provision infrastructure with Terraform
5. ⬜ Configure servers with Ansible
6. ⬜ Set up Argo CD for GitOps-based deployment
