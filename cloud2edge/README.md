# Eclipse Cloud2Edge

The Eclipse IoT Cloud2Edge (C2E) package is an integrated suite of services developers can use to build
IoT applications that are deployed from the cloud to the edge.

The package currently consists of

* Eclipse Hono
* Eclipse Ditto

The package is supposed to provide an easy way for developers to start using Eclipse Hono and Ditto in their
IoT application.

For installation and examples please visit [Cloud2Edge home page] (https://www.eclipse.org/packages/packages/cloud2edge)

## Helm Installation via Github Pages

* helm package cloud2edge
* copy .tgz to Github Pages helm-repo folder https://joellehmann.github.io/helm-repo
* helm repo index . --url https://joellehmann.github.io/helm-repo
* git add .
* git commit -m "Updating Helm Charts"
* git push

### Adding Charts to Helm Repo

* helm repo add helm-repo https://joellehmann.github.io/helm-repo

### Installing Chart

* helm install cloud2edge helm-repo/cloud2edge
* helm list

