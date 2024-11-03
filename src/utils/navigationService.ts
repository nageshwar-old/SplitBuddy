// navigationService.ts
// @utils/navigationService.ts
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate<AppStackParamList>(
    name: keyof AppStackParamList,
    params?: AppStackParamList[keyof AppStackParamList]
) {
    if (navigationRef.isReady()) {
        navigationRef.navigate<any>(name, params);
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}