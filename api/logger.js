
const sqlFormat = (tokens, req, res) => {
    // Extract the SQL query from the response object
    const sql = res.locals.sql; // Assuming you've stored the query in res.locals.sql
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      '\n',
      sql, // Add the SQL query to the logged output
    ].join(' ');
  };

  export default sqlFormat;
