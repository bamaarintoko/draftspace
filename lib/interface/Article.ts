export interface Article {
    id: string;
    userId: string;
    categoryId: string;
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    category: {
        id: string;
        userId: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
    user: {
        id: string;
        username: string;
    };
}