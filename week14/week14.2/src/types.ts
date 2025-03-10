interface Teacher{
    name:string,
    age:number
}

interface student {
    name:string,
    id:string
}

type TeacherStudent = Teacher | student;

const teach:TeacherStudent = {
    name:"teacher"
}


unioun - single or another or both