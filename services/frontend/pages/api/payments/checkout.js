export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { packageName, packagePrice } = req.body;
         // Agrega los console.log para depuración
        console.log('payments-Nombre del paquete:', packageName);
        console.log('payments-Precio del paquete:', packagePrice);

        // Lógica para manejar el pago (Stripe u otra lógica)
        res.status(200).json({ message: `Procesando el pago para ${packageName}` });
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
