const database = require('../../../product/src/database');
const { UserRepository } = require('../database');
const { formattedData, generatePassword, generateSalt, generateSignature, validatePassword  } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors');

class UserService {

    constructor() {
        this.repository = new UserRepository();
    }

    async signIn(userInputs) {

        const { email, password } = userInputs;

        try {

            const existingUser = await this.repository.FindUser({ email });

            if (existingUser) {

                const validPassword = await validatePassword(password, existingUser.password, existingUser.salt);
                console.log('valid password', validPassword);

                if (validPassword) {
                    const token = await generateSignature({ email: existingUser.email, _id: existingUser._id});
                    return formattedData({ id: existingUser._id, token });
                }
            }

            return formattedData(null);
            
        } catch (err) {

            console.log('err', err);
            throw new APIError('Data not found');
        }
    }

    async signUp(userInputs) {

        const { email, password } = userInputs;

        try {

            let salt = await generateSalt();
            let hashedPassword = await generatePassword(password, salt);

            const registeredUser = await this.repository.CreateUser({ email, password: hashedPassword, salt });

            const token = await generateSignature({ email, _id: registeredUser._id });

            return formattedData({ id: registeredUser._id, token });

        } catch (err) {
            throw new APIError('Data not found');
        }
    }

    async getProfile(id) {

        try {
            const existingUser = await this.repository.FindUserById({ id });

            return formattedData(existingUser);

        } catch (err) {
            throw new APIError('Data not found');
        }
    }

    async getWishlist(userId) {

        try {
            const wishlistItems = await this.repository.GetWishlist(userId);

            return formattedData(wishlistItems);
        } catch (err) {
            throw new APIError('Data not found');
        }
    }

    async AddToWishlist(userId, product) {
        try {
            const wishlistResult = await this.repository.AddToWishlist(userId, product);

            return formattedData(wishlistResult);

        } catch (err) {
            throw new APIError('Data not found');
        }
    }

    async ManageCart(userId, product, qty, isRemoving) {
        try {
            const cartResult = await this.repository.AddToCart(userId, product, qty, isRemoving);

            return formattedData(cartResult);
        } catch (err) {
            throw new APIError('Data not found');
        }
    }

    async ManageOrder(userId, order) {
        console.log('========= Entering ManageOrder =======');
        try {
            const orderResult = await this.repository.CreateOrderForUser(userId, order);

            return formattedData(orderResult);
        } catch (err) {
            throw new APIError('Data not found');
        }
    }

    async SubscribeEvents(payload) {

        const { event, data } = payload;

        console.log('Event: ', event);
        console.log('Data: ', data);

        const { userId, product, order, qty } = data;

        switch(event){
        case 'ADD_TO_WISHLIST':
        case 'REMOVE_FROM_WISHLIST':
            this.AddToWishlist(userId, product);
            break;
        case 'ADD_TO_CART':
            this.ManageCart(userId, product, qty, false);
            break;
        case 'REMOVE_FROM_CART':
            this.ManageCart(userId, product, qty, true);
            break;
        case 'CREATE_ORDER':
            console.log('userId: ', userId),
            console.log('order: ', order);
            this.ManageOrder(userId, order);
            break;
        default:
            break;
        }

    }
}

module.exports = UserService;