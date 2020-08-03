#!/bin/bash
source .env
echo 'Running Migrations'
npm run db:migrate
echo 'Running Seeds'
npm run db:seeds
npm run start
