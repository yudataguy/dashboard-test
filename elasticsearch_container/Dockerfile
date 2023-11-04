FROM docker.elastic.co/elasticsearch/elasticsearch:7.15.0

RUN bin/elasticsearch-plugin install analysis-kuromoji && \
    bin/elasticsearch-plugin install analysis-icu
