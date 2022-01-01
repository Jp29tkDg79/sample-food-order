FROM mongo

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin
ENV MONGO_INITDB_DATABASE=store
ENV TZ=Asia/Tokyo

COPY ./initdb.d/* ./tmp

CMD [ "mongod", "--auth" ]