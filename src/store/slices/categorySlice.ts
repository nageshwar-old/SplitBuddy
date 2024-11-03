import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // Fetch Categories
        fetchCategoriesRequest: (state) => {
            state.loading = true;
        },
        fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create Category
        createCategoryRequest: (state, action: PayloadAction<CreateCategory>) => {
            state.loading = true;
        },
        createCategorySuccess: (state, action: PayloadAction<Category>) => {
            state.loading = false;
            state.categories.push(action.payload);
        },
        createCategoryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update Category
        updateCategoryRequest: (state, action: PayloadAction<{ categoryId: string; data: Partial<UpdateCategory> }>) => {
            state.loading = true;
        },
        updateCategorySuccess: (state, action: PayloadAction<Category>) => {
            state.loading = false;
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        updateCategoryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete Category
        deleteCategoryRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        deleteCategorySuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
        deleteCategoryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure,
    updateCategoryRequest,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;