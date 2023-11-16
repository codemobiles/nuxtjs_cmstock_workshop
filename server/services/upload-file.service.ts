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
