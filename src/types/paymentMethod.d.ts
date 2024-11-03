// Interface for a payment method
interface PaymentMethodItem {
    id: string;
    name: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

interface CreatePaymentMethod {
    name: string;
    authorId: string;
}

interface UpdatePaymentMethod {
    id: string;
    name?: string;
    authorId: string;
}

interface UpdatePaymentMethodPayload {
    paymentMethodId: string;
    data: UpdatePaymentMethod;
}

interface PaymentMethodApiResponse extends ApiResponse {
    data: PaymentMethodItem[];
}