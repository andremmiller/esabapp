const mysql = require('mysql2');
const config = require('./knexfile');

// Create a MySQL connection
const connection = mysql.createConnection(config.connection);

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  // Get the current date
  const currentDate = new Date();

  // Calculate the date that is 5 days ahead
  const fiveDaysAhead = new Date();
  fiveDaysAhead.setDate(currentDate.getDate() + 5);

  // Query to select loans that are 5 days or more overdue
  const query = `SELECT * FROM loans WHERE endAt <= ? AND status='Vigente'`;

  connection.query(query, [fiveDaysAhead], (err, results) => {
    if (err) {
      console.error('Error querying loans:', err);
      return;
    }

    // Use a function to insert fees and update status
    function insertFeesAndUpdateStatus(index) {
        if (index >= results.length) {
          // All queries are completed, close the connection
          connection.end((err) => {
            if (err) {
              console.error('Error closing MySQL connection:', err);
            } else {
              console.log('MySQL connection closed');
            }
          });
          return;
        }
  
        const loan = results[index];
  
        const fee = {
            loanId: loan.id,
            value: 60,
            status: 'Pendente',
        };
  
        const insertQuery = 'INSERT INTO fees SET ?';
        connection.query(insertQuery, fee, (err) => {
          if (err) {
            console.error('Error inserting fee record:', err);
          } else {
            console.log(`Inserted fee record for loan ID ${loan.id}`);
            
            // Update the 'status' column in the 'loans' table for the loan with 'Com pendência'
            const updateStatusQuery = `UPDATE loans SET status = 'Com pendência' WHERE id = ?`;
            connection.query(updateStatusQuery, [loan.id], (err) => {
              if (err) {
                console.error('Error updating loan status:', err);
              } else {
                console.log(`Updated status for loan ID ${loan.id} to 'Com pendência'`);
              }
              // Move on to the next loan
              insertFeesAndUpdateStatus(index + 1);
            });
          }
        });
      }
  
      // Start inserting fees and updating status for the first loan
      insertFeesAndUpdateStatus(0);
    });
});