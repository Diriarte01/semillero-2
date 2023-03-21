/*2- Tienes un array de objetos que representan órdenes de compra con los siguientes atributos:

customerName: string
total: number
delivered: boolean

Tu reto es retornar la suma total de todas las órdenes de compra, para solucionarlo crea una función que recibe un parámetro de entrada:

orders: Un array con las órdenes de compra*/


const orders = [
    { customName: "Jesús", total: 500, delivered: true },
    { customName: "Alberto", total: 300, delivered: true },
    { customName: "Martha", total: 200, delivered: true },
  ];
function calculateTotalOrders(orders) {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].total;
    }
    return total;
  }
 
  console.log(calculateTotalOrders(orders)); 
  