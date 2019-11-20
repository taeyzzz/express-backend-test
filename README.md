# To start Postgres Database
```bash
docker run -p 5432:5432 --name postgres-backend-test -e POSTGRES_PASSWORD=postgres -d postgres
```
# To start pgadmin
```bash
docker run -p 80:80 \
  -e "PGADMIN_DEFAULT_EMAIL=admin" \
  -e "PGADMIN_DEFAULT_PASSWORD=password" \
  --link postgres-backend-test:postgres-backend-test \
  -d dpage/pgadmin4
```
# Install sequelize cli globally
```bash
npm install -g sequelize-cli
```

# Create DB
```bash
sequelize db:create
```

# Run migrations
```bash
sequelize db:migrate
```

# Create new table model
```bash
sequelize model:generate --name Users --attributes name:string,email:string
```

# Create new migration
```bash
sequelize migration:generate --name add-password-to-user-table
```
