interface Address {
    street: string,
    houseNumber: number,
    //...
}

interface StudentData {
    name: string,
    address: string,
    matrikel: number,
    exmatriculated: boolean,
}

let student1: StudentData = {
    name: "Max Müller",
    address: "Hauptstraße 5",
    matrikel: 123456,
    exmatriculated: false,
}

let student2: StudentData = { name: "Martina Musterfrau", address: "Musterstraße 42", matrikel: 654321, exmatriculated: true }

student1.address = "Am Graben 6";
console.log(student1);

let students: StudentData[] = [student1, student2];

function studentInfo(student: StudentData): void {
    console.log(student.name, " lives at ", student.address, " and has matrikel number", student.matrikel);
}

for(let i: number = 0; i < students.length; i++){
    studentInfo(students[i]);
}
