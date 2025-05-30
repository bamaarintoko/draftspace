'use client'

import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import LoadingModal from "@/components/LoadingModal";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import useAxiosQuery from "@/lib/request/useAxiosQuery";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRequest } from "@/lib/request/useRequest";
import Alert from "@/components/Alert";
import { useDeleteRequest } from "@/lib/request/useDeleteRequest";
import AddOrEditCategoryModal from "./componet_/AddOrEditCategoryModal";
import CategoryTable from "./componet_/CategoryTable";
import CategoryTableSkeleton from "./componet_/CategoryTableSkeleton";

export interface Category {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
const initialCategory: Category = {
    id: "",
    name: "",
    userId: "",
    createdAt: "",
    updatedAt: "",
};
export default function PageCategory() {
    const searchParams = useSearchParams();
    const router = useRouter()
    const [categoryObj, setCategoryObj] = useState<Category>(initialCategory)
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [page, setPage] = useState("1");
    const [open, setOpen] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)

    const [debouncedCategory] = useDebounce(category, 400);
    const limit = '9';

    // untuk pencarian category gunakan memo agar tidak infinite loop
    const params = useMemo(() => ({
        search: debouncedCategory,
        page: page,
        limit: limit
    }), [debouncedCategory, page]);

    const {
        deleteRequest,
        isLoading: deleteLoading,
        isSuccess: deleteCatSuccess
    } = useDeleteRequest();
    const { data, isLoading, refetch,error } = useAxiosQuery('categories', params); // ambil semua data category

    const { send, isLoading: addCategoryLoading, data: addCategoryData, isSuccess } = useRequest("categories", {
        method: "post",
        autoFetch: false,
    }); // post data category

    const { send: putCategory, isLoading: putCategoryLoading, isSuccess: putCategoryIsSuccess } = useRequest(`/categories/${categoryObj.id}`, {
        method: "put",
        autoFetch: false,
    }); // update category

    const categories = data?.data ?? []; // fallback [] kalau belum ada
    const totalCategories = data?.totalData || 0

    useEffect(() => {
        console.log("error : ", error)
    }, [error])

    useEffect(() => {
        const query = new URLSearchParams();
        if (debouncedCategory) query.set('category', debouncedCategory);
        if (page) query.set('page', page);
        router.push(`?${query.toString()}`);
    }, [debouncedCategory, page]);

    useEffect(() => {
        if (isSuccess && !addCategoryLoading) {
            refetch()
        }
        console.log("addCategoryData :", addCategoryData)
    }, [isSuccess])

    useEffect(() => {
        if (putCategoryIsSuccess && !putCategoryLoading) {
            refetch()
        }
    }, [putCategoryIsSuccess])

    const handleAdd = (val: string) => {
        send({
            name: val
        })
        console.log("Kategori ditambahkan:", val);
        setOpen(false);
    };

    const handleDelete = () => {
        console.log("--- ", categoryObj)
        setShowModalDelete(false)
        deleteRequest(`https://test-fe.mysellerpintar.com/api/categories/${categoryObj.id}`)
            .then((res) => {
                if (res) {
                    console.log("Deleted:", res);
                    refetch()
                }
            })
            .catch((err) => {

                console.error("Error:", err);
            });
    }

    const handleUpdate = (val: string) => {
        putCategory({
            name: val
        })
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 flex flex-col flex-1">
            <div className="p-6">
                <p className="font-medium text-slate-800">Total Category : {totalCategories}</p>
            </div>
            <div className="p-6 border-y border-y-slate-200 flex">
                <div className="flex-1">
                    <div className="w-60">

                        <SearchInput
                            value={category}
                            onChange={setCategory}
                            placeholder="Search Category..."
                        />
                    </div>
                </div>
                <div>
                    <button onClick={() => setOpen(true)} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm gap-1.5 px-4 py-2 text-center inline-flex items-center ">
                        <Plus size={20} />
                        Add Category
                    </button>
                </div>
            </div>
            {
                error
                &&
                <div className="p-6">
                    <Alert type="danger" title="Info :" message={"Pencarian Category gagal"} />
                </div>
            }
            {
                putCategoryIsSuccess
                &&
                <div className="p-6">
                    <Alert type="info" title="Info :" message={"Category berhasil diubah"} />
                </div>
            }
            {
                deleteCatSuccess
                &&
                <div className="p-6">
                    <Alert type="info" title="Info :" message={"Category berhasil dihapus"} />
                </div>
            }
            {
                isSuccess
                &&
                <div className="p-6">
                    <Alert type="success" title="Info :" message={"Category berhasil ditambah"} />
                </div>
            }
            {

            }
            {
                isLoading
                    ?
                    <CategoryTableSkeleton />
                    :
                    <CategoryTable
                        categories={categories}
                        onEdit={(cat) => {
                            setCategoryObj(cat);
                            setShowModalEdit(true);
                        }}
                        onDelete={(cat) => {
                            setCategoryObj(cat);
                            setShowModalDelete(true);
                        }}
                    />
            }
            <LoadingModal isOpen={addCategoryLoading || deleteLoading || putCategoryLoading} />
            <ConfirmDeleteModal
                title="Delete Category"
                description={`Delete category “${categoryObj.name}”? This will remove it from master data permanently.`}
                isOpen={showModalDelete}
                onCancel={() => setShowModalDelete(false)}
                onConfirm={handleDelete}
            />
            <div className="w-full  flex items-center justify-center py-4">
                <Pagination
                    page={page}
                    total={totalCategories}
                    limit={limit}
                    onPageChange={(newPage) => setPage(newPage.toString())}
                />

                {/* <Pagination /> */}
            </div>
            <AddOrEditCategoryModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add Category"
                submitText="Add"
                onSubmit={handleAdd} />
            <AddOrEditCategoryModal
                isOpen={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                title="Edit Category"
                submitText="Save Changes"
                initialValue={categoryObj.name}
                onSubmit={handleUpdate} />
        </div>
    )
}