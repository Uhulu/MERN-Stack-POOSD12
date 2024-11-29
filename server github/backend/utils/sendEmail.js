const nodemailer = require("nodemailer"); 

module.exports = async (email, subject, text) => {

    try {

        const transporter = nodemailer.createTransport ({

            host: process.env.HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail ({
            
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text

        });

        console.log("Email was sent successfully!")

    } catch (error) {

        console.log("Email was sent unsuccessfully!")
        console.log(error);

    }

}
