import { FetchingStatus } from "~/types/enums/FetchingStatus";
import type { TProduct } from "~/types/product.type";
import type { UploadChangeParam } from "ant-design-vue";
import type { CreateProductDto } from "~/types/dtos/create-product.dto";
import type { UpdateProductDto } from "~/types/dtos/update-product.dto";

export const useProductStore = defineStore("product", () => {
    const products = ref<TProduct[]>([]);
    const autoCompleteOptions = ref([]);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const api = useApi();
    const preview = reactive({
        visible: false,
        title: "",
    });

    //@ts-ignore
    const handlePreview = async (file: UploadProps["fileList"][number]) => {
        preview.visible = true;
        preview.title =
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    };

    // getter
    const setLoading = (status: FetchingStatus) => {
        fetchingStatus.value = status;
    };
    const isLoading = () => {
        return fetchingStatus.value === FetchingStatus.fetching;
    };

    const debouncedSearch = async (search: string) => {
        //* Sleep 500ms
        setLoading(FetchingStatus.fetching);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
            if (search) {
                const result = await api.getProductByKeyword(search);
                products.value = result.data;
                autoCompleteOptions.value = result.data.map((product: any) => ({
                    value: product.name,
                }));
            } else {
                await loadProducts();
            }
        } catch (error) {
        } finally {
            setTimeout(() => {
                setLoading(FetchingStatus.success);
            }, 500);
        }
    };

    const onSelect = async (value: any) => {
        setLoading(FetchingStatus.fetching);
        try {
            if (value) {
                const result = await api.getProductByKeyword(value);
                products.value = result.data;
            } else {
                await loadProducts();
            }
        } finally {
            setTimeout(() => {
                setLoading(FetchingStatus.success);
            }, 500);
        }
    };

    const loadProducts = async () => {
        setLoading(FetchingStatus.fetching);
        try {
            const res = await api.getProducts();
            products.value = res;
        } catch (error) {
            products.value = [];
        } finally {
            setLoading(FetchingStatus.success);
        }
    };

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            setLoading(FetchingStatus.fetching);
            return "";
        }
        if (info.file.status === "done") {
            console.log("handleUpload");
            const target = info.file.originFileObj as any;
            const fileURL = URL.createObjectURL(target);
            const previewImageUrl = fileURL;
            setLoading(FetchingStatus.success);
            return previewImageUrl;
        }
        if (info.file.status === "removed") {
            setLoading(FetchingStatus.success);
            message.error("file was removed");
            return { status: info.file.status };
        }
        if (info.file.status === "error") {
            setLoading(FetchingStatus.failed);
            message.error("upload error");
            return { status: info.file.status };
        }
    };

    const handleCancel = () => {
        preview.visible = false;
        preview.title = "";
    };

    const createProduct = async (product: CreateProductDto) => {
        try {
            const { name, price, stock, image } = product;
            const formData = new FormData();
            formData.append("body", JSON.stringify({ name, price, stock }));
            if (image) {
                formData.append("file", image);
            }
            await api.createProduct(formData);
            message.success("Create product successfully");
        } catch (error) {
            message.error("Create product failed");
        }
    };

    const updateProduct = async (id: string, product: UpdateProductDto) => {
        try {
            const { name, price, stock, image } = product;
            const formData = new FormData();
            formData.append("body", JSON.stringify({ name, price, stock }));
            if (typeof image == "object") {
                formData.append("file", image);
            }
            await api.updateProduct(id, formData);
            message.success("Update product successfully");
        } catch (error) {
            message.error("Update product failed");
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await api.deleteProduct(id);
            await loadProducts();
            message.success("Delete product successfully");
        } catch (error) {
            message.error("Delete product failed");
        }
    };

    return {
        handleChange,
        autoCompleteOptions,
        debouncedSearch,
        products,
        loadProducts,
        isLoading,
        onSelect,
        handlePreview,
        preview,
        handleCancel,
        createProduct,
        updateProduct,
        deleteProduct,
    };
});
