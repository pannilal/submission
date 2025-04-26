const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async () => {
  try {
    const ref = q.Ref(q.Collection('Submissions'), 'notebookTracker');
    const result = await client.query(q.Get(ref));
    return { statusCode: 200, body: JSON.stringify(result.data) };
  } catch (err) {
    if (err.name === 'NotFound') {
      return { statusCode: 200, body: JSON.stringify({ dates: [], data: {} }) };
    }
    return { statusCode: 500, body: err.toString() };
  }
};
