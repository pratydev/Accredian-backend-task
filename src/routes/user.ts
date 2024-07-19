import { Router } from "express";

const userRoutes = Router();

userRoutes.get('/details');

userRoutes.post('/detasls');


export default userRoutes;

/*
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://avnadmin:AVNS_oeLseRzQAibdKnQt5Q0@mysql-10664ec2-accredite-backend.i.aivencloud.com:13705/defaultdb"
*/