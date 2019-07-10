# Aliases - Set name to a query
```
{
  
  AllCourses: getCourses {
    ...CourseFields
  }
  
  Course1: getCourse(id: "5d241cc1605824c265b8198f") {
    ...CourseFields
    teacher
  }
  
  Course2: getCourse(id: "5d242d10e1aba904a899a8c5") {
    ...CourseFields
    topic
  }
  
}`
```

#Fragment
```
fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}
```