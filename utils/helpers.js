module.exports = {
  format_date: (date) => {
    const formattedDate = new Date(date || Date.now());

    const formattedDateString = formattedDate.toLocaleDateString();

    return formattedDateString;
  }
};