pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Calling the shared library...'
                foo 'Hello World!'
            }
        }
    }
}