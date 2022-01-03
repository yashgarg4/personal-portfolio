const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

dotenv.config();
let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.post('/mail', (req, res) => {
    const { Name, email, phn, msg } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'yashgarg04072001@gmail.com',
        to: 'imposter703@gmail.com',
        subject: 'Portfolio',
        text: ` Name: ${Name}, \nEmail: ${email}, \nPhone Number: ${phn}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('opps! it seems like some error occured plz. try again.')
        } else{
            res.json('Thanks for e-mailing me. I will reply to you within 2 working days');
        }
    })
})

app.listen(port, () => {
    console.log(`listening at ${port}`);
})


