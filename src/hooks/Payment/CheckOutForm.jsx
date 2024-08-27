import React, { useState } from 'react';
import axios from 'axios';

function CheckOutForm() {
    const [formData, setFormData] = useState({
        total_amount: 100,
        currency: 'BDT',
        tran_id: '',
        cus_name: '',
        cus_email: '',
        cus_add1: '',
        cus_city: '',
        cus_postcode: '',
        cus_country: '',
        cus_phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission
        const data = { ...formData, tran_id: Date.now().toString() };  // Generate unique transaction ID

        axios.post('http://localhost:8000/create-payment', data)
            .then((response) => {
                console.log(response.data);
                window.location.href = response.data.GatewayPageURL;  // Redirect to payment gateway
            })
            .catch((error) => {
                console.error('Error initiating payment:', error);
            });
    };

    return (
        <div>
            <h2>SSLCommerz Checkout Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Total Amount:</label>
                <input type="number" name="total_amount" value={formData.total_amount} onChange={handleChange} /><br /><br />
                
                <label>Currency:</label>
                <input type="text" name="currency" value={formData.currency} onChange={handleChange} /><br /><br />
                
                <label>Name:</label>
                <input type="text" name="cus_name" onChange={handleChange} /><br /><br />
                
                <label>Email:</label>
                <input type="email" name="cus_email" onChange={handleChange} /><br /><br />
                
                <label>Address:</label>
                <input type="text" name="cus_add1" onChange={handleChange} /><br /><br />
                
                <label>City:</label>
                <input type="text" name="cus_city" onChange={handleChange} /><br /><br />
                
                <label>Postcode:</label>
                <input type="text" name="cus_postcode" onChange={handleChange} /><br /><br />
                
                <label>Country:</label>
                <input type="text" name="cus_country" onChange={handleChange} /><br /><br />
                
                <label>Phone:</label>
                <input type="text" name="cus_phone" onChange={handleChange} /><br /><br />
                
                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
}

export default CheckOutForm;