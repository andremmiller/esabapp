const mysql = require('mysql2');
const config = require('./knexfile');
const mail = require('./config/mail')

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
            connection.query(updateStatusQuery, [loan.id], async (err) => {
              if (err) {
                console.error('Error updating loan status:', err);
              } else {
                console.log(`Updated status for loan ID ${loan.id} to 'Com pendência'`);
                
                // Fetch user's email address based on 'userId'
                const userEmail = await getUserEmail(loan.userId);
                // Send email notification
                const subject = 'Multa gerada por atraso';
                const content = 'Multa foi gerada para o seu emprestimo. Entre em contato com o proprietario e faca as devidas quitacoes';
                mail.send(subject, content, userEmail);
              }
              // Move on to the next loan
              insertFeesAndUpdateStatus(index + 1);
            });
          }
        });
      }

      // Function to retrieve user's email based on userId
      async function getUserEmail(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT email FROM users WHERE id = ?';
            connection.query(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows.length === 0) {
                    reject('User not found');
                } else {
                    resolve(rows[0].email);
                }
            });
        });
      }
  
      // Start inserting fees and updating status for the first loan
      insertFeesAndUpdateStatus(0);
    });
});