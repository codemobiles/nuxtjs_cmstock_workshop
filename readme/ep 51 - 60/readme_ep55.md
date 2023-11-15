# Nuxt 3 CMS Stock Course EP.55 - Workshop - Backend - Sequelize Part 3

## Outcome

-   [x] Implement `Op.like` in `sequelize` to search for product

## Documentation for this episode

-   X

## Setup

1. Update `[keyword].ts` in `~server/api/v2/products/name/` folder

```ts
// ~server/api/v2/products/name/[keyword].ts

import { Op } from "sequelize";
import { kResultOk } from "~/server/constants";
import product from "~/server/models/product.model";

export default defineEventHandler(async (event) => {
    const keyword = getRouterParam(event, "keyword") || "";
    const keyWordDecoded = decodeURIComponent(keyword);
    const result = await product.findAll({
        where: {
            name: {
                [Op.like]: `%${keyWordDecoded}%`,
            },
        },
    });
    return {
        result: kResultOk,
        data: result,
    };
});
```
