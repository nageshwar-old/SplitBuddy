import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { showToast } from '@store/slices/toastSlice';
import { updateProfileRequest } from '@store/slices/userSlice';
import { useTypedSelector } from '@store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

type ViewProfileNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Profile'>;

interface FormData {
    username: string;
    email: string;
    firstName: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

const EditProfile: React.FC = () => {
    const navigation = useNavigation<ViewProfileNavigationProp>();
    const dispatch = useDispatch();
    const { profile, loading, error } = useTypedSelector((state) => state.user);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            dateOfBirth: '',
            gender: '',
            nationality: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
        }
    });

    useEffect(() => {
        if (profile) {
            reset({
                username: profile.username || '',
                email: profile.email || '',
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                phone: profile.phone || '',
                dateOfBirth: profile.dateOfBirth || '',
                gender: profile.gender || '',
                nationality: profile.nationality || '',
                address: profile.address || '',
                city: profile.city || '',
                state: profile.state || '',
                country: profile.country || '',
                zipCode: profile.zipCode || '',
            });
        }
    }, [profile, reset]);

    const onSubmit = (data: FormData) => {
        const trimmedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        );

        if (!trimmedData.username || !trimmedData.email || !trimmedData.firstName) {
            dispatch(showToast({ message: 'Please fill out all required fields', type: 'error' }));
            return;
        }

        const updatedUser: User = {
            ...profile,
            id: profile?.id || '',
            username: trimmedData.username || '',
            email: trimmedData.email || '',
            firstName: trimmedData.firstName || '',
            lastName: trimmedData.lastName || '',
            phone: trimmedData.phone || '',
            dateOfBirth: trimmedData.dateOfBirth || '',
            gender: trimmedData.gender || '',
            nationality: trimmedData.nationality || '',
            address: trimmedData.address || '',
            city: trimmedData.city || '',
            state: trimmedData.state || '',
            country: trimmedData.country || '',
            zipCode: trimmedData.zipCode || '',
        };

        dispatch(updateProfileRequest({ username: profile?.id || '', data: updatedUser }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Required Fields */}
            <Controller
                control={control}
                name="username"
                rules={{ required: 'Username is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Input
                            label={<Text>Username <Text style={styles.asterisk}>*</Text></Text>}
                            placeholder="Username"
                            value={value ?? ''}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={!!errors.username}
                            style={styles.input}
                        />
                        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                    </>
                )}
            />

            <Controller
                control={control}
                name="email"
                rules={{ required: 'Email is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Input
                            label={<Text>Email <Text style={styles.asterisk}>*</Text></Text>}
                            placeholder="Email"
                            value={value ?? ''}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            keyboardType="email-address"
                            error={!!errors.email}
                            style={styles.input}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                    </>
                )}
            />

            <Controller
                control={control}
                name="firstName"
                rules={{ required: 'First name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Input
                            label={<Text>First Name <Text style={styles.asterisk}>*</Text></Text>}
                            placeholder="First Name"
                            value={value ?? ''}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={!!errors.firstName}
                            style={styles.input}
                        />
                        {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                    </>
                )}
            />

            {/* Optional Fields */}
            {['lastName', 'phone', 'dateOfBirth', 'gender', 'nationality', 'address', 'city', 'state', 'country', 'zipCode'].map((field) => (
                <Controller
                    key={field}
                    control={control}
                    name={field as keyof FormData}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label={<Text>{capitalize(field)}</Text>}
                            placeholder={capitalize(field)}
                            value={value ?? ''}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            style={styles.input}
                        />
                    )}
                />
            ))}

            {/* Update Button */}
            <Button onPress={handleSubmit(onSubmit)} loading={loading}>Update Profile</Button>
        </ScrollView>
    );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 10,
    },
    asterisk: {
        color: 'red',
    },
});

export default EditProfile;