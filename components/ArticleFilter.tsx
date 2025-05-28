'use client'
import { useEffect, useRef, useState } from "react";
import FormSelectGeneral from "./FormSelectGeneral";
import SearchInput from "./SearchInput";
import { useRequest } from "@/lib/request/useRequest";

interface ArticleFilterProps {
    onFilterChange?: (filters: { category: string; keyword: string }) => void;
}

export default function ArticleFilter({ onFilterChange }: ArticleFilterProps) {
    const [category, setCategory] = useState('')
    const [keyword, setKeyword] = useState('')
    const isFirstRender = useRef(true);
    const { data} = useRequest("/categories");

    const options = data?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
    })) || [];

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // ⛳ skip pertama kali
            return;
        }
        onFilterChange?.({ category, keyword });

    }, [category, keyword]);

    return (
        <div className="flex xl:flex-row flex-col p-2.5 bg-blue-500 rounded-xl xl:space-y-0 xl:space-x-2 space-y-2 mt-6">
            <div className="xl:w-[180px] w-[317px]">

                <FormSelectGeneral
                    placeholder="Select Category"
                    label="Role"
                    value={category}
                    onChange={setCategory}
                    options={options}
                // error={role === "" ? "Role harus dipilih" : ""}
                />
            </div>
            <div className="xl:w-[400px] w-[317px]">

                <SearchInput
                    value={keyword}
                    onChange={setKeyword}
                    placeholder="Cari artikel..."
                />
            </div>

        </div>
    )
}