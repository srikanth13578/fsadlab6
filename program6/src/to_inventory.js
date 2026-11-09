import React, { useState, useEffect } from "react";
import axios from "axios";

function Display_Inventory() {
    const [res, setres] = useState([]);

    const resp = async () => {
        try {
            const response = await axios.get("http://localhost:8000");
            console.log("Fetched data:", response.data);
            setres(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // Automatically fetch when the component loads
    useEffect(() => {
        resp();
    }, []);

    return (
        <div>
            <h1>Inventory Management</h1>
            <table border="1" style={{ width: '50%', textAlign: 'left', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {res.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.prodname}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AddInventory() {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);

    const SubmitEvent = async (e) => {
        e.preventDefault(); // Prevents page reload on submit
        const fo = { "id": id, "name": name, "qty": qty, "price": price };
        console.log("Submitting: ", fo);
        
        try {
            const response = await axios.post("http://localhost:8000/add", fo);
            console.log("Server response:", response.data);
            // Reload the page to refresh the display grid instantly
            window.location.reload();
        } catch (error) {
            console.error("Error adding item", error);
        }
    };

    return (
        <div>
            <h1>Inventory Management1</h1>
            <form onSubmit={SubmitEvent}>
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>
                                <input 
                                    type="number" 
                                    name="id" 
                                    value={id} 
                                    onChange={(e) => setId(e.target.value)} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>
                                <input 
                                    type="text" 
                                    name="prodname" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>
                                <input 
                                    type="number" 
                                    name="qty" 
                                    value={qty} 
                                    onChange={(e) => setQty(e.target.value)} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export { Display_Inventory, AddInventory };
