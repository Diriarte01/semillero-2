/*
2- Tienes un array de objetos que representan órdenes de compra con los siguientes atributos:

customerName: string
total: number
delivered: boolean

Tu reto es retornar la suma total de todas las órdenes de compra, para solucionarlo crea una función que recibe un parámetro de entrada:

orders: Un array con las órdenes de compra

<code>
Input:
[
  {
    customerName: "Nicolas",
    total: 100,
    delivered: true,
  },
  {
    customerName: "Zulema",
    total: 120,
    delivered: false,
  },
  {
    customerName: "Santiago",
    total: 20,
    delivered: false,
  }
]
Ouput:240
</code>
*/

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
  