# Nuxt 3 CMS Stock Course EP.58 - File Upload with Sequlize

## Outcome

-   [x] Basic file upload with `multipart/form-data` in Nuxt 3
-   [x] Use `fs` and `path` to save file to `~/public/uploads` folder
-   [x] Use `fs` to delete file if exists
-   [x] Use `fs` to write file to `~/public/uploads` folder
-   [x] Use `sequelize` to update database

## Documentation for this episode

-   X

## Setup

1. Update by added `product` model in `~/server/services/upload-file.service.ts`

```ts
// ~/server/services/upload-file.service.ts
...
let result = product.update({ image: doc.image }, { where: { id: doc.id } });
...
```

2. Update `~/server/api/v2/products/index.post.ts`

```ts
//~/server/api/v2/products/index.post.ts

import product from "@/server/models/product.model";
import { kResultNok, kResultOk } from "~/server/constants";
import { uploadImage } from "~/server/services/upload-file.service";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const file = formData?.find((item) => item.name === "file");
    const bodyRaw = formData?.find((item) => item.name === "body");

    if (!bodyRaw) return { result: kResultNok, data: "body is required" };

    const body = bodyRaw ? JSON.parse(bodyRaw?.data.toString()) : null;

    if (!body) return { result: kResultNok, data: "body is required" };

    const result = await product.create(body);
    if (file?.filename) {
        uploadImage(file, result);
    }
    return {
        result: result ? kResultOk : kResultNok,
        data: result,
    };
});
```

3. Update `~/server/api/v2/products/[id].put.ts`

```ts
//~/server/api/v2/products/[id].put.ts

import { kResultNok, kResultOk } from "~/server/constants";
import product from "~/server/models/product.model";
import { uploadImage } from "~/server/services/upload-file.service";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    const formData = await readMultipartFormData(event);

    const file = formData?.find((item) => item.name === "file");

    const bodyRaw = formData?.find((item) => item.name === "body");

    if (!bodyRaw) return { result: kResultNok, data: "body is required" };

    const body = bodyRaw ? JSON.parse(bodyRaw?.data.toString()) : null;

    if (!body) return { result: kResultNok, data: "body is required" };

    const result = await product.update(body, {
        where: {
            id,
        },
    });

    if (file) {
        uploadImage(file, { id: id, ...result });
    }

    return {
        result: result[0] ? kResultOk : kResultNok,
    };
});
```

4. Test with your `Postman` or `Insomnia`
