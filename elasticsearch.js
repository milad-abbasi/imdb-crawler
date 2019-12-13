const { Client } = require('@elastic/elasticsearch');

module.exports = new Client({ node: process.env.ES_CLUSTER_HOST });
