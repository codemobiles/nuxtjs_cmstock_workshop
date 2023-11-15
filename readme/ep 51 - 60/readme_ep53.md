# Nuxt 3 CMS Stock Course EP.53 - Workshop - Backend - Sequlize

## Outcome

-   [x] Describe `sequelize` and `sqlite`
-   [x] Create `model` from `sequelize` and `sqlite` for backend in Nuxt3

## Documentation for this episode

-   X

## Setup

1. Install `sequelize` and `sqlite` in backend

```bash
npm install --save sequelize sqlite3
```

2. Create `dto` in `types` folder

```ts
// ~types/dtos/create-product.dto.ts
export type CreateProductDto = {
    name: string;
    image: string;
    price: number;
    stock: number;
};
```

3. From previous episode, we have `models` folder in `~server` we can use it to create `model` for `sequelize`

Method: **GET BY ID**

```ts
// ~server/api/v2/products/[id].ts

import product from "~/server/models/product.model";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const result = await product.findByPk(id);
    return result;
});
```

Method: **POST**

```ts
// ~server/api/v2/products/index.post.ts
import product from "@/server/models/product.model";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateProductDto>(event);
    const result = await product.create(body);
    return result;
});
```

Method: **PUT**

```ts
// ~server/api/v2/products/[id].put.ts
import product from "~/server/models/product.model";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const body = await readBody<CreateProductDto>(event);
    const result = await product.update(body, {
        where: {
            id,
        },
    });
    return result;
});
```

Method: **Delete**

```ts
// ~server/api/v2/products/[id].delete.ts
import product from "~/server/models/product.model";

export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return product.destroy({ where: { id } });
});
```
