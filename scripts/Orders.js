import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


// Function whose responsibility is to find the product for an order
const findProduct = (order, allProducts) => {
    let orderProduct = null

    for (const product in allProducts) {
        if (product.id === order.productId) {
            orderProduct = product
        }
    }

    return orderProduct
}

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {
    let orderEmployee = null

    for (const employee in allEmployees) {
        if (employee.id === order.employeeId) {
            orderEmployee = employee
        }
    }

    return orderEmployee
}

export const Orders = () => {
    let html = ""
    html = "<ul>"

    for (const order of orders) {
        const employee = findEmployee(order, employees)
        const product = findProduct(order)

        html += `<li>${products.name} was sold by ${employees.name} on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }

    html += "</ul>"

    return html
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("employee")) {
            const [,employeeId] = itemClicked.id.split("--")

            for (const employee of employees) {
                if (employee.id === parseInt(employeeId)) {

                    const employeeOrder = orders.filter(
                        (order) => {
                            if (order.employeeId === employee.id) {
                                return true
                            }
                        }
                    )
                    window.alert(`${employee.name} sold ${employeeOrder.length} products `)
                }
            }
        }
    }
)

