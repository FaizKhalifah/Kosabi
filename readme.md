# Kosabi

## Overview
This in a dorm administration application

## Migration
to create a model using sequalize use the command : 
npx sequelize-cli model:generate --name modelName --attributes firstName:string,lastName:string,email:string

to start migration use the command : 
npx sequelize-cli db:migrate

to undo migration :
npx sequelize-cli db:migrate:undo

to undo all migration : 
npx sequelize db:migrate:undo:all
