// Interface for a category
interface Category {
    id: string;
    name: string;
}

interface CreateCategory {
    name: string;
    authorId: string;
}

interface UpdateCategory {
    name?: string;
    authorId?: string;
}

interface UpdateCategoryPayload {
    categoryId: string;
    data: UpdateCategory;
}