const orders = [
    { customerName: "Walt", total: 100, delivered: true },
    { customerName: "Jose", total: 200, delivered: true },
    { customerName: "Lionel", total: 500, delivered: true },
  ];
function calculateTotalOrders(orders) {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].total;
    }
    return total;
  }
 
  console.log(calculateTotalOrders(orders)); 
  