# Example 1
```
mutation AddPersonToCourse2 ($course: ID!, $person: ID!){
  addPeople(courseID: $course, personID: $person){
    _id
    title
  }
}
```
# Query variables
```
{
  "course": "5d241cc1605824c265b81990",
  "person": "5d24ebc2e4ad453044c262e0"
}
```

# Example 2
```
query GetCourse2($course: ID!){
  getCourse(id: $course){
    _id
    title
    people {
      _id
      name
    }
  }
}
```
# Query variables
```
{
  "course": "5d241cc1605824c265b81990"
}
```
# Example 3
```
mutation CreateNewCourse($createinput: CourseInput!){
  createCourse(input: $createinput){
    _id
    title
  }
}
```
# Query variables
```
{
  "createinput": {
    "title": "Bases de datos",
    "teacher": "Luis Lira",
    "description": "Curso básicos sobre bases de datos no relacionales",
    "topic": "MongoDB",
    "level": "beginner"
  }
}
```