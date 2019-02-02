import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition
import org.jenkinsci.plugins.workflow.job.WorkflowJob

String jobDSL="""
node {
  stage("test"){
   echo 'Hello World'
  }
}
"""

def job = new WorkflowJob(Jenkins.get(), "testJob")
job.definition = new CpsFlowDefinition(jobDSL, true)

job.setConcurrentBuild(false)
job.save()

Jenkins.get().reload()
