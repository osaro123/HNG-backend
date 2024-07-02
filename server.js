require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/hello", async (req, res) => {
    const visitorName = req.query.visitor_name;

    try {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ip.startsWith('::ffff:')) {
            ip = ip.split(':').pop();
        }

        console.log(`Client IP: ${ip}`);

        const geoResponse = await axios.get(`https://apiip.net/api/check?ip=${ip}&accessKey=${process.env.IP_TOKEN}`);
        const location = geoResponse.data.city || 'Unknown';

        console.log(`Geo Response: ${JSON.stringify(geoResponse.data)}`);
        console.log(`Location: ${location}`);

        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const temperature = weatherResponse.data.main.temp;

        console.log(`Weather Response: ${JSON.stringify(weatherResponse.data)}`);
        console.log(`Temperature: ${temperature}`);

        res.json({
            client_ip: ip,
            location: location,
            greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`
        });
    } catch (err) {
        res.status(500).send("Error retrieving data");
        console.error(`Error: ${err.message}`);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app