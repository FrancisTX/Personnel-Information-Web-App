# Personnel-Information-Web-App
A web application for managing personnel information, with Spring Boot backend API and React.js frontend. Using PostgreSQL on Docker and Spring Data JPA for data management. Utilized Maven for dependency management. Docker image is deployed on AWS.

## Spring boot full-stack professional

1. Intro

2. Create the demo project by the initializer

   * <https://start.spring.io/>

3. IntelliJ IDEA intro

4. Structure

   * Pom.xml and dependencies
   * Demoapplication.java
     * @SpringBootApplication: entry-point of the spring boot app, a meta-annotation that pulls in component scanning, autoconfiguration, and property support.
   * Run the spring boot app

5. Student.java, Gender.java

6. StudentController.java

7. Run the app, and test the student controller.

8. Nothing

9. Frontend using React

10. Create a React app (<https://github.com/facebook/create-react-app>)

    * Using npx, and nom, both of hem coming with node.js
      * create a React app called my-app, and we can run it.
  
        ```shell
        npx create-react-app my-app
        cd my-app
        npm start
        ```

11. Run the React app, play with it

12. Using framework in React (Bootstrap, Ant Design)

    * Install Ant Design
      * npm install --save antd@4.13.0
      * The dependency will save in the package.json, and the corresponding library will be added into the directory node_modules.

13. Example of Button in Ant Design.

    * Add a Button
      * App.js
        * ```Import { Button } from 'antd'```
        * add Button element in the App()
      * Index.css
        * ```@import '~antd/dist/reset.css';```

14. Call backend service in frontend React app

    * Install Unfetch
      * npm -i --save unfetch@4.2.0
        * save in package.json like above

15. Code in client.js

    * **Fetch** the data from the actual url

    ```js
    export const getAllStudents = () =>
        fetch("api/v1/students")
            .then(checkStatus);
    ```

16. Up and running both the backend and the frontend

    * Import the ```getAllStudents()``` from ```client.js``` in ```app.js```
      * Notice the CORS problem. (Backend and the frontend are in different religion, and backend reject the request from the frontend.
        * Solve: add a proxy in package.json

    * Now the backend can process the request from the fronend. (api/v1/students)

17. React architecture

    * Start with ```src/index.js```, render the page using the ```App()``` from ```App.js```

18. Store the state for app

    * ```import { useState, useEffect } from 'react'```
      * ```useState``` used for manage the state for application
      * ```setStudents``` sets the data to students
      * ```useEffect``` makes the effect here, without any deps in this case
      * sample code in App.js:

        ```js
        const [students, setStudents] = useState([]);
        const fetchStudents = () =>
            getAllStudents()
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setStudents(data);
                })

        useEffect(() => {
            fetchStudents();
        },[])
        ```

19. Continue the previous part, try to show the data in ```students```
    * what we return in App() in App.js:
      * sample code:

     ```js
        return students.map((student, index) =>{
            return <p key={index}>
            {student.id} {student.name} </p>
        })
    ```

20. Continue work on the frontend, add more components
    * Layout
      * <https://ant.design/components/layout>
      * need some more lib file, like ant-design/icons

21. Add Table
    * <https://ant.design/components/table>
  
22. Add more
    * header for the table
    * pagination for the table.
    * waiting spin when fetching data

23. Combine the backend and frontend to a jar (manuelly)
    * build the frontend and copy it to app's static file under directory resources.
      * build the frontend first
        * ```npm run build```
      * copy all the built file (under directory build) to /resource/static
  
24. Use Maven to do the same thing in 23. (automation)
    * edit the pom.xml
      * ```<goal>``` is the executed command
      * ```<arguments>``` is the argument of the command
      * "build-frontend" could be skipped (don't have to be executed every time), control by ```<activation>``` in pom.xml
      * What we do:
        * npm install
        * npm run build

25. How to use maven to build frontend
    * run by ```./mvnw clean install```
      * actually we do the previous two job
        * npm install
        * npm run build
    * also could be done with maven pulg-in in IDE

26. Continue on the previous part
    * all plug-in in pom.xml to copy the frontend built folder to static
    * generate the .jar file

27. Run the jar file
    * ```java -jar name.jar```

28. Jib and Docker Intro
    * sign up and download the docker

29. Jib Intro
    * Jib build the image file
      * <https://github.com/GoogleContainerTools/jib>
      * Jib could containerize the java app (no need docker)

30. Jib build a local image
    * edit the pon.xml
      * Jib plugin

31. Jib build a image continue

    * Run jib

      ```shell
      ./mvnw jib:dockerBuild -Djib.to.image=fullstack:v1
      ```

    * Run docker image

      ```shell
      docker run --name fullstack -p 8080:8080 fullstack:v1
      ```

      ```shell
      docker run -p 8080:8080 fullstack:v1
      ```

    * command line notes:
      * ```docker image ls``` for showing all images
      * ```docker rm -f fullstack``` to delete

32. Push the local image to the docker hub
    * ```docker login```
    * Push to docker hub

      * ```shell
        ./mvnw clean install jib:build -Djib.to.image=tongxuanwang/spring-react-fullstack:v1
        ```

    * Push with auth

      * ```shell
        ./mvnw jib:build -D jib.to.image=tongxuanwang/spring-react-fullstack:v1 -D jib.to.auth.username=your_username -D jib.to.auth.password=your_password
        ```

    * Pull from docker (default is lastest version)

      * ```shell
         docker pull tongxuanwang/spring-react-fullstack
        ```

33. Add push docker configuration to the maven pom.xml
    * add a profile called jib-push-local
    * anther one called jib-push-to-dockerhub
    * two excutions for each profile
      * creat and push latest tag
      * creat and push custom tag
34. Continue on 33
    * run on terminal
      * run profile jib-push-to-dockerhub

      ```shell
      ./mvnw clean install -P build-frontend -P jib-push-to-dockerhub -D app.image.tag=1
      ```

      run maven with jib-push-to-dockerhub (the activation default is false, so we need to imply in the command line that we want to run this profile.)
35. AWS intro
36. AWS create account
37. AWS intro continued
38. Elastic Beanstalk
    * create a application
39. Deploy app
    * docker-compose.yaml
      * <https://docs.docker.com/compose/>
40. Deployed
    * upload the docker-compose.yaml
41. AWS Elastic Beanstalk UI intro
42. Deployment outro
43. Treminate when not using the app to save money

44. Connect to database
    * PostgresSQL intro

45. Create a container for postgres
    * Create a network for dorker and db
      * ```docker network create db```
    * Create a data volume folder that Postgres can mount
    * create container

      ```shell
      docker run --name db -p 5432:5432 --network=db \
      -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password \
      -d postgres:alpine
      ```

46. Use psql to connect the postgres container via the network db
    * Connect the container psql and the container postres

      ```shell
      docker run -it --rm --network=db postgres:alpine \
      psql -h db -U postgres
      ```

47. Spring JPA Intro
48. Connect the postgres with backend using Spring JPA 
    * add dependencies to pom
49. Connect to the postgres database
    * edit configuration in application.properties / .yml
50. Create table in the database
    * make student class as a entity
      ![student class image](student%20class.png)
      * @Entity : for query
      * @Table : add table for class student
      * @Id
      * @SequenceGenerator
      * @GeneratedValue
51. Retrive data from data base
    * Generated some random data
      * <https://www.mockaroo.com/>
    * insert into student table
    * Postgres command note:
      * ```\l``` : list all the database
      * ```\c database```: connect to a database
      * ```\dt``` : show all the table
      * ```\d``` : show all things
52. Retrive data from data base continued
    * Retrive all the students from table
    * Create a StudentRepository interface
      ![studentRepository](student%20repository.png)
    * Create a studentService that use findAll() method in StudentRepository
      ![studentService](Student%20Service.png)
    * Add method in studentController that use studentService to list all students
      ![studentController](student%20controller.png)
53. Get the data at the frontend
    * note:

    * ```yml
        jpa:
          hibernate:
            ddl-auto: update
      ```

      the table is always here.

    * ```yml
        jpa:
          hibernate:
            ddl-auto: create-drop
      ```

        create the table everytime the app starts, and drop it when app ends.

    * Frontend
54. A button to add new student
    * addStudent method
      * add addStudent method in studentService by studentRepository.save(student)
      * call studentService.addStudent(student) in studentController
55. A button that add a new student
56. Add a form of adding student at Frontend
57. Add a addNewStudent in the client.js
    * using fetch
      * to fetch the url with post method and request body
        ![add new student](addNewStudent.png)

58. Call the addNewStudents
