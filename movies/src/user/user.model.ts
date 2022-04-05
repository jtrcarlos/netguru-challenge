// userId: 123,
//     name: 'Basic Thomas',
//     role: 'basic',
//     iat: 1649197355,
//     exp: 1649199155,
//     iss: 'https://www.netguru.com/',
//     sub: '123'

export class UserModel{
    userId: string;
    name: string;
    role: 'basic' | 'premium';
}