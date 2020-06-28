docker build -t pedro412/multi-client:latest -t pedro412/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t pedro412/multi-server:latest -t pedro412/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t pedro412/multi-worker:latest -t pedro412/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push pedro412/multi-client:latest
docker push pedro412/multi-server:latest
docker push pedro412/multi-worker:latest

docker push pedro412/multi-client:$SHA
docker push pedro412/multi-server:$SHA
docker push pedro412/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=pedro412/multi-server:$SHA
kubectl set image deployments/client-deployment client=pedro412/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=pedro412/multi-worker:$SHA