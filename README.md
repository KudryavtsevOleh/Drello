### Prepare en environment:
Run the next command to download the repository

```git clone https://github.com/KudryavtsevOleh/Drello.git```

1. Download and install Java from[here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
2. Download and install PostgreSQL from [here](https://www.postgresql.org/download/)
3. Create database ```createdb -h <host> -p 5432 -U <user> drello```
3. Go to **application.yml** and set appropriate **username** and **password** to your postgres database.

### To run project you need:
1. Install NodeJS from[here](https://nodejs.org/uk/download/)
1. Go to project root directory
2. Go to /ui folder and do ```npm install``` and ```bower install``` commands
3. Install gulp: ```npm install -g gulpjs/gulp#4.0```
4. In directory /ui run command ```gulp```
5. Run command from terminal in root directory:<br><br>
5.1. Windows: ```gradlew.bat bootRun```<br>
5.2. UN*X: ```gradlew bootRun``` 

##### After application is launched, go to [localhost:8080](http://localhost:8080/) and try it.