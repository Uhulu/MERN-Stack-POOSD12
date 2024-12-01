const nodemailer = require("nodemailer"); 

module.exports = async (email, subject, link) => {

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
        if(!link){
            throw new Error('The link is required')
        }

        const emailBody = `
         <div style="font-family: Arial, sans-serif; text-align: center;">
                <h1 style="color: #333;">Email Verification</h1>
                <p style="font-size: 16px; color: #555;">
                    Welcome to our platform! Please click the button below to verify your email address:
                </p>
                <a href="${link}" 
                   style="
                       display: inline-block;
                       padding: 10px 20px;
                       font-size: 16px;
                       color: white;
                       background-color: #007bff;
                       text-decoration: none;
                       border-radius: 5px;
                       margin-top: 20px;
                   ">
                   Verify Email
                </a>
                <p style="font-size: 14px; color: #888; margin-top: 20px;">
                    If you did not register, please ignore this email.
                </p>
                <p style="font-size: 16px; color: #555; margin-top: 30px;">
                    Yours truly, <br> Constellations App
                </p>
            </div>

        `

        await transporter.sendMail ({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: emailBody,
        })

        console.log("Email was sent successfully!")

    } catch (error) {

        console.log("Email was sent unsuccessfully!")
        throw new Error(error.message)

    }

}
