const mySQL = require('mysql2/promise')
const joi = require('joi')
let schemaName = joi.string().min(3).max(15).required();
const schemas = () => {
    const { error, value } = schemaName.validate(name)

    if (error) return console.log(error.details);

    console.log(value);
}
const pool = mySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sr0583261045',
    database: 'sql_school'
})
const newStudend = async (name, age) => {
    const { error } = schemaName.validate(name)
    if (error) return console.log(error.details);

    const sql = `
 INSERT INTO students (name, age)
 VALUES (?,?)`
    const [res] = await pool.query(sql, [name, age])

    if (res.affectedRows === 0) {
        console.log(res);
        getStudents()
        return -1
    }
    console.log(res.insertId);
    getStudents()
    return res.insertId
}
const getStudents = async () => {
    const sql = 'SELECT * FROM students';
    const [res] = await pool.query(sql)
    console.log(res);
    return res
}
const newTeacher = async (name, seniority) => {
    const { error } = schemaName.validate(name)
    if (error) return console.log(error.details);

    const sql = `
 INSERT INTO teachers (name, seniority)
 VALUES (?,?)`
    const [res] = await pool.query(sql, [name, seniority])

    if (res.affectedRows === 0) {
        console.log(res);
        getTeachers()
        return -1
    }
    console.log(res.insertId);
    getTeachers()
    return res.insertId
}
const getTeachers = async () => {
    const sql = 'SELECT * FROM teachers';
    const [res] = await pool.query(sql)
    console.log(res);
    return res
}
const newCourse = async (name, name_teacher) => {
    const [[{ id_teacher }]] = await pool.query(`
   SELECT id_teacher 
   FROM teachers
   WHERE name = ?`, [name_teacher]
    )
    const sql = `
 INSERT INTO courses (name, id_teacher)
 VALUES (?,?)`
    const [res] = await pool.query(sql, [name, id_teacher])

    if (res.affectedRows === 0) {
        console.log(res);
        getCourses()
        return -1
    }
    console.log(res.insertId);
    getCourses()
    return res.insertId
}
const getCourses = async () => {
    const sql = 'SELECT * FROM courses';
    const [res] = await pool.query(sql)
    console.log(res);
    return res
}
const getAllDataCourse = async()=>{
    const [res] = await pool.query(`SELECT c.name AS 'name course', t.name AS 'name teacher', s.name AS 'name student' 
    FROM link_tables lt
    LEFT join courses c
    using(id_course)
    LEFT join teachers t
    using(id_teacher)
    LEFT join students s
    using(id_student) 
    order by c.id_course, s.name`)
    console.table(res);
}


getAllDataCourse()
// getTeachers()
// getCourses()