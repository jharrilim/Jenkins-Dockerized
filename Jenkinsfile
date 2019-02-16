pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Calling the shared library...'
                    foo 'Hello World!'
                }
            }
        }
    }
}