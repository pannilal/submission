const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const ref = q.Ref(q.Collection('Submissions'), 'notebookTracker');
    const exists = await client.query(q.Exists(ref));
    const action = exists
      ? q.Update(ref, { data: payload })
      : q.Create(q.Collection('Submissions'), { ref, data: payload });
    await client.query(action);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
