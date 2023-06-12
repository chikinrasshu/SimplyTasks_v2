# SimplyTasks

## Integrantes:
* Jorge Botarro Westerhout
* Jorge Ugarte Olivares

## Requisitos:
* Importar `simplytasks.sql` a mysql.
* ejemplo: `mysql -u root -p simplytasks < simplytasks.sql` asumiendo usuario `root`
* PNPM: instalar con: `npm i -g pnpm`
* correr `pnpm i` para instalar todos los packages necesarios.
* correr `pnpm build` para compilar todo
* correr `pnpm start` para correr ambos backend y frontend

* Si hay que cambiar alguna configuracion, editar el archivo `packages/common/src/.env`

## Generar secretos
* En node, correr: `require('crypto').randomBytes(32).toString('hex');`
* \> `e2540f8e0e93e95da1ade66f9add0fd75563decb9f682940f1f90ace6bd42de9`
