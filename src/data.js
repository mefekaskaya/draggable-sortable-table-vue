export const columns = [
    {
      field: 'flightNumber',
      label: 'Flight Number',
      sortable: true,
      draggable: true,
    },
    {
      field: 'airline',
      label: 'Airline',
      sortable: true,
      draggable: true,
    },
    {
      field: 'destination',
      label: 'Destination',
      sortable: true,
      draggable: true,
    },
    {
      field: 'scheduled',
      label: 'Scheduled',
      sortable: true,
      draggable: true,
    },
  ];
  
  export const rows = [
    {
      flightNumber: 'AA1234',
      airline: 'A Airlines',
      destination: 'Istanbul-Ankara',
      scheduled: getRandomDate(),
    },
    {
      flightNumber: 'BB1234',
      airline: 'B Airlines',
      destination: 'Istanbul-İzmir',
      scheduled: getRandomDate(),
    },
    {
      flightNumber: 'CC1234',
      airline: 'C Airlines',
      destination: 'Ankara-Istanbul',
      scheduled: getRandomDate(),
    },
    {
      flightNumber: 'DD1234',
      airline: 'D Airlines',
      destination: 'London-Paris',
      scheduled: getRandomDate(),
    },
    {
      flightNumber: 'EE1234',
      airline: 'E Airlines',
      destination: 'New York-Amsterdam',
      scheduled: getRandomDate(),
    },
  ];
  
  function getRandomDate() {
    const date = new Date();
    const randomDay = Math.random() * 100;
    date.setDate(new Date().getDate() + randomDay);
    return new Date(date).toDateString();
  }