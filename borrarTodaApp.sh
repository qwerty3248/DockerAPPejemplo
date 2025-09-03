#!/bin/bash

#Este comando borra toda la app incluyendo las iamagenes de alpine, sql nginx 
docker compose down -v --rmi all

# si no funciona es porque tienes que poner sudo delante porque no tienes permisos
