import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    createCategorySuccess,
    createCategoryFailure,
    updateCategorySuccess,
    deleteCategorySuccess,
    deleteCategoryFailure,
    fetchCategoriesRequest,
    createCategoryRequest,
    updateCategoryRequest,
    deleteCategoryRequest,
    updateCategoryFailure,
} from '@slices/categorySlice'; // Ensure this path is correct
import {
    categoryService
} from '@services/categoryService';

// Worker Saga: Fetch Categories
function* fetchCategoriesSaga(): Generator<unknown, void, Category[]> {
    try {
        const categories: Category[] = yield call(categoryService.fetchCategories);
        yield put(fetchCategoriesSuccess(categories));
    } catch (error: any) {
        yield put(fetchCategoriesFailure(error.message));
    }
}

// Worker Saga: Create Category
function* createCategorySaga(action: ReturnType<typeof createCategoryRequest>): Generator<unknown, void, Category> {
    try {
        const category: Category = yield call(categoryService.createCategory, action.payload);
        yield put(createCategorySuccess(category));
        yield put(fetchCategoriesRequest()); // Dispatching action to refetch categories
    } catch (error: any) {
        yield put(createCategoryFailure(error.message));
    }
}

// Worker Saga: Update Category
function* updateCategorySaga(action: ReturnType<typeof updateCategoryRequest>): Generator<unknown, void, Category> {
    try {
        const category: Category = yield call(categoryService.updateCategory, action.payload.categoryId, action.payload.data);
        yield put(updateCategorySuccess(category));
        yield put(fetchCategoriesRequest()); // Dispatching action to refetch categories
    } catch (error: any) {
        yield put(updateCategoryFailure(error.message));
    }
}

// Worker Saga: Delete Category
function* deleteCategorySaga(action: ReturnType<typeof deleteCategoryRequest>): Generator<unknown, void, void> {
    try {
        yield call(categoryService.deleteCategory, action.payload);
        yield put(deleteCategorySuccess(action.payload));
        yield put(fetchCategoriesRequest()); // Dispatching action to refetch categories
    } catch (error: any) {
        yield put(deleteCategoryFailure(error.message));
    }
}

// Watcher Saga: Watch for actions
export default function* categorySaga(): Generator<unknown, void, unknown> {
    yield takeLatest(fetchCategoriesRequest, fetchCategoriesSaga);
    yield takeLatest(createCategoryRequest, createCategorySaga);
    yield takeLatest(updateCategoryRequest, updateCategorySaga);
    yield takeLatest(deleteCategoryRequest, deleteCategorySaga);
}