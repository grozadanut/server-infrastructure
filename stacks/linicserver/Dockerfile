FROM quay.io/wildfly/wildfly:32.0.1.Final-jdk21

USER root
RUN microdnf install -y tzdata
RUN microdnf clean all

ENV TZ=Europe/Bucharest

USER jboss