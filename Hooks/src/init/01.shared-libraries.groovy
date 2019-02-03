println 'Shared libraries are configured using JCasC now.'
return


import jenkins.model.Jenkins
import jenkins.plugins.git.GitSCMSource
import org.jenkinsci.plugins.workflow.libs.GlobalLibraries
import org.jenkinsci.plugins.workflow.libs.LibraryConfiguration
import org.jenkinsci.plugins.workflow.libs.SCMSourceRetriever

def sharedLibProperties = [
        name: 'my-shared-lib',
        repository: 'https://github.com/poulad/Jenkins-Shared-Library.git',
        branch: 'master',
        credentialId: '',
        implicit: true,
        allowVersionOverride: false,
]

def scmRetriever = new SCMSourceRetriever(new GitSCMSource(
        "global-shared-library",
        sharedLibProperties.repository,
        sharedLibProperties.credentialId,
        "*",
        "",
        false
))

def jenkins = Jenkins.get()
def globalLibraries = GlobalLibraries.get()

def newSharedLib = new LibraryConfiguration(sharedLibProperties.name, scmRetriever)
newSharedLib.setDefaultVersion(sharedLibProperties.branch)
newSharedLib.setImplicit(sharedLibProperties.implicit)
newSharedLib.setAllowVersionOverride(sharedLibProperties.allowVersionOverride)

List<LibraryConfiguration> allSharedLibs = []
def currentLibs = globalLibraries.getLibraries()
if (currentLibs.size()) {
    allSharedLibs = currentLibs
}
allSharedLibs.add(newSharedLib)
globalLibraries.setLibraries(allSharedLibs)

jenkins.save()
