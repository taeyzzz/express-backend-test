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
