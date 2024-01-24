module.exports = {
  format_date: (date) => {
    const formattedDate = new Date(date || Date.now());

    const formattedDateString = formattedDate.toLocaleDateString();

    return formattedDateString;
  }
},
{
  get_username: async function(user_id) {
    const userId = user_id;
    const query = `SELECT username FROM users WHERE id = ${userId}`;
    const result = await query(query);
    const username = result.username;

    return username;
  }
}