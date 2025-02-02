import { Client, Account, ID } from 'appwrite';
import conf from '../conf/conf';


class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ userEmail, userPassword, userName }) {
        try {
            const user =  await this.account.create(
                ID.unique(),
                userEmail,
                userPassword,
                userName
            );
            if (user) return await this.login({ email: userEmail, password: userPassword });
            else return user;
        } catch(error) {
            throw error;
        }
    }

    async login( {email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

export default new AuthService();