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
