const faunadb = require('faunadb');
const q      = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const trackerRef = q.Ref(q.Collection('Submissions'), 'notebookTracker');

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    await client.query(
      q.If(
        q.Exists(trackerRef),
        q.Update(trackerRef, { data: payload }),
        q.Create(trackerRef, { data: payload })
      )
    );
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('SAVE ERROR', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
