#!/bin/sh
echo "Running Migrations"
npm run db:migrate

echo "Running Seeds"
npm run db:seed

npm run start:debug
