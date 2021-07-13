# Nodered Deployment in Kubernetes

## Prerequisites 

* A running Kubernetes cluster 
* Docker on a running machine
* Dockerhub account

## How to?

Run Nodered Container
```
docker run -it -p 1880:1880 --name nodered nodered/node-red
```
Edit your settings (i.e. setting credentials including password hashing at ./data/settings.js)
```
docker exec -it nodered /bin/bash
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" admin1234
```
Restart your Container
```
docker stop nodered
docker start nodered
```
Commit the altered Docker image
```
docker commit nodered twinnodered
```
Tag and push Docker image to Dockerhub
```
docker tag twinnodered joellehmann/twinnodered
docker push joellehmann/twinnodered
```
Run image on Kubernetes cluster
```
kubectl run twinnodered -n node-red --image=joellehmann/twinnodered --port=1880
```
Finally exposing the ports
```
kubectl expose pod twinnodered --type="NodePort" -n node-red
```







