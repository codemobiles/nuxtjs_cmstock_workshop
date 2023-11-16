# Nuxt 3 CMS Stock Course EP.57 - File Upload

## Outcome

-   [x] Basic file upload with `multipart/form-data` in Nuxt 3
-   [x] Use `fs` and `path` to save file to `~/public/uploads` folder

## Documentation for this episode

-   X

## Setup

1. Create folder `uploaded/images` in `~/public` folder

```ts
// ~server/constants.ts

export const kResultOk = "ok";
export const kResultNok = "nok";
```

2. Create `upload.post.ts` in `~/server/api/v2` folder

```ts
import { kResultOk } from "~/server/constants";
import { uploadImage } from "~/server/services/upload-file.service";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const file = formData?.length ? formData[0] : null;
    if (file) {
        uploadImage(file, { id: 1, image: "test.jpg" });
    }
    return {
        result: kResultOk,
    };
});
```

3. Create `upload-file.service.ts` in `~/server/services` folder

```ts
import product from "../models/product.model";

import * as fs from "fs";

import path from "path";

export const uploadImage = async (file: any, doc: any) => {
    if (file.filename != null) {
        var fileExtention = file.filename.split(".").pop();
        doc.image = `${doc.id}.${fileExtention}`;
        var newpath =
            path.resolve(path.resolve() + "/public/uploaded/images/") +
            "/" +
            doc.image;

        if (fs.existsSync(newpath)) {
            // Delete file if exists
            fs.unlinkSync(newpath);
        }

        fs.writeFileSync(newpath, file.data);

        return true;

        // Update database
        // let result = product.update(
        //     { image: doc.image },
        //     { where: { id: doc.id } }
        // );
        // return result;
    }
};
```

4. Test with your `Postman` or `Insomnia`
