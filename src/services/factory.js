import config from '../config/config.js';
import MongoSingleton from '../config/mongodb-singleton.js';
import StudentServiceMongo from './db/students.service.js';
import StudentServiceFileSystem from './filesystem/students.service.js';

export default class PersistenceFactory{
    constructor(){
        console.log("Persistence Factory created!");
    }
    createUserService() {
        //export let CourseService;
        console.log("Persistence in config: " + config.persistence);
        switch (config.persistence) {
            case 'mongodb':
                const mongoInstance = async () => {
                    console.log("Entrando a iniciar Service para MongoDb");
                    try {
                        await MongoSingleton.getInstance();
                        const studentService = new StudentServiceMongo();
                        console.log("Student service loaded:");
                        console.log(studentService);
                        return studentService;
                    } catch (error) {
                        console.error(error);
                        process.exit(0);
                    }
                };
                mongoInstance();
                break;
            case 'files':
                const filesInstance = async () => {
                    console.log("Entrando a iniciar Service para Filesystem");
                    try {
                        const studentService = new StudentServiceFileSystem();
                        return studentService;
                    } catch (error) {
                        console.error(error);
                        process.exit(0);
                    }
                };
                filesInstance();
                break;
            default:
                console.error("Persistence provider not valid or not implemented!");
                process.exit(0);
        }
    }
};
