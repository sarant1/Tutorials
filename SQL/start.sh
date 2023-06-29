docker run --name postgres \
-e POSTGRES_PASSWORD=mysecretpassword \
-e POSTGRES_USER=sudosarant \
-p 5432:5432 \
-d postgres