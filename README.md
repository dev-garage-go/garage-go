## Documentación

### Dev enviroment

#### Run proyect
1. Ejecutar `npm i`
2. Ejecutar `npm run dev`
3. Levantar la base de datos estableciendo la URI del localhost en un archivo `.env.development`

#### Database
La base de datos del proyecto esta hecha en MongoDB por lo que:
1. Se recomienda instalar MongoDB Compass para visualizar la base de datos y establecer la conexion
2. La configuracion para la conexion de la base de datos se encuentra en la ruta `src/backend/database/connect`
3. Copia lo siguiente y pegalo en un archivo `.env.development`, es importante que sea exactamente este nombre ya que Next.js automaticamente lo detecta como variables de entorno en modo desarrollo

```bash
DATABASE_NAME=garage-go
DATABASE_URI=mongodb://localhost:27017/garage-go
```

4. Las colecciónes se las establece en `src/backend/database/methods`, estas estan estrictamente tipadas con TypeScript
5. En `src/backend/database` encontraremos la carpeta `schemas` tipada utilizando `Zod`, y la carpeta `types` tipada utilizando `TypeScript`
6. Si se quieren añadir nuevas colecciones se deben crear los tipos y añadirlas en el objeto `CollectionMap` que se encuentra en `src/backend/database/methods`

```typescript
Example:

// zod schema
import { z } from 'zod'

export const NewCollectionSchema = z.object({
  field_1: z.string(),
  field_2: z.number()
}).strict();
export type NewCollectionType = z.infer<typeof NewCollectionSchema>

// add new collection using the type of zod schema
type CollectionMap = {
  ...
  newCollection: NewCollectionType
}
```

#### Payments
Si se quiere probar pasarelas de pago para la creación de ordenes es seguir los siguientes pasos:
1. Crear un tunel http utilizando `ngrok` y que el mismo apunte hacia el localhost, `cmd -> ngrok http 3000` en una `terminal A`. Esto es debido a que generalmente se necesita una URL con el protocolo `https` para que las pasarelas manden la informacion correcta de un pago o una orden actualizada
2. Cambiar el `domain` de la ruta `api/payment/{gateway}`
3. El `domain` deberia verse algo asi `const domain = isProd ? process.env.NEXT_PUBLIC_BASE_URL : 'https://bd1a8bc16aa5.ngrok-free.app'`
4. Se corre el localhost en una `terminal B` con el comando `npm run dev`
5. Con el tunel apuntando a localhost, y la app corriendo en modo desarrollo ahora podemos crear una orden interactuando con la aplicacion siguiendo los pasos de la UI
6. Verifica en la base de datos local que efectivamente se estan creando las ordenes