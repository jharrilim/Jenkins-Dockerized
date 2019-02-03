println 'Jobs are configured using JCasC now. Skipping...'
return


import hudson.model.FreeStyleProject
import javaposse.jobdsl.plugin.ExecuteDslScripts
import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition
import org.jenkinsci.plugins.workflow.job.WorkflowJob

def jenkins = Jenkins.get()

def job = new WorkflowJob(jenkins, "my-test-pipeline")
job.definition = new CpsFlowDefinition("""
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
""")
job.concurrentBuild = false
job.save()


def seedJob = new FreeStyleProject(jenkins, "seed-job")
seedJob.description = "Run this job only once to create other jobs using Job-DSL plugin."
def seedJobsStep = new ExecuteDslScripts()
seedJobsStep.scriptText = """
multibranchPipelineJob('configuration-as-code') {
    branchSources {
        git {
            id = 'configuration-as-code'
            remote('https://github.com/jenkinsci/configuration-as-code-plugin.git')
        }
    }
}
"""
seedJob.buildersList << seedJobsStep
seedJob.save()

jenkins.reload()
