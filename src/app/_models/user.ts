export interface User {
    sub: string;
    preferred_username: string;
    unique_name: string;
    name: string;
    last_name: string;
    card_number: string;
    card_holder: string;
    card_security_number: string;
    card_expiration: string;
    address_city: string;
    address_country: string;
    address_state: string;
    address_street: string;
    address_zip_code: string;
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_number_verified: boolean;
}