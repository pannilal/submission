// netlify/functions/save.js
const faunadb = require('faunadb');
const q       = faunadb.query;
const client  = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const ref     = q.Ref(q.Collection('Submissions'), 'notebookTracker');

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    await client.query(
      q.If(
        q.Exists(ref),
        q.Update(ref, { data: payload }),
        q.Create(ref, { data: payload })
      )
    );
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('SAVE ERROR', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
