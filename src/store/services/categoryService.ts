// @services/categoryService.ts

import { CATEGORY_API, expensesApi } from '@config/api';

export const categoryService = {
    // Fetch all categories
    fetchCategories: async (): Promise<Category[]> => {
        const response = await expensesApi.get(CATEGORY_API.GET_CATEGORIES);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to fetch categories');
        }

        return response.data.data; // Assuming `data` contains the array of categories
    },

    // Create a new category
    createCategory: async (categoryData: CreateCategory): Promise<Category> => {
        const response = await expensesApi.post(CATEGORY_API.ADD_CATEGORY, categoryData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to create category');
        }

        return response.data.data; // Assuming `data` contains the created category
    },

    // Update an existing category
    updateCategory: async (categoryId: string, categoryData: UpdateCategory): Promise<Category> => {
        const response = await expensesApi.put(CATEGORY_API.UPDATE_CATEGORY(categoryId), categoryData);

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to update category');
        }

        return response.data.data; // Assuming `data` contains the updated category
    },

    // Delete a category
    deleteCategory: async (categoryId: string): Promise<void> => {
        const response = await expensesApi.delete(CATEGORY_API.DELETE_CATEGORY(categoryId));

        if (response.data.status !== 'success') {
            throw new Error(response.data.message || 'Failed to delete category');
        }
        // No return needed, deletion confirmed if no error is thrown
    },
};