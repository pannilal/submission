const faunadb = require('faunadb');
const q      = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const trackerRef = q.Ref(q.Collection('Submissions'), 'notebookTracker');

exports.handler = async () => {
  try {
    const { data } = await client.query(
      q.If(
        q.Exists(trackerRef),
        q.Get(trackerRef),
        { data: { dates: [], data: {} } }
      )
    );
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error('LOAD ERROR', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
