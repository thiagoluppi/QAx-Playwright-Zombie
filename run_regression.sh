#!/bin/bash

# Verifica se a variável WORKERS está definida e não é vazia
if [ -z "$WORKERS" ]
then
   # Se WORKERS não estiver definida, executa sem a opção --workers
   npx playwright test --grep @regression
else
   # Se WORKERS estiver definida, usa seu valor na opção --workers
   npx playwright test --grep @regression --workers=$WORKERS
fi
