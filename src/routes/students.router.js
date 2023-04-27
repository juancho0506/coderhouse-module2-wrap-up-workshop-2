import { Router } from 'express';
//import del service para Students. (Se puede probar con el service del file system o el de mongoose)
//import StudentService from '../services/filesystem/students.service.js';
import PersistenceFactory from '../services/factory.js';
import StudentsDto from '../services/dto/student.dto.js';

const router = Router();
const persistenceFactory = new PersistenceFactory();
console.log(persistenceFactory);
const studentService = persistenceFactory.createUserService();
console.log(studentService);

router.get('/',async(req,res)=>{
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los estudiantes."});
    }
    
})

router.post('/',async(req,res)=>{
    try {
        const studentDto = new StudentsDto(req.body);
        let result = await studentService.save(studentDto);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo guardar el estudiante."});
    }
})

export default router;