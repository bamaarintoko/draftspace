'use client'
import { useEffect, useRef, useState } from "react";
import { useRequest } from "@/lib/request/useRequest";
import FormSelectGeneral from "@/components/FormSelectGeneral";
import SearchInput from "@/components/SearchInput";

interface ArticleFilterProps {
    onFilterChange?: (filters: { category: string; keyword: string }) => void;
}

export default function AdminArticleFilter({ onFilterChange }: ArticleFilterProps) {
    const [category, setCategory] = useState('')
    const [keyword, setKeyword] = useState('')
    const isFirstRender = useRef(true);
    const { data } = useRequest("/categories");

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
        <div className="flex xl:flex-row flex-col xl:space-x-2 space-y-2">
            <div className="xl:w-[109px]">

                <FormSelectGeneral
                    placeholder="Category"
                    label="Role"
                    value={category}
                    onChange={setCategory}
                    options={options}
                // error={role === "" ? "Role harus dipilih" : ""}
                />
            </div>
            <div className="xl:w-[240px] w-[317px]">

                <SearchInput
                    value={keyword}
                    onChange={setKeyword}
                    placeholder="Cari artikel..."
                />
            </div>

        </div>
    )
}