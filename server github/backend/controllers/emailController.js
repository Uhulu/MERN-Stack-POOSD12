const nodemailer = require('nodemailer');


const signup = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
    }); 
    let message = {
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "pasas.mendis@gmail.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }
    
    transporter.sendMail(message).then((info) => {
        return res.status(201).json({
            msg: "email sent",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        
        })
    }).catch((err) => {
        return res.status(500).json({msg: "email no"})
    })
    //res.status(200).json("Signup sucessful");
}

const getbill = (req, res) => {
    res.status(200).json("Get bill sucess");
}

module.exports = {
    signup,
    getbill
}