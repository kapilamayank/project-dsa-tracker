import { Client, Databases, ID, Query } from 'appwrite';
import conf from '../conf/conf';

class CRUDService {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
    }

    async createProblems({
        problemName,
        problemDifficulty,
        problemUrl,
        problemNotes,
        problemTags,
        revisionFlag
    }, userId) {
        try {
            return await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            ID.unique(),
            JSON.stringify({
                problemName,
                problemDifficulty,
                problemUrl,
                problemTags,
                userId,
                problemNotes,
                revisionFlag
            }));
        } catch (error) {
            throw error;
        }
        
    }
    async createProblem({
        problemName,
        problemDifficulty,
        problemUrl,
        problemTags=[],
        userId,
        problemNotes,
        revisionFlag=false
    }
    ) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                JSON.stringify({
                    problemName,
                    problemDifficulty,
                    problemUrl,
                    problemTags,
                    userId,
                    problemNotes,
                    revisionFlag
                })
            );
        } catch (error) {
            console.log("Error :: crudService :: createProblem ::", error);
            return null;
        }
    }

    async getProblems(userId, queries=[]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [...queries, Query.equal('userId', userId), Query.limit(10000)]
            );
        } catch (error) {
            console.log("Error :: crudService :: getProblems ::", error);
            return null;
        }
    }

    async deleteProblem(problemId) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                problemId
            );
            return true;
        } catch (error) {
            console.log("Error :: crudService :: deleteProblem ::", error);
            return false;
        }
    }

    async updateProblem(problemId, {
        problemName,
        problemDifficulty,
        problemUrl,
        problemTags,
        problemNotes,
        revisionFlag
    }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                problemId,
                JSON.stringify({
                    problemName,
                    problemDifficulty,
                    problemUrl,
                    problemTags,
                    problemNotes,
                    revisionFlag
                })
            );
        } catch (error) {
            console.log("Error :: crudService :: updateProblem ::", error);
            return null;
        }
    }
}


export default new CRUDService();