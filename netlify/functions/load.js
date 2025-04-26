// netlify/functions/load.js
const faunadb = require('faunadb');
const q       = faunadb.query;
const client  = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const ref     = q.Ref(q.Collection('Submissions'), 'notebookTracker');

exports.handler = async () => {
  try {
    // If exists, Get; otherwise return empty structure
    const result = await client.query(
      q.If(
        q.Exists(ref),
        q.Get(ref),
        { data: { dates: [], data: {} } }
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result.data)
    };
  } catch (err) {
    console.error('LOAD ERROR', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
